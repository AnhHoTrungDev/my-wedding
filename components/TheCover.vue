<template>
  <div
    class="cover"
    :style="{ pointerEvents: opened ? 'none' : 'auto' }"
    @click="open"
  >
    <!-- Cánh trái -->
    <div class="door left" :class="{ open: opened }">
      <div class="door-frame"></div>
    </div>
    <!-- Cánh phải -->
    <div class="door right" :class="{ open: opened }">
      <div class="door-frame"></div>
    </div>

    <!-- Nội dung con dấu ở giữa -->
    <div class="seal-wrap" :class="{ open: opened }">
      <div class="kicker">WEDDING INVITATION</div>
      <div class="seal"><span class="font-han">囍</span></div>
      <div class="center">
        <div class="names font-serif">
          {{ w.groom }} <span class="heart">♥</span> {{ w.bride }}
        </div>
        <div class="date-row">
          <span class="dash"></span>
          <span class="date">{{ w.dateSpaced }}</span>
          <span class="dash"></span>
        </div>
        <div class="place">{{ w.city.toUpperCase() }} · {{ w.country.toUpperCase() }}</div>
      </div>
      <div class="hint">
        <div class="hint-text">CUỘN ĐỂ MỞ THIỆP</div>
        <div class="hint-arrow">▾</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding

const opened = ref(false)
const emit = defineEmits<{ opened: [] }>()

function open() {
  if (opened.value) return
  opened.value = true
  emit('opened')
  // Trả lại khả năng cuộn sau khi cửa mở xong
  setTimeout(() => { document.body.style.overflow = '' }, 1250)
  unbind()
}

function onKey(e: KeyboardEvent) {
  if (['ArrowDown', 'PageDown', ' '].includes(e.key)) open()
}
function bind() {
  window.addEventListener('wheel', open, { passive: true })
  window.addEventListener('touchmove', open, { passive: true })
  window.addEventListener('keydown', onKey)
}
function unbind() {
  window.removeEventListener('wheel', open)
  window.removeEventListener('touchmove', open)
  window.removeEventListener('keydown', onKey)
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.scrollTo(0, 0)
  bind()
})
onUnmounted(() => {
  unbind()
  document.body.style.overflow = ''
})
</script>

<style scoped>
.cover {
  position: fixed;
  inset: 0;
  z-index: 60;
  cursor: pointer;
}

.door {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50.3%;
  background: var(--paper-2);
  transition: transform 1.25s cubic-bezier(0.7, 0, 0.3, 1);
}
.door.left {
  left: 0;
  border-right: 1px solid var(--line);
  box-shadow: 6px 0 30px rgba(60, 55, 40, 0.1);
}
.door.right {
  right: 0;
  border-left: 1px solid var(--line);
  box-shadow: -6px 0 30px rgba(60, 55, 40, 0.1);
}
.door.left.open { transform: translateX(-103%); }
.door.right.open { transform: translateX(103%); }

.door-frame {
  position: absolute;
  top: 18px;
  bottom: 18px;
  border: 1px solid var(--line);
}
.left .door-frame { left: 18px; right: 0; border-right: 0; }
.right .door-frame { right: 18px; left: 0; border-left: 0; }

.seal-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  pointer-events: none;
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.seal-wrap.open { opacity: 0; transform: scale(1.15); }

.kicker {
  font-size: 10px;
  letter-spacing: 6px;
  font-weight: 800;
  color: var(--soft);
}
.seal {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--seal);
  box-shadow: 0 14px 34px rgba(176, 35, 58, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: sealGlow 2.6s ease-in-out infinite;
}
.seal span { font-size: 60px; color: #fcf6ea; line-height: 1; }

.center { text-align: center; color: var(--ink); }
.names { font-size: 30px; line-height: 1.4; }
.heart { color: var(--seal); font-size: 20px; }
.date-row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.dash { height: 1px; width: 44px; background: var(--line); }
.date { font-size: 12px; letter-spacing: 4px; font-weight: 800; color: var(--soft); }
.place { margin-top: 8px; font-size: 10px; letter-spacing: 4px; color: var(--faint); font-weight: 600; }

.hint {
  position: absolute;
  bottom: 44px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--soft);
}
.hint-text { font-size: 10px; letter-spacing: 4px; font-weight: 600; }
.hint-arrow {
  margin-top: 8px;
  font-size: 18px;
  color: var(--seal);
  animation: bounceDown 1.4s ease-in-out infinite;
}
</style>
