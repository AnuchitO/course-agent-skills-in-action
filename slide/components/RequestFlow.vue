<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * Sequence diagram: AGENT (left) ⇄ MODEL (right).
 * Step n appears on click n. The current step is ringed.
 *
 * lane:  'user'  – full-width banner (request in / answer out)
 *        'agent' – box in the left lane
 *        'model' – box in the right lane
 * arrow: 'right' (agent → model) or 'left' (model → agent), drawn in the middle
 */
interface Step {
  lane: 'user' | 'agent' | 'model'
  title: string
  detail?: string
  arrow?: 'left' | 'right'
  label?: string
  code?: boolean
  skipped?: boolean
}

const props = withDefaults(defineProps<{ steps: Step[]; compact?: boolean }>(), { compact: false })

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))
</script>

<template>
  <div class="flow" :class="{ compact: props.compact }">
    <div class="band agent-band"><span>Agent / harness</span><small>reads files · runs scripts</small></div>
    <div class="band model-band"><span>Model (Claude)</span><small>reads · decides · asks</small></div>

    <div class="rows">
      <div
        v-for="(s, i) in props.steps"
        :key="i"
        class="row"
        :class="[s.lane, { on: c >= i + 1, now: c === i + 1, skipped: s.skipped }]"
      >
        <template v-if="s.lane === 'user'">
          <div class="box user-box">
            <span class="n">{{ i + 1 }}</span>
            <b>{{ s.title }}</b>
            <span v-if="s.detail" class="detail">{{ s.detail }}</span>
          </div>
        </template>

        <template v-else>
          <div class="cell left">
            <div v-if="s.lane === 'agent'" class="box agent-box">
              <span class="n">{{ i + 1 }}</span>
              <div>
                <b>{{ s.title }}</b>
                <span v-if="s.detail" class="detail" :class="{ mono: s.code }">{{ s.detail }}</span>
              </div>
            </div>
          </div>

          <div class="cell mid">
            <div v-if="s.arrow" class="arrow" :class="s.arrow">
              <span class="label">{{ s.label }}</span>
              <svg viewBox="0 0 200 16" preserveAspectRatio="none">
                <line x1="6" y1="8" x2="194" y2="8" />
                <polyline v-if="s.arrow === 'right'" points="182,2 194,8 182,14" />
                <polyline v-else points="18,2 6,8 18,14" />
              </svg>
            </div>
          </div>

          <div class="cell right">
            <div v-if="s.lane === 'model'" class="box model-box">
              <span class="n">{{ i + 1 }}</span>
              <div>
                <b>{{ s.title }}</b>
                <span v-if="s.detail" class="detail" :class="{ mono: s.code }">{{ s.detail }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 210px 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 0;
}
.band {
  grid-row: 1 / 3;
  border-radius: 16px;
  padding: 8px 14px;
  display: flex; flex-direction: column;
}
.band span { font: 700 14px 'Space Grotesk', sans-serif; }
.band small { font: 600 9.5px 'JetBrains Mono', monospace; letter-spacing: .08em; text-transform: uppercase; opacity: .75; }
.agent-band { grid-column: 1; background: var(--teal-soft); color: var(--teal-ink); }
.model-band { grid-column: 3; background: var(--indigo-soft); color: var(--indigo-ink); align-items: flex-end; text-align: right; }

.rows {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
  padding-top: 46px;
  padding-bottom: 8px;
  display: flex; flex-direction: column; gap: 7px;
  position: relative;
}
.row {
  display: grid;
  grid-template-columns: 1fr 210px 1fr;
  align-items: center;
  min-height: 38px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
}
.row.on { opacity: 1; transform: none; }
.row.skipped.on { opacity: 0.38; }
.row.user { grid-template-columns: 1fr; justify-items: center; }

.cell { padding: 0 10px; display: flex; }
.cell.right { justify-content: flex-end; }

.box {
  display: flex; align-items: center; gap: 9px;
  background: var(--surface);
  border: 1.5px solid var(--line);
  border-radius: 11px;
  padding: 5px 11px 5px 6px;
  font-size: 12.5px;
  line-height: 1.3;
  box-shadow: var(--shadow);
  max-width: 100%;
  transition: box-shadow 0.3s, border-color 0.3s;
}
.box b { font-family: 'Space Grotesk', sans-serif; display: block; }
.detail { display: block; font-size: 11px; color: var(--muted); }
.detail.mono { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: var(--ink); }
.n {
  flex: none;
  width: 22px; height: 22px; border-radius: 7px;
  display: grid; place-items: center;
  font: 700 11.5px 'Space Grotesk', sans-serif; color: white;
}
.agent-box .n { background: var(--teal); }
.model-box .n { background: var(--indigo); }
.user-box {
  background: var(--amber-soft);
  border-color: var(--amber);
  padding: 5px 16px 5px 6px;
}
.user-box .n { background: var(--amber); }
.user-box b { display: inline; margin-right: 8px; }
.user-box .detail { display: inline; color: var(--ink); }

.now .agent-box { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(42,157,143,.18), var(--shadow); }
.now .model-box { border-color: var(--indigo); box-shadow: 0 0 0 4px rgba(81,96,214,.18), var(--shadow); }
.now .user-box { box-shadow: 0 0 0 4px rgba(227,161,51,.22), var(--shadow); }

.arrow { position: relative; width: 100%; }
.arrow svg { width: 100%; height: 16px; display: block; overflow: visible; }
.arrow line, .arrow polyline {
  fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round;
}
.arrow.right line, .arrow.right polyline { stroke: var(--teal); }
.arrow.left line, .arrow.left polyline { stroke: var(--indigo); }
.arrow line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  transition: stroke-dashoffset 0.7s var(--ease) 0.15s;
}
.row.on .arrow line { stroke-dashoffset: 0; }
.arrow polyline { opacity: 0; transition: opacity 0.3s 0.7s; }
.row.on .arrow polyline { opacity: 1; }
.label {
  position: absolute; left: 50%; top: -15px; transform: translateX(-50%);
  white-space: nowrap;
  font: 700 10px 'JetBrains Mono', monospace;
  background: var(--paper); padding: 0 5px; border-radius: 4px;
}
.arrow.right .label { color: var(--teal-ink); }
.arrow.left .label { color: var(--indigo-ink); }
.compact .rows { padding-top: 40px; gap: 3px; }
.compact .row { min-height: 32px; }
.compact .box { padding: 3px 10px 3px 5px; font-size: 12px; }
.compact .detail { font-size: 10.5px; }
.compact .n { width: 20px; height: 20px; font-size: 11px; }
</style>
