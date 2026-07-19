// baseURL cho GitHub Pages (project site phục vụ ở /my-wedding/).
// CI đặt qua NUXT_APP_BASE_URL; local dev mặc định '/'. Đảm bảo có '/' cuối.
const rawBase = process.env.NUXT_APP_BASE_URL || '/'
const baseURL = rawBase.endsWith('/') ? rawBase : rawBase + '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  app: {
    baseURL,
    head: {
      title: 'Trung Anh ♥ Phương Uyên — 03.08.2026',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Trân trọng kính mời — Lễ thành hôn Trung Anh & Phương Uyên' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: baseURL + 'favicon.svg' },
        { rel: 'apple-touch-icon', href: baseURL + 'favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Manrope:wght@400;600;800&family=Prata&display=swap'
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      // CI đặt qua NUXT_PUBLIC_SITE_URL (URL tuyệt đối cho OG); rỗng thì fallback theo request
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || ''
    }
  },

  nitro: {
    prerender: {
      routes: ['/', '/invite', '/sitemap'],
      failOnError: false
    }
  }
})
