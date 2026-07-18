<template>
  <div>
    <TheCover />
    <TheInvitation />
  </div>
</template>

<script setup lang="ts">
// Lấy domain thật từ request để og:image / og:url là URL tuyệt đối
// (mạng xã hội bắt buộc URL tuyệt đối) — tự đúng ở localhost lẫn khi deploy.
const url = useRequestURL()
const origin = url.origin
const image = origin + '/couple.jpg'

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
  ogImageWidth: 1600,
  ogImageHeight: 2400,
  ogImageType: 'image/jpeg',
  ogUrl: url.href,
  ogSiteName: 'Thiệp cưới Trung Anh & Phương Uyên',
  ogLocale: 'vi_VN',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image
})
</script>
