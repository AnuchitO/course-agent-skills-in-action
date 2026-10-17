<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * How skill-creator tests a skill (illustrative numbers, delivery-fee example).
 * 1 test prompts · 2 two runs per prompt · 3 outputs
 * 4 graded + you review · 5 benchmark · 6 feedback → improve
 */
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const prompts = [
  { q: '300 ฿ order, 12.5 km, Tue', with: '107 ฿', without: '≈ 106 ฿' },
  { q: '600 ฿ order, 5 km', with: 'Free', without: '61 ฿' },
  { q: '2 km on Sunday', with: 'No Sunday — try Mon', without: 'Sure, 40 ฿!' },
]
</script>

<template>
  <div class="ab">
    <!-- column heads -->
    <div class="head" :class="{ on: c >= 1 }">Test prompts</div>
    <div class="head" :class="{ on: c >= 2 }"><span class="lbl skill">with skill</span></div>
    <div class="head" :class="{ on: c >= 2 }"><span class="lbl base">without skill · baseline</span></div>
    <div class="head" :class="{ on: c >= 4 }">Graded</div>

    <template v-for="(p, i) in prompts" :key="i">
      <div class="cell prompt" :class="{ on: c >= 1 }" :style="{ transitionDelay: `${i * 90}ms` }">“{{ p.q }}”</div>
      <div class="cell run skill" :class="{ on: c >= 2, done: c >= 3 }" :style="{ transitionDelay: `${i * 90}ms` }">
        <span class="spin" /> <span class="out">{{ p.with }}</span>
      </div>
      <div class="cell run base" :class="{ on: c >= 2, done: c >= 3 }" :style="{ transitionDelay: `${i * 90}ms` }">
        <span class="spin" /> <span class="out">{{ p.without }}</span>
      </div>
      <div class="cell grade" :class="{ on: c >= 4 }" :style="{ transitionDelay: `${i * 90}ms` }">
        <span class="ok">✓</span><span class="bad">✗</span>
      </div>
    </template>

    <!-- benchmark -->
    <div class="bench" :class="{ on: c >= 5 }">
      <div class="bench-title">Benchmark · pass rate</div>
      <div class="bar-row"><span>with skill</span><div class="bar"><i class="fill skill" :style="{ width: c >= 5 ? '100%' : '0%' }" /></div><b>3 / 3</b></div>
      <div class="bar-row"><span>without</span><div class="bar"><i class="fill base" :style="{ width: c >= 5 ? '8%' : '0%' }" /></div><b>0 / 3</b></div>
    </div>

    <div class="you" :class="{ on: c >= 6 }">
      <span class="who">You · in the review page</span>
      “Sunday answer is right, but it should also say <b>when</b> we deliver next.”
      <div class="next">→ Claude improves SKILL.md and runs round 2</div>
    </div>
  </div>
</template>

<style scoped>
.ab {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr 70px;
  column-gap: 12px;
  row-gap: 8px;
  align-items: center;
}
.head {
  font: 700 10px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase;
  color: var(--muted); opacity: 0; transition: opacity .4s;
}
.head.on { opacity: 1; }
.lbl { padding: 3px 8px; border-radius: 999px; }
.lbl.skill { background: var(--clay); color: white; }
.lbl.base { background: var(--paper-2); color: var(--muted); border: 1px solid var(--line); }
.cell {
  height: 40px; border-radius: 10px; display: flex; align-items: center; gap: 8px;
  padding: 0 12px; font-size: 13px;
  opacity: 0; transform: translateY(6px); transition: all .45s var(--ease);
}
.cell.on { opacity: 1; transform: none; }
.prompt { background: var(--amber-soft); border: 1.5px solid var(--amber); font-size: 12.5px; }
.run { background: var(--surface); border: 1.5px dashed var(--line); }
.run.skill.done { border: 2px solid var(--clay); }
.run.base.done { border: 1.5px solid var(--line); background: var(--paper-2); }
.spin {
  width: 12px; height: 12px; border-radius: 50%;
  border: 2px solid var(--line); border-top-color: var(--indigo);
  animation: spin .8s linear infinite;
}
.done .spin { display: none; }
@keyframes spin { to { transform: rotate(360deg); } }
.out { font: 600 13px 'JetBrains Mono', monospace; opacity: 0; transition: opacity .4s .1s; }
.done .out { opacity: 1; }
.run.base .out { color: var(--rose-ink); }
.run.skill .out { color: var(--teal-ink); }
.grade { justify-content: center; gap: 10px; font: 700 16px 'Space Grotesk', sans-serif; padding: 0; }
.grade .ok { color: var(--green); }
.grade .bad { color: var(--rose); }

.bench, .you {
  grid-column: span 2;
  margin-top: 12px;
  background: var(--surface); border: 1px solid var(--line); border-radius: 14px;
  padding: 10px 14px; box-shadow: var(--shadow);
  opacity: 0; transform: translateY(10px); transition: all .5s var(--ease);
}
.you { grid-column: 3 / 5; border-left: 4px solid var(--amber); border-radius: 0 14px 14px 0; font-size: 13px; line-height: 1.45; }
.bench.on, .you.on { opacity: 1; transform: none; }
.bench-title { font: 700 10px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
.bar-row { display: grid; grid-template-columns: 74px 1fr 40px; align-items: center; gap: 8px; font-size: 12px; margin: 4px 0; }
.bar-row b { font: 700 12px 'JetBrains Mono', monospace; }
.bar { height: 14px; background: var(--paper-2); border-radius: 7px; overflow: hidden; }
.fill { display: block; height: 100%; border-radius: 7px; transition: width 1s var(--ease); }
.fill.skill { background: var(--clay); }
.fill.base { background: var(--neutral-bar); }
.who { display: block; font: 700 9.5px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--amber-ink); margin-bottom: 2px; }
.next { margin-top: 5px; font: 600 11.5px 'JetBrains Mono', monospace; color: var(--clay-ink); }
</style>
