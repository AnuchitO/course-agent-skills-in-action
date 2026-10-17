<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

interface Entry {
  name: string
  kind: 'required' | 'optional'
  depth?: number
  note?: string
  at?: number
  color?: 'clay' | 'teal' | 'indigo' | 'rose'
}

const props = withDefaults(defineProps<{
  folder: string
  entries: Entry[]
  folderNote?: string
}>(), { folderNote: 'the folder IS the skill' })

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))
const on = (at = 0) => c.value >= at
</script>

<template>
  <div class="wrap">
    <div class="tree">
      <div class="row folder on">
        <span class="ico">📁</span>
        <span class="fname">{{ folder }}/</span>
        <span class="note folder-note">← {{ folderNote }}</span>
      </div>
      <div
        v-for="e in entries"
        :key="e.name"
        class="row"
        :class="[e.kind, e.color ?? (e.kind === 'required' ? 'clay' : 'teal'), { on: on(e.at) }]"
        :style="{ paddingLeft: `${(e.depth ?? 1) * 28}px` }"
      >
        <span class="branch">└─</span>
        <span class="pill">
          <span class="ico">{{ e.name.endsWith('/') ? '📂' : '📄' }}</span>
          {{ e.name }}
        </span>
        <span class="badge">{{ e.kind }}</span>
        <span v-if="e.note" class="note">{{ e.note }}</span>
      </div>
    </div>
    <div class="legend" :class="{ on: c >= 1 }">
      <span><i class="solid" /> solid = required</span>
      <span><i class="dashed" /> dashed = optional</span>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 22px 26px 16px;
}
.tree { display: flex; flex-direction: column; gap: 12px; }
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateX(-12px);
  transition: all 0.55s var(--ease);
}
.row.on { opacity: 1; transform: none; }
.folder .fname {
  font: 700 20px 'JetBrains Mono', monospace;
  color: var(--ink);
}
.folder .ico { font-size: 22px; }
.branch { font-family: 'JetBrains Mono', monospace; color: var(--line); font-size: 18px; }
.pill {
  --c: var(--clay); --s: var(--clay-soft);
  display: inline-flex; align-items: center; gap: 6px;
  font: 600 14.5px 'JetBrains Mono', monospace;
  padding: 7px 14px;
  border-radius: 10px;
  background: var(--s);
  border: 2.5px solid var(--c);
  min-width: 168px;
  flex: none;
}
.optional .pill { border-style: dashed; border-width: 2px; }
.teal .pill { --c: var(--teal); --s: var(--teal-soft); }
.indigo .pill { --c: var(--indigo); --s: var(--indigo-soft); }
.rose .pill { --c: var(--rose); --s: var(--rose-soft); }
.badge {
  flex: none;
  font: 700 9.5px 'JetBrains Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 6px;
  background: var(--paper-2);
  color: var(--muted);
}
.required .badge { background: var(--clay); color: white; }
.note {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  line-height: 1.3;
  color: var(--muted);
}
.folder-note { font-style: italic; }
.legend {
  display: flex; gap: 22px;
  margin-top: 16px; padding-top: 10px;
  border-top: 1px solid var(--line);
  font-size: 12px; color: var(--muted);
  opacity: 0; transition: opacity 0.5s;
}
.legend.on { opacity: 1; }
.legend i {
  display: inline-block; width: 22px; height: 12px;
  border-radius: 4px; vertical-align: middle; margin-right: 6px;
  border: 2.5px solid var(--clay);
}
.legend i.dashed { border: 2px dashed var(--teal); }
</style>
