<template>
  <div>
    <TheCover @opened="entered = true" />
    <TheInvitation :entered="entered" />
  </div>
</template>

<script setup lang="ts">
// URL tuyệt đối cho OG/Twitter (mạng xã hội bắt buộc). Ưu tiên siteUrl cấu hình
// (CI đặt = URL GitHub Pages); local dev rỗng thì suy ra từ request + baseURL.
// Cờ "đã mở bìa" → kích hoạt animation vào của Hero (ảnh + nội dung)
const entered = ref(false)

const config = useRuntimeConfig()
const req = useRequestURL()
const base = config.app.baseURL.endsWith('/') ? config.app.baseURL.slice(0, -1) : config.app.baseURL
const site = (config.public.siteUrl as string) || req.origin + base
const image = site + '/couple.jpg'

const title = 'Trung Anh ♥ Phương Uyên — Thiệp cưới 03.08.2026'
const description =
  'Trân trọng kính mời dự Lễ thành hôn. Tiệc cưới lúc 17:00, Thứ Hai ngày 03.08.2026 tại Trung tâm Hội nghị Tiệc cưới Phì Lũ — Sảnh Pearl, đường 2/9, TP. Đà Nẵng.'

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogImageWidth: 800,
  ogImageHeight: 1200,
  ogImageType: 'image/jpeg',
  ogUrl: site + '/',
  ogSiteName: 'Thiệp cưới Trung Anh & Phương Uyên',
  ogLocale: 'vi_VN',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image
})
</script>
