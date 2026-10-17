<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// columns appear on clicks 1, 2, 3; click 4 lights the full row of "all five"
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const gaps = ['🔒 Private knowledge', '🎯 Consistency', '🧠 Memory across chats', '📋 Reliable procedure', '⚙️ Running real code']
const demos = [
  { name: 'Demo 0', skill: 'emoji-only', cover: [0, 1, 1, 0, 0], star: 2 },
  { name: 'Demo 1', skill: 'expense-check', cover: [1, 1, 1, 1, 0], star: 0 },
  { name: 'Demo 2', skill: 'delivery-fee', cover: [1, 1, 1, 1, 1], star: 4 },
]
</script>

<template>
 <div>
  <div class="gm">
    <div class="cell corner" />
    <div v-for="(d, j) in demos" :key="d.name" class="cell colhead" :class="{ on: c >= j + 1 }">
      <b>{{ d.name }}</b><code>{{ d.skill }}</code>
    </div>

    <template v-for="(g, i) in gaps" :key="g">
      <div class="cell rowhead">{{ g }}</div>
      <div
        v-for="(d, j) in demos"
        :key="d.name + i"
        class="cell mark"
        :class="{ on: c >= j + 1, yes: d.cover[i], star: d.star === i }"
        :style="{ transitionDelay: `${i * 70}ms` }"
      >
        <span v-if="d.star === i" class="dot star-dot">★ new</span>
        <span v-else-if="d.cover[i]" class="dot">●</span>
        <span v-else class="dash">—</span>
      </div>
    </template>
  </div>
  <div class="foot" :class="{ on: c >= 4 }">Each demo keeps what the last one had and adds <b>one</b> new gap. Demo 2 covers all five.</div>
 </div>
</template>

<style scoped>
.gm {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.cell {
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center;
}
.corner, .colhead { background: var(--paper-2); }
.colhead {
  flex-direction: column; align-items: center; gap: 2px;
  opacity: 0.25; transition: opacity 0.4s;
}
.colhead.on { opacity: 1; }
.colhead b { font: 700 15px 'Space Grotesk', sans-serif; }
.colhead code { font-size: 10.5px !important; }
.rowhead { font: 600 14px 'Space Grotesk', sans-serif; }
.mark { justify-content: center; }
.mark > span { opacity: 0; transform: scale(0.5); transition: all 0.45s var(--ease); }
.mark.on > span { opacity: 1; transform: none; }
.dot { color: var(--teal); font-size: 18px; }
.star-dot {
  font: 700 11px 'JetBrains Mono', monospace;
  color: white !important;
  background: var(--clay);
  padding: 3px 9px; border-radius: 999px;
}
.mark.star.on { background: var(--clay-soft); }
.dash { color: var(--line); font-size: 18px; }
.foot {
  margin-top: 14px; font-size: 14px; color: var(--muted);
  opacity: 0; transition: opacity 0.5s;
}
.foot.on { opacity: 1; }
.foot b { color: var(--clay-ink); }
</style>
