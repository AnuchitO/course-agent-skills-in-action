<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * "Why evals are slow" as one formula. Each click highlights one factor
 * and reveals the techniques that shrink it.
 *   wait ≈ evals × versions × repeats × time per run ÷ parallel
 */
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const terms = [
  { key: 'evals', label: 'evals', sub: 'test prompts' },
  { key: 'versions', label: 'versions', sub: 'with + without' },
  { key: 'repeats', label: 'repeats', sub: 'runs per prompt' },
  { key: 'time', label: 'time per run', sub: 'one answer' },
  { key: 'parallel', label: 'parallel', sub: 'at the same time', divide: true },
]

const cards = [
  {
    title: 'Fewer evals while iterating',
    tips: ['2–3 prompts per round; the full set only at the end', 'Re-run just the eval you changed or that failed'],
  },
  {
    title: 'Don’t re-run what didn’t change',
    tips: ['A brand-new skill’s baseline (no skill) is the same every round: reuse round 1’s', 'Run the baseline again only for the final check'],
  },
  {
    title: 'Fewer repeats for quick checks',
    tips: ['1 run per prompt while drafting; 3 runs before you trust a number', 'Trigger tuning: set runs‑per‑query 1 (default 3)'],
  },
  {
    title: 'Make each run cheaper',
    tips: ['Small input files, short expected answers', 'Lean SKILL.md: heavy detail in references/', 'Grade with a script, not an agent (skill-creator’s own tip)'],
  },
  {
    title: 'Run everything at once',
    tips: ['Claude Code: all runs + baselines in one turn (the app runs one by one)', 'Trigger tuning: raise num‑workers (default 10)'],
  },
]
</script>

<template>
  <div class="es">
    <div class="formula">
      <span class="w">wait&nbsp;≈</span>
      <template v-for="(t, i) in terms" :key="t.key">
        <span v-if="i > 0" class="op">{{ t.divide ? '÷' : '×' }}</span>
        <span class="term" :class="{ on: c >= i + 1, now: c === i + 1 }">
          <b>{{ t.label }}</b>
          <small>{{ t.sub }}</small>
          <em class="n">{{ i + 1 }}</em>
        </span>
      </template>
    </div>

    <div class="cards">
      <div
        v-for="(card, i) in cards"
        :key="card.title"
        class="card"
        :class="{ on: c >= i + 1, now: c === i + 1 }"
      >
        <div class="head"><em class="n">{{ i + 1 }}</em> {{ card.title }}</div>
        <ul>
          <li v-for="t in card.tips" :key="t">{{ t }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.es { display: flex; flex-direction: column; gap: 14px; }
.formula {
  display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 8px;
  background: var(--surface); border: 1px solid var(--line); border-radius: 14px;
  padding: 10px 14px; box-shadow: var(--shadow);
}
.w { font: 700 18px 'Space Grotesk', sans-serif; color: var(--muted); margin-right: 2px; }
.op { font: 700 20px 'Space Grotesk', sans-serif; color: var(--muted); }
.term {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  padding: 6px 12px; border-radius: 10px;
  border: 2px solid transparent;
  background: var(--paper-2);
  transition: all .35s var(--ease);
}
.term b { font: 700 16px 'Space Grotesk', sans-serif; white-space: nowrap; }
.term small { font: 600 9.5px 'JetBrains Mono', monospace; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; }
.term.on { background: var(--teal-soft); }
.term.on b { color: var(--teal-ink); }
.term.now { border-color: var(--teal); box-shadow: 0 0 0 4px color-mix(in srgb, var(--teal) 22%, transparent); }
.term .n { position: absolute; top: -9px; right: -9px; }
.n {
  display: inline-grid; place-items: center;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--teal); color: white;
  font: 700 10px 'Space Grotesk', sans-serif; font-style: normal;
  opacity: 0; transition: opacity .3s;
}
.term.on .n, .card .n { opacity: 1; }

.cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.card {
  background: var(--surface); border: 1px solid var(--line); border-top: 4px solid var(--teal);
  border-radius: 12px; padding: 9px 10px 10px;
  opacity: 0; transform: translateY(10px);
  transition: all .45s var(--ease);
}
.card.on { opacity: .75; transform: none; }
.card.now { opacity: 1; box-shadow: var(--shadow); }
.head { font: 700 13px/1.25 'Space Grotesk', sans-serif; display: flex; gap: 6px; align-items: flex-start; margin-bottom: 6px; }
.head .n { flex: none; margin-top: 1px; }
ul { margin: 0; padding-left: 14px; }
li { font-size: 11.5px; line-height: 1.4; color: var(--muted); margin: 3px 0; }
</style>
