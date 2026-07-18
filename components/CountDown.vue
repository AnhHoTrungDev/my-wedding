<template>
  <div class="grid">
    <div v-for="u in units" :key="u.label" class="cell">
      <div class="num">{{ u.value }}</div>
      <div class="lbl">{{ u.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ target: Date }>()

// mounted = false trên SSR và ở lần render đầu khi hydrate → cùng ra '–',
// tránh hydration mismatch do Date.now() lệch giữa server và client.
const mounted = ref(false)
const now = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  mounted.value = true
  now.value = Date.now()
  timer = setInterval(() => (now.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(timer))

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0')
const units = computed(() => {
  if (!mounted.value) {
    return [
      { label: 'NGÀY', value: '–' }, { label: 'GIỜ', value: '–' },
      { label: 'PHÚT', value: '–' }, { label: 'GIÂY', value: '–' }
    ]
  }
  const diff = Math.max(0, props.target.getTime() - now.value)
  const s = Math.floor(diff / 1000)
  return [
    { label: 'NGÀY', value: String(Math.floor(s / 86400)) },
    { label: 'GIỜ', value: pad(Math.floor((s % 86400) / 3600)) },
    { label: 'PHÚT', value: pad(Math.floor((s % 3600) / 60)) },
    { label: 'GIÂY', value: pad(s % 60) }
  ]
})
</script>

<style scoped>
.grid {
  margin: 26px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 520px;
}
.cell { padding: 8px 0; border-left: 1px solid var(--line); }
.cell:first-child { border-left: 0; }
.num {
  font-size: clamp(34px, 9vw, 44px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
}
.lbl {
  margin-top: 10px;
  font-size: 9px;
  letter-spacing: 3px;
  color: var(--soft);
  font-weight: 600;
}
</style>
