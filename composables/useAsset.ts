// Ghép baseURL vào đường dẫn asset trong public/ để chạy đúng khi deploy
// dưới đường dẫn con (GitHub Pages: /my-wedding/...). Dev baseURL='/' → giữ nguyên.
export function useAsset(path: string) {
  const base = useRuntimeConfig().app.baseURL || '/'
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : '/' + path
  return b + p
}
