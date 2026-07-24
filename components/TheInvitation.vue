<template>
  <div class="doc">
    <!-- HERO -->
    <section class="hero" :class="{ entered }">
      <div class="hero-grid-bg"></div>
      <div class="hero-fx"><FxHoloHeart /></div>

      <div class="hero-text">
        <div class="seal-sm"><span class="font-han">囍</span></div>
        <div class="kicker">WE'RE GETTING MARRIED</div>
        <div class="hero-names font-script">
          {{ w.groom }}<br /><span class="amp">&amp;</span> {{ w.bride }}
        </div>
        <div class="facts">
          <div class="fact">
            <div class="fact-top">{{ w.dateShort.slice(0, 5) }}</div>
            <div class="fact-sub">{{ w.dateShort.slice(6) }}</div>
          </div>
          <div class="fact mid">
            <div class="fact-top">{{ w.receptionTime }}</div>
            <div class="fact-sub">{{ w.weekday.toUpperCase() }}</div>
          </div>
          <button type="button" class="fact link" @click="scrollToParty" :title="'Xem địa điểm ' + w.reception.name">
            <div class="fact-top">{{ w.reception.name }}</div>
            <div class="fact-sub">{{ w.reception.hall }}</div>
          </button>
        </div>
        <button type="button" class="venue-jump" @click="scrollToParty">
          <svg class="pin" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path d="M12 22s7-6.13 7-12a7 7 0 1 0-14 0c0 5.87 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <circle cx="12" cy="10" r="2.4" fill="currentColor"/>
          </svg>
          Xem địa điểm tiệc
          <svg class="jump-arrow" viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>

        <div class="invite-lbl">TRÂN TRỌNG KÍNH MỜI</div>
        <div class="guest font-script">{{ tenKhach }}</div>
      </div>

      <!-- Bọc ngoài để animation "vào" không đè lên animation lắc lư của khung ảnh -->
      <div class="polaroid-wrap">
        <div class="polaroid">
          <img
            :src="photoUrl"
            :srcset="photoSrcset"
            sizes="320px"
            :alt="'Ảnh cưới ' + w.groom + ' và ' + w.bride"
          />
          <div class="polaroid-cap font-script">{{ w.dateSpaced }} ♥</div>
        </div>
      </div>

      <div class="scroll-hint">
        <div class="sh-text">CUỘN XUỐNG</div>
        <div class="sh-arrow">▾</div>
      </div>
    </section>

    <!-- COUNTDOWN -->
    <section class="countdown reveal">
      <div class="sec-kicker warm">ĐẾM NGƯỢC TỚI TIỆC CƯỚI</div>
      <CountDown :target="w.date" />
      <div class="cd-note font-script">Hẹn gặp quý khách tại Đà Nẵng!</div>
    </section>

    <!-- GIA ĐÌNH + BÁO TIN -->
    <section class="family reveal">
      <div class="family-inner">
        <div class="families">
          <div v-for="f in w.families" :key="f.side">
            <div class="sec-kicker warm">{{ f.side }}</div>
            <div class="fam-body">
              <template v-for="(l, i) in f.lines" :key="l">
                <span v-html="l"></span><br />
              </template>
              {{ f.address }}
            </div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="bao-tin">TRÂN TRỌNG BÁO TIN — LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</div>
        <div class="child font-serif">{{ w.groomFull }}</div>
        <div class="roles">
          <span>{{ w.groomRole.toUpperCase() }}</span>
          <span class="heart">♥</span>
          <span>{{ w.brideRole.toUpperCase() }}</span>
        </div>
        <div class="child font-serif">{{ w.brideFull }}</div>
        <div class="ceremony">
          {{ w.ceremony.title }}<br />
          Vào lúc <strong>{{ w.ceremony.time }}</strong> — {{ w.weekday }}, ngày
          <strong>{{ w.dateShort }}</strong><br />
          <span class="lunar">{{ w.lunarLabel }}</span>
        </div>
      </div>
    </section>

    <!-- TIỆC CƯỚI -->
    <section id="tiec-cuoi" class="party reveal">
      <div class="party-fx"><FxSparkle /></div>
      <div class="party-border"></div>
      <div class="party-inner">
        <div class="party-info">
          <div class="ring-han"><span class="font-han">囍</span></div>
          <div class="sec-kicker gold">TIỆC CƯỚI</div>
          <div class="party-lead">Đến dự buổi tiệc chung vui cùng gia đình chúng tôi tại</div>
          <div class="venue font-serif">{{ w.reception.name }}</div>
          <div class="hall">{{ w.reception.hall }}</div>
          <div class="party-addr">
            {{ w.reception.venue }}<br />{{ w.reception.address }}
          </div>
          <div class="party-time">
            <div>
              <div class="pt-top">{{ w.receptionTime }}</div>
              <div class="pt-sub">VÀO LÚC</div>
            </div>
            <div class="pt-div">
              <div class="pt-top">{{ w.dateShort }}</div>
              <div class="pt-sub">{{ w.lunarShort }}</div>
            </div>
          </div>
          <div class="party-btns">
            <a class="btn solid" :href="calendarUrl" target="_blank" rel="noopener">THÊM VÀO LỊCH</a>
            <a class="btn ghost" :href="mapUrl" target="_blank" rel="noopener">CHỈ ĐƯỜNG</a>
          </div>
        </div>
        <div class="party-map">
          <!-- Map tải sớm (không cần bấm). Lớp phủ hiện tới khi load xong (tránh
               flash); load lỗi/timeout → placeholder có link chỉ đường. -->
          <iframe
            v-if="mapSrc"
            :src="mapSrc"
            title="Bản đồ Phì Lũ"
            class="map-frame"
            :class="{ ready: mapReady }"
            @load="onMapLoad"
          ></iframe>
          <a
            v-if="!mapReady"
            class="map-cover"
            :class="{ error: mapError }"
            :href="mapUrl"
            target="_blank"
            rel="noopener"
          >
            <span class="map-grid" aria-hidden="true"></span>
            <span class="map-pin">
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
                <path d="M12 22s7-6.13 7-12a7 7 0 1 0-14 0c0 5.87 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="2.6" fill="currentColor"/>
              </svg>
            </span>
            <span class="map-label">
              {{ mapError ? 'Không tải được bản đồ · Nhấn để chỉ đường' : 'Đang tải bản đồ…' }}
            </span>
          </a>
        </div>
      </div>
    </section>

    <!-- MỪNG CƯỚI QR -->
    <section class="gift reveal">
      <div class="sec-kicker warm">HỘP MỪNG CƯỚI ONLINE</div>
      <div class="gift-lead">
        Sự hiện diện của quý khách là món quà quý giá nhất.<br />
        Quý khách cũng có thể gửi lời chúc qua mã QR bên dưới.
      </div>
      <div class="qr">
        <img
          v-if="!qrFailed"
          :src="qrUrl"
          :alt="'QR mừng cưới — ' + w.gift.name"
          @error="qrFailed = true"
        />
        <div v-else class="qr-empty">
          <span class="font-han">福</span>
          <p>Mã QR sẽ được cập nhật</p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <section class="footer reveal">
      <div class="foot-text">
        Sự hiện diện của quý khách<br />là niềm vinh hạnh cho gia đình chúng tôi
      </div>
      <div class="foot-thanks font-script">Rất hân hạnh được đón tiếp!</div>
      <div class="foot-seal"><span class="font-han">囍</span></div>

      <div class="foot-meta">
        <NuxtLink to="/sitemap" class="foot-link">Tất cả các trang ↗</NuxtLink>
        <div class="copyright">© 2026 Trung Anh &amp; Phương Uyên. All rights reserved.</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { wedding, calendarUrl, mapUrl, mapEmbed } from '~/data/wedding'
