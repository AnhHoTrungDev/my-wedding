<template>
  <div ref="host" class="fx" aria-hidden="true"></div>
</template>

<script setup lang="ts">
// Port từ effects3d.js — fx-holo-heart (chế độ "light" cho nền kem)
const host = ref<HTMLElement | null>(null)

useThreeFx(host, (THREE, scene) => {
  const light = true // tuned for cream backgrounds
  const n = 2600
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const t = Math.random() * Math.PI * 2
    const hx = 16 * Math.pow(Math.sin(t), 3)
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    const r = Math.cbrt(Math.random())
    pos[i * 3] = hx * 0.16 * r + (Math.random() - 0.5) * 0.12
    pos[i * 3 + 1] = hy * 0.16 * r + (Math.random() - 0.5) * 0.12
    pos[i * 3 + 2] = (Math.random() - 0.5) * 1.3 * (1.1 - r * 0.6)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const heart = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      color: light ? 0xb3803a : 0xffc46b,
      size: light ? 0.05 : 0.055,
      transparent: true,
      opacity: light ? 0.75 : 0.95,
      depthWrite: false,
      blending: light ? THREE.NormalBlending : THREE.AdditiveBlending
    })
  )
  const g = new THREE.Group()
  g.add(heart)
  g.position.y = 1.6
  scene.add(g)

  // ambient dust
  const dn = 260
  const dp = new Float32Array(dn * 3)
  for (let i = 0; i < dn; i++) {
    dp[i * 3] = (Math.random() - 0.5) * 22
    dp[i * 3 + 1] = (Math.random() - 0.5) * 24
    dp[i * 3 + 2] = -6 + Math.random() * 7
  }
  const dg = new THREE.BufferGeometry()
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3))
  const dust = new THREE.Points(
    dg,
    new THREE.PointsMaterial({
      color: light ? 0xc9a45c : 0x8ad7ff,
      size: 0.05,
      transparent: true,
      opacity: light ? 0.5 : 0.6,
      depthWrite: false,
      blending: light ? THREE.NormalBlending : THREE.AdditiveBlending
    })
  )
  scene.add(dust)

  return (t) => {
    g.rotation.y = t * 0.5
    g.scale.setScalar(1 + Math.sin(t * 2.2) * 0.045)
    heart.material.opacity = (light ? 0.65 : 0.8) + Math.sin(t * 2.2) * (light ? 0.12 : 0.2)
    dust.rotation.y = -t * 0.02
  }
})
</script>

<style scoped>
.fx { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
</style>
