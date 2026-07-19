<template>
  <div class="page">
    <div class="card">
      <div class="seal"><span class="font-han">囍</span></div>
      <h1 class="font-serif">Tất cả các trang</h1>
      <p class="sub">Trung Anh ♥ Phương Uyên — 03.08.2026</p>

      <nav class="list">
        <NuxtLink v-for="p in pages" :key="p.path" :to="p.path" class="row">
          <div class="row-main">
            <div class="row-title">{{ p.title }}</div>
            <div class="row-desc">{{ p.desc }}</div>
          </div>
          <span class="row-arrow">↗</span>
        </NuxtLink>
      </nav>

      <div class="copyright">© 2026 Trung Anh &amp; Phương Uyên. All rights reserved.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Tất cả các trang — Trung Anh ♥ Phương Uyên' })

const pages = [
  { path: '/', title: 'Thiệp cưới', desc: 'Trang thiệp mời chính' },
  { path: '/invite', title: 'Tạo link mời', desc: 'Tạo đường link mời riêng cho từng khách' },
  { path: '/sitemap', title: 'Tất cả các trang', desc: 'Trang bạn đang xem' }
]
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 18px;
  background: linear-gradient(150deg, var(--paper-2), var(--paper));
}
.card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 36px clamp(20px, 5vw, 40px) 32px;
  box-shadow: 0 20px 60px -30px rgba(60, 50, 30, 0.4);
  text-align: center;
}
.seal {
  width: 54px;
  height: 54px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: var(--seal);
  display: flex;
  align-items: center;
  justify-content: center;
}
.seal span { font-size: 26px; color: #fcf6ea; }
h1 { font-size: 26px; font-weight: 400; }
.sub { margin-top: 8px; font-size: 13px; color: var(--muted); }

.list { margin: 26px 0 8px; display: flex; flex-direction: column; gap: 10px; text-align: left; }
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 6px;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.row:hover { border-color: var(--gold); background: #fff; }
.row-main { flex: 1; }
.row-title { font-size: 15px; font-weight: 700; color: var(--ink); }
.row-desc { margin-top: 2px; font-size: 12px; color: var(--muted); }
.row-arrow { color: var(--gold); font-size: 16px; }

.copyright {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line-2);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--faint);
}
</style>