const w = wedding

// entered = bìa 囍 đã mở → chạy animation vào cho Hero
defineProps<{ entered?: boolean }>()

const qrFailed = ref(false)
useReveal()

// Bản đồ: gán src phía client (sau mount) để iframe tải sớm nhưng listener
// @load luôn bắt được sự kiện; lớp phủ hiện tới khi load xong; 12s → coi lỗi.
const mapSrc = ref('')
const mapReady = ref(false)
const mapError = ref(false)
let mapTimer: ReturnType<typeof setTimeout> | undefined
function onMapLoad() {
  // đợi một nhịp cho tile vẽ xong rồi mới bỏ lớp phủ, tránh flash trắng
  setTimeout(() => {
    mapReady.value = true
    mapError.value = false
    if (mapTimer) clearTimeout(mapTimer)
  }, 500)
}
onMounted(() => {
  mapSrc.value = mapEmbed
  mapTimer = setTimeout(() => {
    if (!mapReady.value) mapError.value = true
  }, 12000)
})
onUnmounted(() => {
  if (mapTimer) clearTimeout(mapTimer)
})

// Đường dẫn ảnh có prefix baseURL để chạy đúng trên GitHub Pages (/my-wedding/…)
const photoUrl = useAsset(w.photo)
// Màn thường lấy bản 400px, màn retina lấy 800px → nét ở mọi loại màn, đỡ tốn data
const photoSrcset = `${useAsset('/couple-400.jpg')} 400w, ${photoUrl} 800w`
const qrUrl = useAsset(w.gift.qr)

