<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * skill-creator's description optimizer (scores are illustrative).
 * 1 should-trigger prompts · 2 near-miss prompts · 3 train/test split
 * 4 rounds of rewrites · 5 best description picked by TEST score
 */
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const yes = [
  'ส่งไปลาดพร้าว 8 กม. ยอด 350 บาท ค่าส่งเท่าไหร่ครับ',
  'my order is 300 baht, I\'m ~12 km away in Bang Na, how much to ship?',
  'is shipping free if I add one more item to hit 600?',
]
const no = [
  'how much is a Grab from your shop to the airport?',
  'are you open on Sunday afternoon?',
  'calculate 7% VAT on a 500 baht order',
]
const rounds = [
  { train: 55, test: 50 },
  { train: 75, test: 70 },
  { train: 90, test: 85 },
  { train: 95, test: 80 },
  { train: 100, test: 75 },
]
const best = 2
</script>

<template>
  <div class="te">
    <div class="lists">
      <div class="list yes" :class="{ on: c >= 1 }">
        <div class="lh">✓ should trigger <small>8–10 like these</small></div>
        <div v-for="q in yes" :key="q" class="q">“{{ q }}”</div>
      </div>
      <div class="list no" :class="{ on: c >= 2 }">
        <div class="lh">✗ should NOT trigger <small>near-misses</small></div>
        <div v-for="q in no" :key="q" class="q">“{{ q }}”</div>
      </div>
    </div>

    <div class="right">
      <div class="split" :class="{ on: c >= 3 }">
        <div class="split-bar">
          <span class="train">60% train</span><span class="test">40% held-out test</span>
        </div>
        <small>each prompt is run 3× to get a reliable trigger rate</small>
      </div>

      <div class="rounds" :class="{ on: c >= 4 }">
        <div class="rh">Claude rewrites the description · up to 5 rounds</div>
        <div class="chart">
          <div v-for="(r, i) in rounds" :key="i" class="round" :class="{ best: c >= 5 && i === best }">
            <div class="bars">
              <i class="tr" :style="{ height: c >= 4 ? `${r.train}%` : '0%', transitionDelay: `${i * 120}ms` }" />
              <i class="ts" :style="{ height: c >= 4 ? `${r.test}%` : '0%', transitionDelay: `${i * 120 + 60}ms` }" />
            </div>
            <span>R{{ i + 1 }}</span>
          </div>
        </div>
        <div class="legend"><span><i class="tr" /> train</span><span><i class="ts" /> test</span></div>
      </div>

      <div class="pick" :class="{ on: c >= 5 }">
        <b>Best = highest <u>test</u> score (R3)</b>, not train. R5 just memorised the training prompts.
      </div>
    </div>
  </div>
</template>

<style scoped>
.te { display: grid; grid-template-columns: 1.15fr 1fr; gap: 22px; align-items: start; }
.lists { display: flex; flex-direction: column; gap: 12px; }
.list {
  --c: var(--teal); --s: var(--teal-soft); --k: var(--teal-ink);
  background: var(--surface); border: 1px solid var(--line); border-top: 4px solid var(--c);
  border-radius: 12px; padding: 8px 12px 10px; box-shadow: var(--shadow);
  opacity: 0; transform: translateY(10px); transition: all .5s var(--ease);
}
.list.on { opacity: 1; transform: none; }
.list.no { --c: var(--rose); --s: var(--rose-soft); --k: var(--rose-ink); }
.lh { font: 700 13px 'Space Grotesk', sans-serif; color: var(--k); margin-bottom: 5px; }
.lh small { font: 600 10px 'JetBrains Mono', monospace; color: var(--muted); margin-left: 6px; }
.q { font-size: 12px; background: var(--s); border-radius: 8px; padding: 4px 9px; margin-top: 4px; }

.right { display: flex; flex-direction: column; gap: 12px; }
.split, .rounds, .pick { opacity: 0; transform: translateY(10px); transition: all .5s var(--ease); }
.split.on, .rounds.on, .pick.on { opacity: 1; transform: none; }
.split-bar { display: flex; height: 30px; border-radius: 9px; overflow: hidden; font: 700 11px 'JetBrains Mono', monospace; }
.split-bar span { display: grid; place-items: center; color: white; }
.train { width: 60%; background: var(--indigo); }
.test { width: 40%; background: var(--clay); }
.split small { font-size: 11px; color: var(--muted); }

.rounds { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 9px 12px; box-shadow: var(--shadow); }
.rh { font: 700 10px 'JetBrains Mono', monospace; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.chart { display: flex; gap: 12px; height: 100px; align-items: flex-end; margin-top: 8px; }
.round { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; height: 100%; border-radius: 8px; transition: background .4s; }
.round.best { background: var(--clay-soft); }
.bars { flex: 1; width: 100%; display: flex; gap: 3px; align-items: flex-end; justify-content: center; }
.bars i { width: 12px; border-radius: 4px 4px 0 0; transition: height .8s var(--ease); }
i.tr { background: var(--indigo); }
i.ts { background: var(--clay); }
.round span { font: 700 10px 'JetBrains Mono', monospace; color: var(--muted); }
.round.best span { color: var(--clay-ink); }
.legend { display: flex; gap: 14px; font-size: 11px; color: var(--muted); margin-top: 4px; }
.legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
.pick { border-left: 4px solid var(--clay); background: var(--surface); border-radius: 0 10px 10px 0; padding: 8px 12px; font-size: 12.5px; box-shadow: var(--shadow); }
</style>
