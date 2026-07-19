<template>
  <Transition name="splash-fade">
    <div v-if="!done" class="splash">
      <div class="seal"><span class="font-han">囍</span></div>
      <div class="dots"><span></span><span></span><span></span></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Đợi tải xong toàn bộ tài nguyên (fonts + ảnh/script qua window.load + three.js)
// rồi mới ẩn splash — tránh animation "vỡ" ở lần load đầu (cache lạnh).
const done = ref(false)

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  const tasks: Promise<unknown>[] = [wait(500)] // tối thiểu để không chớp

  // Fonts (Dancing Script / Prata / Manrope)
  if (document.fonts?.ready) tasks.push(document.fonts.ready.catch(() => {}))

  // Toàn bộ ảnh + script (couple.jpg, qr.png, _nuxt…)
  if (document.readyState !== 'complete') {
    tasks.push(new Promise((r) => window.addEventListener('load', r, { once: true })))
  }

  // three.js — chỉ ở trang thiệp (/), nơi có hiệu ứng; bỏ nếu tắt chuyển động
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!reduce && useRoute().path === '/') tasks.push(import('three').catch(() => {}))

  // Không bao giờ kẹt quá 8s dù mạng chậm
  await Promise.race([Promise.all(tasks), wait(8000)])
  done.value = true
})
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
}
.seal {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--seal);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: sealGlow 2.4s ease-in-out infinite;
}
.seal span { font-size: 42px; color: #fcf6ea; line-height: 1; }

.dots { display: flex; gap: 7px; }
.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0.35;
  animation: dotPulse 1.2s ease-in-out infinite;
}
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotPulse {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-3px); }
}

.splash-fade-leave-active { transition: opacity 0.6s ease; }
.splash-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .seal, .dots span { animation: none; }
}
</style>
