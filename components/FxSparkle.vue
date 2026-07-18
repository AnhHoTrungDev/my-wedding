<template>
  <div ref="host" class="fx" aria-hidden="true"></div>
</template>

<script setup lang="ts">
// Port từ effects3d.js — fx-sparkle (bụi vàng lấp lánh cho nền rượu vang)
const host = ref<HTMLElement | null>(null)

useThreeFx(host, (THREE, scene) => {
  const mkTex = () => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const x = c.getContext('2d')!
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,240,200,1)')
    g.addColorStop(0.35, 'rgba(255,215,140,0.55)')
    g.addColorStop(1, 'rgba(255,215,140,0)')
    x.fillStyle = g
    x.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }
  const tex = mkTex()
  const clouds: import('three').Points[] = []
  const specs: [number, number, number][] = [
    [110, 0.55, 0.14],
    [60, 1.15, 0.08],
    [24, 2.2, 0.05]
  ]
  for (const [count, size, speed] of specs) {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24
      pos[i * 3 + 2] = -6 + Math.random() * 8
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      map: tex,
      size,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0xffd98c,
      opacity: 0.85
    })
    const p = new THREE.Points(geo, mat)
    p.userData = { speed, ph: Math.random() * 6 }
    scene.add(p)
    clouds.push(p)
  }

  return (t) => {
    for (const p of clouds) {
      const u = p.userData as { speed: number; ph: number }
      p.position.y = Math.sin(t * u.speed + u.ph) * 1.4
      p.position.x = Math.cos(t * u.speed * 0.7 + u.ph) * 1.1
      p.rotation.z = t * u.speed * 0.12
      ;(p.material as import('three').PointsMaterial).opacity =
        0.65 + Math.sin(t * 1.4 + u.ph) * 0.25
    }
  }
})
</script>

<style scoped>
.fx { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
</style>