function scrollToParty() {
  document.getElementById('tiec-cuoi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Mobile: gợi ý "CUỘN XUỐNG" cố định đáy màn, mờ đi khi đã cuộn khỏi Hero.
let hintScroll: (() => void) | null = null
onMounted(() => {
  if (!window.matchMedia?.('(max-width: 760px)').matches) return
  const hint = document.querySelector('.scroll-hint')
  if (!hint) return
  // Ẩn ngay khi vừa cuộn (không đợi tới ảnh) để hint không bao giờ đè lên ảnh
  hintScroll = () => hint.classList.toggle('hide', window.scrollY > 12)
  window.addEventListener('scroll', hintScroll, { passive: true })
  hintScroll()
})
onUnmounted(() => {
  if (hintScroll) window.removeEventListener('scroll', hintScroll)
})

// Tên khách lấy từ ?to= (tạo ở trang /invite). Khi build tĩnh, HTML prerender
// không có query nên hiện guestDefault; đợi mounted mới đọc query để tránh
// hydration mismatch, rồi swap sang tên thật.
const route = useRoute()
const mounted = ref(false)
onMounted(() => (mounted.value = true))
const tenKhach = computed(() => {
  if (!mounted.value) return w.guestDefault
  const to = route.query.to
  const v = Array.isArray(to) ? to[0] : to
  return (v && v.trim()) || w.guestDefault
})
</script>

<style scoped>
.doc { background: var(--paper); }
section { position: relative; }

/* ── HERO ── */
.hero {
  min-height: 100vh;
  background: var(--paper-2);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56px;
  flex-wrap: wrap;
  padding: 48px 6%;
}
.hero-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(120, 100, 70, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120, 100, 70, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
.hero-fx { position: absolute; inset: 0; opacity: 0.4; }
/* Mobile: thu nhỏ + làm mờ tim hạt để không đè lên chữ khi bố cục xếp dọc */
@media (max-width: 760px) {
  .hero-fx {
    opacity: 0.18;
    transform: scale(0.6) translateY(-12%);
    transform-origin: center center;
  }
}

.hero-text { position: relative; max-width: 460px; min-width: 300px; }
.seal-sm {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--seal);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  animation: sealGlow 2.6s ease-in-out infinite;
}
.seal-sm span { font-size: 22px; color: #fcf6ea; }
.kicker { font-size: 10px; letter-spacing: 6px; font-weight: 800; color: var(--soft); }
.hero-names { margin-top: 10px; font-size: clamp(46px, 11vw, 60px); line-height: 1.15; }
.amp { color: var(--seal); }
.facts {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 330px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-align: center;
}
.fact { padding: 13px 0; }
.fact.mid { border-left: 1px solid var(--line); border-right: 1px solid var(--line); }
/* Ô PHÌ LŨ bấm được → cuộn tới section Tiệc cưới */
/* Ô PHÌ LŨ bấm được — giữ đồng nhất với 2 ô kia, chỉ đổi màu nhẹ khi rê chuột */
.fact.link {
  font: inherit;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: center;
  transition: color 0.2s ease;
}
.fact.link:hover .fact-top { color: var(--gold); }
.fact.link:focus-visible { outline: 1px solid var(--gold); outline-offset: 2px; }

/* Nút "Xem địa điểm tiệc" — hairline chữ hoa giãn cách, đúng ngôn ngữ thiệp */
.venue-jump {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
  padding: 9px 16px;
  font-family: inherit;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--gold-warm);
  background: none;
  border: 1px solid var(--line);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
  /* Gợn sóng vàng lan ra rồi tắt — nhấp nháy tinh tế để gây tò mò */
  animation: venuePing 3s ease-out infinite;
}
.pin { color: var(--seal); flex-shrink: 0; }
.jump-arrow {
  flex-shrink: 0;
  animation: arrowBob 1.8s ease-in-out infinite;
}
.venue-jump:hover {
  border-color: var(--gold);
  color: var(--seal);
  animation: none; /* dừng ping khi đã chú ý/hover */
}
.venue-jump:hover .jump-arrow { animation-duration: 0.9s; }
.venue-jump:focus-visible { outline: 1px solid var(--gold); outline-offset: 2px; }

@keyframes venuePing {
  0% { box-shadow: 0 0 0 0 rgba(168, 129, 60, 0.35); }
  60%, 100% { box-shadow: 0 0 0 8px rgba(168, 129, 60, 0); }
}
@keyframes arrowBob {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(2px); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .venue-jump, .jump-arrow { animation: none; }
}
.fact-top { font-size: 15px; font-weight: 800; }
.fact-sub { margin-top: 2px; font-size: 9px; letter-spacing: 2px; color: var(--soft); }
.invite-lbl { margin-top: 20px; font-size: 10px; letter-spacing: 4px; color: var(--soft); font-weight: 600; }
.guest { margin-top: 4px; font-size: 30px; color: var(--gold); }

/* ── Animation "vào" khi mở bìa 囍 ──
   Chỉ chạy khi có class .entered (lúc cửa bắt đầu trượt), so le nhẹ nhàng.
   Dùng fill-mode both nên trước khi chạy phần tử vẫn ở trạng thái bình thường
   (nằm sau bìa nên không thấy) — không lo bị ẩn vĩnh viễn nếu thiếu JS. */
@keyframes heroIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
@keyframes photoIn {
  from { opacity: 0; transform: translateY(26px) scale(0.94) rotate(-3deg); }
  to { opacity: 1; transform: none; }
}
.hero.entered .seal-sm { animation: heroIn 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) 0.35s both; }
.hero.entered .kicker { animation: heroIn 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) 0.44s both; }
.hero.entered .hero-names { animation: heroIn 0.85s cubic-bezier(0.2, 0.7, 0.2, 1) 0.52s both; }
.hero.entered .facts { animation: heroIn 0.75s cubic-bezier(0.2, 0.7, 0.2, 1) 0.66s both; }
.hero.entered .venue-jump { animation: heroIn 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.76s both; }
.hero.entered .invite-lbl { animation: heroIn 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.84s both; }
.hero.entered .guest { animation: heroIn 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.92s both; }
.hero.entered .polaroid-wrap { animation: photoIn 1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s both; }
.hero.entered .scroll-hint { animation: heroIn 0.7s ease 1.2s both; }
/* Mobile: ảnh nằm dưới màn khi mở bìa → BỎ animation-lúc-mở-bìa (đặt SAU rule
   trên để thắng vì media query không tăng specificity); reveal theo scroll do
   useReveal xử lý (hiện khi ~50% ảnh vào màn). */
