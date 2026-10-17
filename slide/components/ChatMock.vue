<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * A fake chat window whose messages appear one click at a time.
 * Message types:
 *   user   – what the person types (paste: true marks a copy-pasted instruction)
 *   ai     – Claude's reply
 *   divider – a "new chat" break
 * Add copy: true to a message to give it a hover copy button.
 */
interface Msg {
  role: 'user' | 'ai' | 'divider'
  text: string
  at?: number
  paste?: boolean
  big?: boolean
  bad?: boolean
  /** true = copy button copies `text`; a string = copy that instead */
  copy?: boolean | string
}

const props = withDefaults(defineProps<{
  messages: Msg[]
  title?: string
  height?: string
}>(), { title: 'New chat', height: '360px' })

const { $clicks } = useSlideContext()
const clicks = computed(() => Number($clicks.value ?? 0))
const shown = (m: Msg) => clicks.value >= (m.at ?? 0)
</script>

<template>
  <div class="chat" :style="{ height }">
    <div class="bar">
      <span class="dot" style="background:#ef8f7b" />
      <span class="dot" style="background:#f0c36b" />
      <span class="dot" style="background:#7cc38c" />
      <span class="title">{{ title }}</span>
    </div>
    <div class="body">
      <template v-for="(m, i) in props.messages" :key="i">
        <div v-if="m.role === 'divider'" class="divider" :class="{ on: shown(m) }">
          <span>{{ m.text }}</span>
        </div>
        <div
          v-else
          class="row"
          :class="[m.role, { on: shown(m) }]"
        >
          <div v-if="m.role === 'ai'" class="avatar">C</div>
          <div
            v-copy="m.copy ? (m.copy === true ? m.text : m.copy) : false"
            class="bubble"
            :class="{ paste: m.paste, big: m.big, bad: m.bad }"
          >
            <div v-if="m.paste" class="paste-tag">pasted again</div>
            {{ m.text }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.chat {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--paper-2);
  border-bottom: 1px solid var(--line);
}
.dot { width: 10px; height: 10px; border-radius: 50%; }
.title {
  margin-left: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--muted);
}
.body {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  overflow: hidden;
}
.row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-height: 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s var(--ease);
}
.row.on { max-height: 140px; opacity: 1; transform: none; }
.row.user { justify-content: flex-end; }
.avatar {
  width: 24px; height: 24px; flex: none;
  border-radius: 8px;
  background: var(--clay);
  color: white;
  font: 700 12px 'Space Grotesk', sans-serif;
  display: grid; place-items: center;
}
.bubble {
  max-width: 78%;
  padding: 7px 11px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.45;
}
.user .bubble {
  background: var(--amber-soft);
  color: var(--ink);
  border-bottom-right-radius: 4px;
}
.ai .bubble {
  background: var(--paper-2);
  border-bottom-left-radius: 4px;
}
.bubble.big { font-size: 26px; letter-spacing: 4px; padding: 4px 12px; }
.bubble.bad { background: var(--rose-soft); color: var(--rose-ink); }
.bubble.paste {
  background: var(--clay-soft);
  border: 1.5px dashed var(--clay);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px;
}
.paste-tag {
  font: 700 9px 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--clay-ink);
  margin-bottom: 2px;
}
.divider {
  display: flex; align-items: center; gap: 8px;
  max-height: 0; opacity: 0;
  transition: all 0.5s var(--ease);
  font: 600 10px 'JetBrains Mono', monospace;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--muted);
}
.divider.on { max-height: 30px; opacity: 1; margin: 4px 0; }
.divider::before, .divider::after {
  content: ''; flex: 1; height: 1px; background: var(--line);
}
</style>
