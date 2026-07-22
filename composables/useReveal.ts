// Hiện dần các section (và con trực tiếp so le) khi cuộn tới — port từ V5.
// Dùng directive-free: gắn class .reveal cho section, gọi useReveal() một lần.
export function useReveal() {
  onMounted(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reduce) {
      els.forEach((el) => (el.style.opacity = '1'))
      return
    }

    // Trễ nhẹ để layout ổn định (khớp setTimeout 400ms của bản gốc)
    const timer = setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (!en.isIntersecting) continue
            const el = en.target as HTMLElement & { __kids?: HTMLElement[] }
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            for (const kid of el.__kids || []) {
              kid.style.opacity = '1'
              kid.style.transform = 'translateY(0)'
            }
            io.unobserve(el)
          }
        },
        // rootMargin âm ở đáy: co vùng quan sát lên 22% từ dưới, nên section
        // chỉ trigger khi đã cuộn vào sâu (mép trên tới ~78% màn hình), thay vì
        // vừa ló ra là chạy.
        { threshold: 0, rootMargin: '0px 0px -22% 0px' }
      )

      for (const el of els as (HTMLElement & { __kids?: HTMLElement[] })[]) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        el.style.transition =
          'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,0.9,0.3,1)'
        const kids = Array.from(
          el.querySelectorAll<HTMLElement>(':scope > div, :scope > div > div')
        ).slice(0, 8)
        kids.forEach((kid, i) => {
          kid.style.opacity = '0'
          kid.style.transform = 'translateY(22px)'
          kid.style.transition =
            `opacity 0.7s ease ${0.12 + i * 0.12}s, transform 0.7s cubic-bezier(0.22,0.9,0.3,1) ${0.12 + i * 0.12}s`
        })
        el.__kids = kids
        io.observe(el)
      }

      // Mobile: ảnh Polaroid ở Hero hiện theo scroll — chỉ khi ~50% (tầm giữa)
      // ảnh vào màn hình mới fade/scale vào, tránh cảnh ảnh bị viewport cắt ngang.
      const isMobile = window.matchMedia?.('(max-width: 760px)').matches
      const photo = document.querySelector<HTMLElement>('.polaroid-wrap')
      if (isMobile && photo) {
        photo.style.opacity = '0'
        photo.style.transform = 'translateY(26px) scale(0.96)'
        photo.style.transition =
          'opacity 0.9s ease, transform 0.9s cubic-bezier(0.2,0.7,0.2,1)'
        const pio = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue
              photo.style.opacity = '1'
              photo.style.transform = 'none'
              pio.unobserve(photo)
            }
          },
          { threshold: 0.5 }
        )
        pio.observe(photo)
      }
    }, 400)

    onUnmounted(() => clearTimeout(timer))
  })
}