@media (max-width: 760px) {
  .hero.entered .polaroid-wrap { animation: none; }
  /* Bỏ animation-vào cho hint (đặt SAU rule entrance để thắng): opacity do
     class .hide điều khiển, không bị animation fill khoá ở 1. */
  .hero.entered .scroll-hint { animation: none; }
}
/* Không animate .hero-fx: nó có opacity riêng (0.4 desktop / 0.18 mobile),
   animate opacity sẽ kéo về 1 làm hạt tim đậm lên và hỏng fix mobile. */

@media (prefers-reduced-motion: reduce) {
  .hero.entered .seal-sm, .hero.entered .kicker, .hero.entered .hero-names,
  .hero.entered .facts, .hero.entered .venue-jump, .hero.entered .invite-lbl,
  .hero.entered .guest, .hero.entered .polaroid-wrap, .hero.entered .scroll-hint
  { animation: none; }
}

.polaroid {
  /* Khử răng cưa khi khung xoay: giữ layer GPU riêng, ép lọc mượt */
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  position: relative;
  width: 320px;
  background: #fff;
  padding: 14px 14px 54px;
  box-shadow: 0 18px 44px rgba(60, 50, 30, 0.25);
  animation: swayPolaroid 6s ease-in-out infinite;
}
.polaroid img { display: block; width: 100%; height: 380px; object-fit: cover; object-position: 50% 12%; }
.polaroid-cap {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 21px;
  color: #7a4f2a;
}

