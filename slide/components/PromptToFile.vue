<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// click 0: three copy-pasted prompts scattered
// click 1: they fold into one SKILL.md file — body only (the prompt itself)
// click 2: the frontmatter slides in on top, pushing the body down
// click 3: the file feeds every new chat automatically
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const FRONTMATTER = `---
name: emoji-only
description: Reply using only emoji, no words. Use when the user asks for emoji-only answers or says "emoji mode".
---`
const BODY = `Reply to everything using only emoji — no words, no letters, no numbers.
Capture the meaning with emoji alone.`
// What the copy button copies: exactly what the file shows at this step
const copyText = computed(() => (c.value >= 2 ? `${FRONTMATTER}\n\n${BODY}\n` : `${BODY}\n`))

const slips = [
  { x: -150, y: -60, r: -7 },
  { x: 20, y: -10, r: 4 },
  { x: -80, y: 55, r: -2 },
]
</script>

<template>
  <div class="stage">
    <!-- the prompt slips -->
    <div
      v-for="(s, i) in slips"
      :key="i"
      class="slip"
      :style="{
        transform: c >= 1
          ? `translate(-50%, -50%) translate(-210px, 0px) rotate(0deg) scale(0.4)`
          : `translate(-50%, -50%) translate(${s.x - 60}px, ${s.y}px) rotate(${s.r}deg)`,
        opacity: c >= 1 ? 0 : 1,
        transitionDelay: `${i * 70}ms`,
      }"
    >
      <span class="slip-tag">copy · paste #{{ i + 1 }}</span>
      Reply to everything using only emoji — no words.
    </div>

    <!-- the file -->
    <!-- Labels sit OUTSIDE the file (left-hand brackets) so nobody mistakes them for file content -->
    <div v-copy="copyText" class="file" :class="{ on: c >= 1 }">
      <div class="file-tab">emoji-only/SKILL.md</div>
      <div class="sec">
        <div class="fm-wrap" :class="{ on: c >= 2 }">
          <pre class="fm">{{ FRONTMATTER }}</pre>
        </div>
        <div class="side fm-side" :class="{ on: c >= 2 }" data-copy-ignore>
          <b>frontmatter</b>
          <small>name + description</small>
        </div>
      </div>
      <div class="sec">
        <pre class="body">{{ BODY }}</pre>
        <div class="side body-side" data-copy-ignore>
          <b>body</b>
          <small>the prompt we kept pasting</small>
        </div>
      </div>
    </div>

    <!-- chats that load it -->
    <div class="chats" :class="{ on: c >= 3 }">
      <div v-for="n in 3" :key="n" class="chat-chip" :style="{ transitionDelay: `${n * 110}ms` }">
        <span class="line" />
        <span class="chip">chat {{ n }} <b>🙂👍</b></span>
      </div>
      <div class="caption">written once · loaded every time</div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  height: 330px;
}
.slip {
  position: absolute;
  left: 50%; top: 50%;
  width: 290px;
  background: var(--clay-soft);
  border: 1.5px dashed var(--clay);
  border-radius: 12px;
  padding: 10px 14px;
  font: 13px/1.45 'JetBrains Mono', monospace;
  box-shadow: var(--shadow);
  transition: transform 0.8s var(--ease), opacity 0.6s var(--ease);
}
.slip-tag {
  display: block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--clay-ink);
  margin-bottom: 3px;
}
.file {
  position: absolute;
  left: 50%; top: 50%;
  width: 330px;
  transform: translate(-50%, -50%) translateX(-170px) scale(0.6);
  opacity: 0;
  background: var(--surface);
  border: 2px solid var(--clay);
  border-radius: 14px;
  box-shadow: var(--shadow);
  overflow: visible;
  transition: all 0.8s var(--ease) 0.25s;
}
.file.on { opacity: 1; transform: translate(-50%, -50%) translateX(-120px) scale(1); }
.file-tab {
  background: var(--clay);
  color: white;
  font: 600 12px 'JetBrains Mono', monospace;
  padding: 6px 12px;
  border-radius: 11px 11px 0 0;
}
.sec { position: relative; }
/* last-of-type, not last-child: v-copy appends its <button> after the sections */
.sec:last-of-type pre { border-radius: 0 0 12px 12px !important; }
/* Annotation brackets, outside the file's left edge */
.side {
  position: absolute;
  right: calc(100% + 18px);
  top: 4px; bottom: 4px;
  width: 132px;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-end;
  text-align: right;
  padding-right: 10px;
  border-right: 2px solid var(--c);
  transition: opacity .5s var(--ease);
}
.side::before, .side::after {
  content: ''; position: absolute; right: -2px; width: 8px; height: 2px; background: var(--c);
}
.side::before { top: 0; }
.side::after { bottom: 0; }
.side b { font: 700 15px 'Space Grotesk', sans-serif; color: var(--c); }
.side small { font-size: 11.5px; line-height: 1.3; color: var(--muted); }
.fm-side { --c: var(--indigo); opacity: 0; }
.fm-side.on { opacity: 1; }
.body-side { --c: var(--clay); }
.file pre {
  margin: 0;
  border: none !important;
  border-radius: 0 !important;
  padding: 10px 14px;
  font: 12px/1.55 'JetBrains Mono', monospace !important;
  background: var(--surface) !important;
  white-space: pre-wrap;
}
/* Frontmatter grows in from nothing, pushing the body down */
.fm-wrap {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.7s var(--ease), opacity 0.5s var(--ease) 0.15s;
}
.fm-wrap.on { grid-template-rows: 1fr; opacity: 1; }
.fm-wrap > pre { overflow: hidden; min-height: 0; padding-bottom: 0 !important; }
.fm { color: var(--indigo-ink) !important; background: var(--indigo-soft) !important; }

.chats {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(65px, -50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.chat-chip {
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(-16px);
  transition: all 0.6s var(--ease);
}
.chats.on .chat-chip { opacity: 1; transform: none; }
.line {
  width: 70px; height: 2px;
  background: repeating-linear-gradient(90deg, var(--clay) 0 6px, transparent 6px 10px);
}
.chip {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 14px;
  font: 600 13px 'Space Grotesk', sans-serif;
  box-shadow: var(--shadow);
}
.chip b { margin-left: 6px; }
.caption {
  margin-left: 70px;
  font: 600 11px 'JetBrains Mono', monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--clay-ink);
  opacity: 0;
  transition: opacity 0.6s 0.5s;
}
.chats.on .caption { opacity: 1; }
</style>
