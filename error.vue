<template>
  <div class="err">
    <div class="seal"><span class="font-han">囍</span></div>
    <div class="code font-serif">{{ error.statusCode || 'Lỗi' }}</div>
    <h1 class="title font-script">{{ title }}</h1>
    <p class="msg">{{ message }}</p>

    <div class="actions">
      <button type="button" class="btn solid" @click="goHome">Về trang thiệp</button>
      <button type="button" class="btn ghost" @click="goSitemap">Tất cả các trang</button>
    </div>

    <div class="foot">Trung Anh <span class="heart">♥</span> Phương Uyên · 03.08.2026</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number; statusMessage?: string; message?: string } }>()

const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => (is404.value ? 'Không tìm thấy trang' : 'Đã có lỗi xảy ra'))
const message = computed(() =>
  is404.value
    ? 'Trang bạn tìm không tồn tại hoặc đã được chuyển. Mời quý khách quay lại trang thiệp.'
    : 'Rất tiếc, đã có sự cố. Mời quý khách quay lại trang thiệp và thử lại.'
)

useHead({ title: computed(() => `${title.value} — Trung Anh ♥ Phương Uyên`) })

const goHome = () => clearError({ redirect: '/' })
const goSitemap = () => clearError({ redirect: '/sitemap' })
</script>

<style scoped>
.err {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  background: radial-gradient(120% 90% at 50% 38%, #faf7f0 0%, var(--paper) 46%, var(--paper-2) 100%);
  color: var(--ink);
}
.seal {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--seal);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: sealGlow 2.6s ease-in-out infinite;
}
.seal span { font-size: 36px; color: #fcf6ea; line-height: 1; }

.code {
  margin-top: 26px;
  font-size: clamp(64px, 16vw, 104px);
  line-height: 1;
  color: var(--gold);
  letter-spacing: 0.02em;
}
.title { margin-top: 6px; font-size: clamp(34px, 8vw, 52px); color: var(--ink); line-height: 1.1; }
.msg {
  margin-top: 16px;
  max-width: 440px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--muted);
}

.actions { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.btn {
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 13px 24px;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn.solid { background: var(--seal); color: #fcf6ea; border: 1px solid var(--seal); }
.btn.solid:hover { opacity: 0.88; }
.btn.ghost { background: transparent; color: var(--gold-warm); border: 1px solid var(--line); }
.btn.ghost:hover { border-color: var(--gold); color: var(--seal); }

.foot {
  margin-top: 40px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--faint);
}
.foot .heart { color: var(--seal); }

@media (prefers-reduced-motion: reduce) {
  .seal { animation: none; }
}
</style>
