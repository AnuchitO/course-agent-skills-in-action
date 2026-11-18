<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// click 0: six skill files, all named SKILL.md — impossible to tell apart
// click 1: "which one is which?"
// click 2: each file's frontmatter appears — name + description tell them apart
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const files = [
  { name: 'emoji-only', desc: 'Reply using only emoji. Use for “emoji mode”.', tone: 'clay' },
  { name: 'expense-check', desc: 'Check a receipt against company policy.', tone: 'teal' },
  { name: 'delivery-fee', desc: 'Calculate delivery fee from km, total and day.', tone: 'indigo' },
  { name: 'git-commit', desc: 'Write a clean, atomic commit message.', tone: 'amber' },
  { name: 'pdf-reader', desc: 'Extract text and tables from PDF files.', tone: 'rose' },
  { name: 'brand-voice', desc: 'Rewrite copy in our brand tone of voice.', tone: 'green' },
]
</script>

<template>
  <div class="wrap">
    <div class="grid">
      <div v-for="(f, i) in files" :key="f.name" class="card" :style="{ '--t': `var(--${f.tone})`, '--ts': `var(--${f.tone}-soft)`, transitionDelay: `${i * 60}ms` }">
        <div class="tab">SKILL.md</div>
        <div class="fm" :class="{ on: c >= 2 }">
          <div class="fm-inner">
            <div><span class="k">name:</span> {{ f.name }}</div>
            <div><span class="k">description:</span> {{ f.desc }}</div>
          </div>
        </div>
        <div class="body">
          <span class="ln" style="width: 92%" />
          <span class="ln" style="width: 74%" />
          <span class="ln" style="width: 86%" />
        </div>
      </div>
    </div>
    <div class="ask" :class="{ on: c >= 1 && c < 2 }">❓ Same file name. Which one is which?</div>
  </div>
</template>

<style scoped>
.wrap { position: relative; margin-top: 8px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.card {
  background: var(--surface);
  border: 2px solid var(--neutral-bar);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: border-color 0.6s var(--ease);
}
.tab {
  background: var(--neutral-bar);
  color: white;
  font: 600 12px 'JetBrains Mono', monospace;
  padding: 5px 12px;
  transition: background 0.6s var(--ease);
}
.card:has(.fm.on) { border-color: var(--t); }
.card:has(.fm.on) .tab { background: var(--t); }
.fm {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  background: var(--ts);
  transition: grid-template-rows 0.7s var(--ease), opacity 0.5s var(--ease) 0.15s;
}
.fm.on { grid-template-rows: 1fr; opacity: 1; }
.fm-inner {
  overflow: hidden; min-height: 0;
  font: 11px/1.45 'JetBrains Mono', monospace;
  padding: 0 12px;
  color: var(--ink);
}
.fm.on .fm-inner { padding: 8px 12px; }
.k { color: var(--t); font-weight: 700; }
.body { padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 7px; }
.ln { display: block; height: 7px; border-radius: 4px; background: var(--line); }
.ask {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0; pointer-events: none;
  background: var(--ink); color: var(--paper);
  font: 700 20px 'Space Grotesk', sans-serif;
  padding: 12px 22px; border-radius: 999px;
  box-shadow: var(--shadow);
  transition: all 0.5s var(--ease);
}
.ask.on { opacity: 1; transform: translate(-50%, -50%) scale(1); }
</style>
