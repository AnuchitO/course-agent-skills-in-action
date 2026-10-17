<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(defineProps<{ start?: number; highlight?: number[] }>(), {
  start: 1,
  highlight: () => [],
})

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const gaps = [
  {
    icon: '🔒', title: 'Private knowledge', color: 'clay',
    without: 'Never saw your prices or policies — so it makes them up.',
    with: 'Your rules, written down, handed over.',
  },
  {
    icon: '🎯', title: 'Consistency', color: 'indigo',
    without: 'Same question, different answer each time.',
    with: 'Fixed format and rules, every run.',
  },
  {
    icon: '🧠', title: 'Memory across chats', color: 'amber',
    without: 'Every new chat starts blank. You re-explain.',
    with: 'Written once, loads itself when relevant.',
  },
  {
    icon: '📋', title: 'Reliable procedure', color: 'teal',
    without: 'Long tasks drift; steps get skipped.',
    with: 'A checklist it follows in order.',
  },
  {
    icon: '⚙️', title: 'Running real code', color: 'rose',
    without: 'Does math "in its head" — close, not exact.',
    with: 'Runs a script; returns the true result.',
  },
]
</script>

<template>
  <div class="grid">
    <div
      v-for="(g, i) in gaps"
      :key="g.title"
      class="gap"
      :class="[g.color, { on: c >= props.start + i, dim: props.highlight.length && !props.highlight.includes(i + 1) }]"
    >
      <div class="head">
        <span class="num">{{ i + 1 }}</span>
        <span class="icon">{{ g.icon }}</span>
      </div>
      <div class="title">{{ g.title }}</div>
      <div class="without"><b>Plain LLM</b>{{ g.without }}</div>
      <div class="with"><b>With a skill</b>{{ g.with }}</div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}
.gap {
  --c: var(--clay); --s: var(--clay-soft); --k: var(--clay-ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 5px solid var(--c);
  border-radius: 14px;
  padding: 12px 12px 14px;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateY(18px) scale(0.97);
  transition: all 0.55s var(--ease);
}
.gap.on { opacity: 1; transform: none; }
.gap.on.dim { opacity: 0.35; }
.gap.indigo { --c: var(--indigo); --s: var(--indigo-soft); --k: var(--indigo-ink); }
.gap.amber { --c: var(--amber); --s: var(--amber-soft); --k: var(--amber-ink); }
.gap.teal { --c: var(--teal); --s: var(--teal-soft); --k: var(--teal-ink); }
.gap.rose { --c: var(--rose); --s: var(--rose-soft); --k: var(--rose-ink); }
.head { display: flex; justify-content: space-between; align-items: center; }
.num {
  font: 700 30px/1 'Space Grotesk', sans-serif;
  color: var(--c);
}
.icon {
  width: 34px; height: 34px;
  border-radius: 10px;
  background: var(--s);
  display: grid; place-items: center;
  font-size: 18px;
}
.title {
  font: 700 15px/1.2 'Space Grotesk', sans-serif;
  margin: 8px 0 10px;
  min-height: 36px;
}
.without, .with {
  font-size: 11.5px;
  line-height: 1.4;
  padding: 7px 8px;
  border-radius: 8px;
}
.without { background: var(--paper-2); color: var(--muted); margin-bottom: 6px; }
.with { background: var(--s); color: var(--ink); }
.without b, .with b {
  display: block;
  font: 700 9px 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.with b { color: var(--k); }
</style>