.scroll-hint {
  position: absolute;
  bottom: 22px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--faint);
}
.sh-text { font-size: 9px; letter-spacing: 4px; font-weight: 600; }
.sh-arrow { margin-top: 4px; font-size: 15px; color: var(--seal); animation: bounceDown 1.4s ease-in-out infinite; }

/* Mobile: gợi ý "CUỘN XUỐNG" cố định đáy màn (luôn thấy khi ở Hero), mờ đi khi
   đã cuộn khỏi Hero. Đặt SAU rule .scroll-hint gốc để thắng (media query không
   tăng specificity). */
@media (max-width: 760px) {
  .scroll-hint {
    position: fixed;
    bottom: 14px;
    z-index: 7;
    transition: opacity 0.45s ease;
  }
  .scroll-hint.hide { opacity: 0; pointer-events: none; }
}

/* ── section chung ── */
.sec-kicker { font-size: 10px; letter-spacing: 5px; font-weight: 800; }
.sec-kicker.warm { color: var(--gold-warm); }
.sec-kicker.gold { color: var(--gold-bright); }

/* ── COUNTDOWN ── */
.countdown {
  padding: 56px 24px;
  border-top: 1px solid var(--line-2);
  text-align: center;
  background: #fff;
}
.cd-note { margin-top: 22px; font-size: 24px; color: var(--gold); }

/* ── GIA ĐÌNH ── */
.family { padding: 56px 24px; border-top: 1px solid var(--line-2); background: var(--paper-2); }
.family-inner { max-width: 880px; margin: 0 auto; text-align: center; }
.families {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}
.fam-body { margin-top: 12px; font-size: 14px; line-height: 1.7; color: var(--muted); }
.fam-body :deep(strong) { color: var(--ink); font-size: 15px; }
.hr { margin: 36px auto; height: 1px; max-width: 520px; background: var(--line-2); }
.bao-tin { font-size: 11px; letter-spacing: 3px; font-weight: 800; line-height: 2; }
.child { margin-top: 22px; font-size: 32px; }
.child + .roles + .child { margin-top: 0; }
.roles {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--soft);
  font-weight: 600;
}
.roles .heart { color: var(--seal); font-size: 15px; }
.ceremony { margin-top: 26px; font-size: 14px; line-height: 1.9; color: var(--muted); }
.ceremony :deep(strong), .ceremony strong { color: var(--ink); }
.ceremony .lunar { color: var(--soft); }

