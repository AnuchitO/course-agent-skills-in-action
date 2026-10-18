<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { asset } from '../utils/asset'

/**
 * A real screenshot with numbered callouts.
 * Callout i (1-based) appears on click i: a pulsing box on the image
 * plus an explanation card below. The newest one is highlighted.
 */
interface Callout {
  title: string
  text: string
  x: number // box position/size in % of the image
  y: number
  w: number
  h: number
  tone?: 'good' | 'warn' | 'bad' | 'info'
}

const props = withDefaults(defineProps<{
  src: string
  w: number
  h: number
  maxWidth?: number
  maxHeight?: number
  callouts: Callout[]
  cols?: number
}>(), { maxWidth: 860, maxHeight: 230, cols: 3 })

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const size = computed(() => {
  const k = Math.min(props.maxWidth / props.w, props.maxHeight / props.h)
  return { width: `${Math.round(props.w * k)}px`, height: `${Math.round(props.h * k)}px` }
})
</script>

<template>
  <div class="sc">
    <div class="shot" :style="size">
      <img :src="asset(src)" alt="">
      <template v-for="(co, i) in props.callouts" :key="i">
        <span
          class="box"
          :class="[co.tone ?? 'info', { on: c >= i + 1, now: c === i + 1 }]"
          :style="{ left: `${co.x}%`, top: `${co.y}%`, width: `${co.w}%`, height: `${co.h}%` }"
        >
          <b class="badge">{{ i + 1 }}</b>
        </span>
      </template>
    </div>

    <div class="cards" :style="{ gridTemplateColumns: `repeat(${props.cols}, 1fr)` }">
      <div
        v-for="(co, i) in props.callouts"
        :key="i"
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
.sc { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.shot {
  position: relative;
  border-radius: 10px;
  overflow: visible;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
}
.shot img { width: 100%; height: 100%; display: block; border-radius: 10px; }
.box {
  --c: var(--indigo);
  position: absolute;
  border: 2.5px solid var(--c);
  border-radius: 6px;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity .35s var(--ease), transform .35s var(--ease);
}
.box.on { opacity: .55; transform: none; }
.box.now { opacity: 1; animation: pulse 1.6s ease-in-out infinite; }
.box.good { --c: var(--green); }
.box.warn { --c: var(--amber); }
.box.bad { --c: var(--rose); }
.box.info { --c: var(--indigo); }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--c) 20%, transparent); }
  50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--c) 30%, transparent); }
}
.badge {
  position: absolute; top: -11px; left: -11px;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--c); color: white;
  display: grid; place-items: center;
  font: 700 11px 'Space Grotesk', sans-serif;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
}

.cards { display: grid; gap: 8px; width: 100%; }
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
