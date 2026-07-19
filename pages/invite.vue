<template>
  <div class="page">
    <div class="card">
      <div class="seal"><span class="font-han">囍</span></div>
      <h1>Tạo link mời</h1>
      <p class="sub">Nhập tên khách và chọn kiểu xưng hô — mỗi khách một đường link riêng.</p>

      <label class="lbl">Kiểu xưng hô</label>
      <div class="styles">
        <button
          v-for="s in styles"
          :key="s.id"
          type="button"
          class="style"
          :class="{ on: style === s.id }"
          @click="style = s.id"
        >
          <span class="s-name">{{ s.name }}</span>
          <span class="s-eg">{{ s.example }}</span>
        </button>
      </div>

      <label class="lbl" for="ten">Tên khách</label>
      <input
        id="ten"
        v-model="name"
        class="input"
        type="text"
        :placeholder="placeholder"
        autocomplete="off"
        @keyup.enter="copy"
      />

      <div class="preview">
        <div class="p-lbl">TRÂN TRỌNG KÍNH MỜI</div>
        <div class="p-guest font-script">{{ display || placeholder }}</div>
      </div>

      <label class="lbl">Đường link</label>
      <div class="url-row">
        <input class="input url" :value="url" readonly @focus="selectAll" />
        <button class="btn" type="button" :disabled="!canCopy" @click="copy">
          {{ copied ? '✓ Đã copy' : 'Copy' }}
        </button>
      </div>

      <a
        class="try"
        :class="{ off: !canCopy }"
        :href="canCopy ? url : undefined"
        target="_blank"
        rel="noopener"
      >Mở thử thiệp với tên này ↗</a>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Tạo link mời — Trung Anh ♥ Phương Uyên' })

type StyleId = 'gia-dinh' | 'vo-chong' | 'tim'
const styles: { id: StyleId; name: string; example: string }[] = [
  { id: 'gia-dinh', name: 'Gia đình', example: 'Gia đình Anh Ba' },
  { id: 'vo-chong', name: 'Vợ Chồng', example: 'Vợ Chồng Em Đức' },
  { id: 'tim', name: 'Tên + ♥', example: 'Anh Tú ♥' }
]

const style = ref<StyleId>('gia-dinh')
const name = ref('')
const copied = ref(false)
// URL gốc của thiệp = origin + baseURL (/my-wedding/). Ưu tiên siteUrl tuyệt đối
// đã cấu hình khi build; dev thì suy ra từ window.location + baseURL.
const config = useRuntimeConfig()
const home = ref('')

onMounted(() => {
  const site = config.public.siteUrl as string
  if (site) {
    home.value = site.endsWith('/') ? site : site + '/'
  } else {
    const base = config.app.baseURL
    home.value = window.location.origin + (base.endsWith('/') ? base : base + '/')
  }
})

const placeholder = computed(() =>
  style.value === 'gia-dinh' ? 'VD: Anh Ba'
    : style.value === 'vo-chong' ? 'VD: Em Đức'
      : 'VD: Anh Tú'
)

// Chuỗi hiển thị đúng như thiệp sẽ render ở dòng "TRÂN TRỌNG KÍNH MỜI"
const display = computed(() => {
  const n = name.value.trim()
  if (!n) return ''
  if (style.value === 'gia-dinh') return `Gia đình ${n}`
  if (style.value === 'vo-chong') return `Vợ Chồng ${n}`
  return `${n} ♥`
})

const canCopy = computed(() => display.value.length > 0)

const url = computed(() => {
  if (!home.value) return ''
  if (!display.value) return home.value
  return `${home.value}?to=${encodeURIComponent(display.value)}`
})

watch([name, style], () => (copied.value = false))

function selectAll(e: FocusEvent) {
  (e.target as HTMLInputElement).select()
}

async function copy() {
  if (!canCopy.value) return
  try {
    await navigator.clipboard.writeText(url.value)
  } catch {
    // Trình duyệt chặn clipboard API — chọn sẵn để người dùng Ctrl/Cmd+C
    const el = document.querySelector<HTMLInputElement>('.input.url')
    el?.select()
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
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
  padding: 36px clamp(20px, 5vw, 40px) 40px;
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
h1 { font-family: 'Prata', serif; font-size: 26px; font-weight: 400; }
.sub { margin-top: 8px; font-size: 13px; line-height: 1.6; color: var(--muted); }

.lbl {
  display: block;
  margin: 24px 0 10px;
  font-size: 10px;
  letter-spacing: 3px;
  font-weight: 800;
  color: var(--gold-warm);
  text-align: left;
}
.styles { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.style {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 6px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.style:hover { border-color: var(--gold); }
.style.on { border-color: var(--seal); background: #fff; box-shadow: inset 0 0 0 1px var(--seal); }
.s-name { font-size: 13px; font-weight: 700; color: var(--ink); }
.s-eg { font-size: 10px; color: var(--soft); }

.input {
  width: 100%;
  padding: 13px 14px;
  font-size: 15px;
  font-family: inherit;
  color: var(--ink);
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 4px;
  outline: none;
}
.input:focus { border-color: var(--gold); background: #fff; }

.preview {
  margin-top: 24px;
  padding: 22px 16px;
  border: 1px dashed var(--line);
  border-radius: 4px;
  background: var(--paper-2);
}
.p-lbl { font-size: 10px; letter-spacing: 4px; color: var(--soft); font-weight: 600; }
.p-guest { margin-top: 6px; font-size: 30px; color: var(--gold); line-height: 1.2; min-height: 1.2em; }

.url-row { display: flex; gap: 8px; }
.url { flex: 1; font-size: 12px; color: var(--muted); }
.btn {
  padding: 0 18px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  background: var(--seal);
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.88; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }

.try {
  display: inline-block;
  margin-top: 18px;
  font-size: 13px;
  color: var(--gold);
  font-weight: 600;
}
.try.off { color: var(--faint); pointer-events: none; }
</style>