/* ── TIỆC CƯỚI ── */
.party {
  overflow: hidden;
  padding: 64px 24px;
  background: linear-gradient(150deg, var(--wine-1), var(--wine-2) 75%);
}
.party-fx { position: absolute; inset: 0; opacity: 0.55; }
.party-border { position: absolute; inset: 14px; border: 1px solid rgba(230, 190, 110, 0.35); pointer-events: none; }
.party-inner {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 36px;
  align-items: center;
}
.party-info { text-align: center; color: var(--cream); }
.ring-han {
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;
  border-radius: 50%;
  border: 1px solid var(--gold-bright);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ring-han span { font-size: 26px; color: var(--gold-bright); }
.party-lead { margin-top: 12px; font-size: 13px; color: rgba(247, 232, 200, 0.85); }
.venue { margin-top: 16px; font-size: clamp(42px, 10vw, 52px); letter-spacing: 2px; color: #fff; text-shadow: 0 2px 18px rgba(0, 0, 0, 0.3); }
.hall { margin-top: 6px; font-size: 13px; letter-spacing: 3px; font-weight: 800; color: var(--gold-bright); }
.party-addr { margin-top: 12px; font-size: 13px; line-height: 1.7; color: rgba(247, 232, 200, 0.85); }
.party-time {
  margin: 22px auto 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 320px;
  border-top: 1px solid rgba(230, 190, 110, 0.4);
  border-bottom: 1px solid rgba(230, 190, 110, 0.4);
}
.party-time > div { padding: 14px 0; }
.pt-div { border-left: 1px solid rgba(230, 190, 110, 0.4); }
.pt-top { font-size: 19px; font-weight: 800; color: #fff; }
.pt-sub { margin-top: 2px; font-size: 9px; letter-spacing: 2px; color: var(--gold-bright); }
.party-btns { margin-top: 26px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 14px 22px;
  border-radius: 2px;
  transition: opacity 0.25s ease, background 0.25s ease, color 0.25s ease;
}
.btn.solid { background: var(--gold-bright); color: var(--wine-2); }
.btn.solid:hover { opacity: 0.85; }
.btn.ghost { background: transparent; color: var(--cream); border: 1px solid rgba(247, 232, 200, 0.7); }
.btn.ghost:hover { background: var(--gold-bright); color: var(--wine-2); }
.party-map { position: relative; border: 1px solid rgba(230, 190, 110, 0.5); background: #fff; padding: 8px; box-shadow: 0 16px 44px rgba(0, 0, 0, 0.3); }
.map-frame {
  display: block;
  width: 100%;
  height: 320px;
  border: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.map-frame.ready { opacity: 1; }

/* Lớp phủ bản đồ: hiện khi đang tải / lỗi (nhấn để chỉ đường) */
.map-cover {
  position: absolute;
  inset: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  background: #eef1ec;
  color: var(--wine-1);
  text-decoration: none;
}
.map-cover.error { background: #f2ece4; }
.map-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(90, 35, 32, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(90, 35, 32, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
}
.map-pin {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fff;
  color: var(--seal);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}
.map-label {
  position: relative;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 700;
  color: var(--wine-1);
}

/* ── MỪNG CƯỚI QR ── */
.gift { padding: 56px 24px; border-top: 1px solid var(--line-2); background: #fff; text-align: center; }
.gift-lead { margin-top: 14px; font-size: 13px; line-height: 1.8; color: var(--muted); }
.qr { margin: 24px auto 0; max-width: 260px; border: 1px solid var(--line); background: #fff; }
.qr img { display: block; width: 100%; }
.qr-empty {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--soft);
}
.qr-empty .font-han { font-size: 40px; color: var(--gold); opacity: 0.7; }
.qr-empty p { font-size: 11px; letter-spacing: 0.1em; }
.gift-cap { margin-top: 12px; font-size: 12px; color: var(--muted); }

/* ── FOOTER ── */
.footer { padding: 44px 24px 56px; border-top: 1px solid var(--line-2); background: var(--paper-2); text-align: center; }
.foot-text { font-size: 13px; line-height: 1.9; color: var(--muted); }
.foot-thanks { margin-top: 12px; font-size: 32px; color: var(--gold); }
.foot-seal {
  margin: 18px auto 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--seal);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.8s ease-in-out infinite;
}
.foot-seal span { font-size: 20px; color: #fcf6ea; line-height: 1; }

.foot-meta { margin-top: 28px; }
.foot-link {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--gold-warm);
  border-bottom: 1px solid var(--line);
  padding-bottom: 3px;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.foot-link:hover { color: var(--seal); border-bottom-color: var(--gold); }
.copyright {
  margin-top: 16px;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--faint);
}
</style>
