<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { asset } from '../utils/asset'

/**
 * Step-by-step "install a skill in the Claude app".
 * Left: the steps. Right: a real screenshot of the current step,
 * with a pulsing box on what to click. One click = next step.
 *
 * Screenshots live in public/claude-app/. Rings are in % of the image.
 */
interface Ring { x: number, y: number, w: number, h: number }
interface Step {
  title: string
  detail: string
  where?: string
  img?: string
  w?: number
  h?: number
  rings?: Ring[]
  chat?: { prompt: string, reply: string }
}

const props = defineProps<{ steps: Step[] }>()

const { $clicks } = useSlideContext()
const current = computed(() => Math.min(Number($clicks.value ?? 0), props.steps.length - 1))

// Fit each screenshot inside the panel without distortion, so the % rings stay aligned
const PANEL_W = 560
const PANEL_H = 300
function fit(s: Step) {
  if (!s.w || !s.h)
    return {}
  const k = Math.min(PANEL_W / s.w, PANEL_H / s.h)
  return { width: `${Math.round(s.w * k)}px`, height: `${Math.round(s.h * k)}px` }
}
</script>

<template>
  <div class="install">
    <ol class="list">
      <li
        v-for="(s, i) in props.steps"
        :key="i"
        :class="{ now: i === current, done: i < current }"
      >
        <span class="n">{{ i < current ? '✓' : i + 1 }}</span>
        <div>
          <b>{{ s.title }}</b>
          <small v-if="s.where" class="where">{{ s.where }}</small>
          <p>{{ s.detail }}</p>
        </div>
      </li>
    </ol>

    <div class="panel">
      <div class="bar">
        <span class="dot" style="background:#ef8f7b" />
        <span class="dot" style="background:#f0c36b" />
        <span class="dot" style="background:#7cc38c" />
        <span class="url">claude.ai</span>
        <span class="step-tag">step {{ current + 1 }} / {{ props.steps.length }}</span>
      </div>
      <div class="stage">
        <template v-for="(s, i) in props.steps" :key="i">
          <div class="shot" :class="{ on: i === current }">
            <div v-if="s.img" class="frame" :style="fit(s)">
              <img :src="asset(s.img)" :alt="s.title">
              <span
                v-for="(r, j) in s.rings ?? []"
                :key="j"
                class="ring"
                :style="{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%`, animationDelay: `${j * 0.35}s` }"
              />
            </div>
            <div v-else-if="s.chat" class="chat">
              <div class="msg user" v-copy="s.chat.prompt">{{ s.chat.prompt }}</div>
              <div class="msg ai"><span class="av">C</span><span class="emoji">{{ s.chat.reply }}</span></div>
              <div class="hint">open a <b>new chat</b> first, so the skill list is fresh</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.install {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 22px;
  align-items: start;
}
.list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.list li {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 5px 10px; border-radius: 12px;
  border: 1px solid transparent;
  opacity: 0.45;
  transition: all 0.4s var(--ease);
}
.list li.done { opacity: 0.75; }
.list li.now {
  opacity: 1;
  background: var(--surface);
  border-color: var(--line);
  box-shadow: var(--shadow);
}
.n {
  flex: none; width: 24px; height: 24px; border-radius: 8px;
  display: grid; place-items: center;
  font: 700 12px 'Space Grotesk', sans-serif;
  background: var(--paper-2); color: var(--muted);
}
.now .n { background: var(--clay); color: white; }
.done .n { background: var(--green-soft); color: var(--green-ink); }
.list b { display: block; font: 700 14px/1.25 'Space Grotesk', sans-serif; }
.where {
  display: inline-block; margin-top: 2px;
  font: 600 10px 'JetBrains Mono', monospace; color: var(--clay-ink);
}
.list p { margin: 2px 0 0; font-size: 11px; line-height: 1.4; color: var(--muted); max-height: 0; overflow: hidden; transition: max-height 0.4s var(--ease); }
.list li.now p { max-height: 80px; }

.panel {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow);
  background: #1b1b1b;
}
.bar {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  background: var(--paper-2);
  border-bottom: 1px solid var(--line);
}
.dot { width: 9px; height: 9px; border-radius: 50%; }
.url { margin-left: 8px; font: 11px 'JetBrains Mono', monospace; color: var(--muted); }
.step-tag { margin-left: auto; font: 700 10px 'JetBrains Mono', monospace; color: var(--clay-ink); text-transform: uppercase; letter-spacing: .08em; }
.stage { position: relative; height: 318px; }
.shot {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  opacity: 0; transform: translateX(16px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease);
  pointer-events: none;
}
.shot.on { opacity: 1; transform: none; pointer-events: auto; }
.frame { position: relative; border-radius: 8px; overflow: hidden; box-shadow: 0 0 0 1px rgba(255,255,255,0.08); }
.frame img { width: 100%; height: 100%; display: block; }
.ring {
  position: absolute;
  border: 3px solid var(--clay);
  border-radius: 8px;
  box-shadow: 0 0 0 4px rgba(217, 113, 75, 0.25);
  animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(217, 113, 75, 0.15); }
  50% { box-shadow: 0 0 0 9px rgba(217, 113, 75, 0.35); }
}

.chat { width: 78%; display: flex; flex-direction: column; gap: 12px; }
.msg { border-radius: 14px; padding: 9px 14px; font-size: 14px; }
.msg.user { align-self: flex-end; background: #3a3127; color: #f3e9dc; }
.msg.ai { align-self: flex-start; display: flex; gap: 10px; align-items: center; background: #262626; color: #eee; }
.av { width: 24px; height: 24px; border-radius: 8px; background: var(--clay); color: white; display: grid; place-items: center; font: 700 12px 'Space Grotesk'; }
.emoji { font-size: 26px; letter-spacing: 4px; }
.hint { text-align: center; font: 600 10.5px 'JetBrains Mono', monospace; color: #9a9a9a; }
.hint b { color: #f3a684; }
</style>
