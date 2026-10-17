<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * Wraps real HTML (e.g. a benchmark table) and draws numbered callout boxes
 * around the elements tagged with data-co="<key>". Callout i appears on click i,
 * with an explanation card underneath. Everything is vector, so it stays sharp.
 *
 *   <BenchCallouts :callouts="[{ key: 'pass', title: '…', text: '…', tone: 'good' }]">
 *     <table> … <tr data-co="pass"> … </tr> … </table>
 *   </BenchCallouts>
 */
// each: true draws one box per tagged element instead of one box around all of them
interface Callout { key: string, title: string, text: string, tone?: 'good' | 'warn' | 'bad' | 'info', each?: boolean }
interface Box { left: number, top: number, width: number, height: number }

const props = withDefaults(defineProps<{ callouts: Callout[], cols?: number, pad?: number }>(), { cols: 3, pad: 3 })

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const host = ref<HTMLElement>()
const boxes = ref<Record<string, Box[]>>({})

function measure() {
  const el = host.value
  if (!el)
    return
  const hostRect = el.getBoundingClientRect()
  // Slidev scales the whole slide; convert screen pixels back to slide pixels
  const k = el.offsetWidth ? hostRect.width / el.offsetWidth : 1
  const out: typeof boxes.value = {}
  for (const co of props.callouts) {
    const targets = Array.from(el.querySelectorAll<HTMLElement>(`[data-co~="${co.key}"]`))
    if (!targets.length)
      continue
    const toBox = (rects: DOMRect[]): Box => {
      const l = Math.min(...rects.map(r => r.left))
      const t = Math.min(...rects.map(r => r.top))
      const r = Math.max(...rects.map(x => x.right))
      const b = Math.max(...rects.map(x => x.bottom))
      return {
        left: (l - hostRect.left) / k - props.pad,
        top: (t - hostRect.top) / k - props.pad,
        width: (r - l) / k + props.pad * 2,
        height: (b - t) / k + props.pad * 2,
      }
    }
    const rects = targets.map(tEl => tEl.getBoundingClientRect())
    out[co.key] = co.each ? rects.map(r => toBox([r])) : [toBox(rects)]
  }
  boxes.value = out
}

let ro: ResizeObserver | undefined
onMounted(async () => {
  await nextTick()
  measure()
  document.fonts?.ready.then(measure)
  ro = new ResizeObserver(measure)
  if (host.value)
    ro.observe(host.value)
})
onBeforeUnmount(() => ro?.disconnect())
watch(c, () => nextTick(measure))
</script>

<template>
  <div class="bc">
    <div ref="host" class="host">
      <slot />
      <template v-for="(co, i) in props.callouts" :key="co.key">
        <span
          v-for="(bx, j) in boxes[co.key] ?? []"
          :key="j"
          class="box"
          :class="[co.tone ?? 'info', { on: c >= i + 1, now: c === i + 1 }]"
          :style="{
            left: `${bx.left}px`,
            top: `${bx.top}px`,
            width: `${bx.width}px`,
            height: `${bx.height}px`,
          }"
        ><b v-if="j === 0" class="badge">{{ i + 1 }}</b></span>
      </template>
    </div>

    <div class="cards" :style="{ gridTemplateColumns: `repeat(${props.cols}, 1fr)` }">
      <div
        v-for="(co, i) in props.callouts"
        :key="co.key"
        class="card"
        :class="[co.tone ?? 'info', { on: c >= i + 1, now: c === i + 1 }]"
      >
        <b class="n">{{ i + 1 }}</b>
        <div>
          <strong>{{ co.title }}</strong>
          <p>{{ co.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bc { display: flex; flex-direction: column; gap: 12px; }
.host { position: relative; }
.box {
  --c: var(--indigo);
  position: absolute;
  pointer-events: none;
  border: 2.5px solid var(--c);
  border-radius: 7px;
  opacity: 0;
  transform: scale(1.03);
  transition: opacity .35s var(--ease), transform .35s var(--ease);
  z-index: 5;
}
.box.on { opacity: .45; transform: none; }
.box.now { opacity: 1; animation: pulse 1.6s ease-in-out infinite; }
.box.good { --c: var(--green); }
.box.warn { --c: var(--amber); }
.box.bad { --c: var(--rose); }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 18%, transparent); }
  50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--c) 30%, transparent); }
}
.badge {
  position: absolute; top: -11px; left: -11px;
  width: 21px; height: 21px; border-radius: 50%;
  background: var(--c); color: white;
  display: grid; place-items: center;
  font: 700 11px 'Space Grotesk', sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
}

.cards { display: grid; gap: 8px; }
.card {
  --c: var(--indigo);
  display: flex; gap: 8px; align-items: flex-start;
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--c);
  border-radius: 0 10px 10px 0;
  padding: 7px 10px;
  opacity: 0; transform: translateY(8px);
  transition: all .4s var(--ease);
}
.card.on { opacity: .7; transform: none; }
.card.now { opacity: 1; box-shadow: var(--shadow); }
.card.good { --c: var(--green); }
.card.warn { --c: var(--amber); }
.card.bad { --c: var(--rose); }
.n {
  flex: none; width: 20px; height: 20px; border-radius: 50%;
  background: var(--c); color: white; display: grid; place-items: center;
  font: 700 11px 'Space Grotesk', sans-serif; margin-top: 1px;
}
.card strong { display: block; font: 700 13px/1.25 'Space Grotesk', sans-serif; }
.card p { margin: 2px 0 0; font-size: 11.5px; line-height: 1.4; color: var(--muted); }
</style>
