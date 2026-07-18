import type { Ref } from 'vue'

// Cấu trúc chung port từ effects3d.js (setupBase + FXBase.connectedCallback).
// build(THREE, scene, cam) trả về hàm update(t) chạy mỗi frame.
// three được import động trong onMounted nên không lọt vào bundle SSR/first-paint.
type BuildFn = (
  THREE: typeof import('three'),
  scene: import('three').Scene,
  cam: import('three').PerspectiveCamera
) => (t: number) => void

export function useThreeFx(el: Ref<HTMLElement | null>, build: BuildFn) {
  let cleanup: (() => void) | null = null
  let cancelled = false

  onMounted(async () => {
    // Tôn trọng người dùng tắt hiệu ứng chuyển động
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const THREE = await import('three')
    const host = el.value
    if (cancelled || !host) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;'
    if (!host.style.position) host.style.position = 'relative'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    cam.position.set(0, 0, 14)

    const resize = () => {
      const w = host.clientWidth || 1
      const h = host.clientHeight || 1
      renderer.setSize(w, h, false)
      cam.aspect = w / h
      cam.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const update = build(THREE, scene, cam)
    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      update(clock.getElapsedTime())
      renderer.render(scene, cam)
    }
    tick()

    cleanup = () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      renderer.dispose()
      renderer.domElement.remove()
    }
  })

  onUnmounted(() => {
    cancelled = true
    cleanup?.()
  })
}
