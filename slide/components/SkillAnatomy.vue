<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// 1 frontmatter · 2 name · 3 description · 4 body · 5 load-time tags
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))
</script>

<template>
  <div class="anatomy">
    <div class="file">
      <div class="tab">expense-check/SKILL.md</div>

      <div class="zone fm" :class="{ lit: c >= 1, dim: c >= 4 && c < 5 }">
        <span class="zone-label">YAML frontmatter</span>
        <div class="code">
          <div>---</div>
          <div class="ln" :class="{ mark: c === 2 }"><span class="k">name:</span> expense-check</div>
          <div class="ln" :class="{ mark: c === 3 }"><span class="k">description:</span> Check an expense claim
            against our policy… Use when someone pastes a receipt.</div>
          <div>---</div>
        </div>
        <span class="load-tag a" :class="{ on: c >= 5 }">always loaded</span>
      </div>

      <div class="zone bd" :class="{ lit: c >= 4, dim: c >= 1 && c < 4 }">
        <span class="zone-label">Markdown body</span>
        <div class="code">
          <div class="h"># Expense Policy Checker</div>
          <div class="h">## Our rules</div>
          <div>1. Meals: max 800 baht per person.</div>
          <div>2. No alcohol — never reimbursable.</div>
          <div class="h">## How to reply</div>
          <div>Verdict · Flags · Reimbursable total</div>
        </div>
        <span class="load-tag b" :class="{ on: c >= 5 }">loaded only on match</span>
      </div>
    </div>

    <div class="notes">
      <div class="note indigo" :class="{ on: c >= 1 }">
        <b>Between the <code>---</code> lines</b>
        A tiny header of key: value pairs. This is the skill's ID card.
      </div>
      <div class="note indigo" :class="{ on: c >= 2 }">
        <b>name</b>
        lowercase-with-hyphens · matches the folder name.
      </div>
      <div class="note indigo" :class="{ on: c >= 3 }">
        <b>description — the most important line</b>
        <span><u>WHAT</u> it does + <u>WHEN</u> to use it. Claude decides from this alone.</span>
      </div>
      <div class="note teal" :class="{ on: c >= 4 }">
        <b>body</b>
        Plain Markdown: rules, steps, output format, examples, links to other files.
      </div>
    </div>
  </div>
</template>

<style scoped>
.anatomy {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 26px;
  align-items: start;
}
.file {
  background: var(--surface);
  border: 2px solid var(--ink);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.tab {
  background: var(--terminal);
  color: white;
  font: 600 12px 'JetBrains Mono', monospace;
  padding: 7px 14px;
}
.zone {
  position: relative;
  margin: 10px;
  border-radius: 12px;
  padding: 22px 14px 12px;
  border: 2px solid transparent;
  transition: all 0.5s var(--ease);
}
.fm { background: var(--indigo-soft); }
.bd { background: var(--teal-soft); }
.fm.lit { border-color: var(--indigo); }
.bd.lit { border-color: var(--teal); }
.zone.dim { opacity: 0.35; filter: saturate(0.4); }
.zone-label {
  position: absolute; top: 6px; left: 14px;
  font: 700 9.5px 'JetBrains Mono', monospace;
  letter-spacing: 0.14em; text-transform: uppercase;
}
.fm .zone-label { color: var(--indigo-ink); }
.bd .zone-label { color: var(--teal-ink); }
.code {
  font: 12.5px/1.6 'JetBrains Mono', monospace;
  color: var(--ink);
}
.k { color: var(--indigo-ink); font-weight: 700; }
.h { color: var(--teal-ink); font-weight: 700; }
.ln { border-radius: 6px; padding: 0 4px; margin: 0 -4px; transition: background 0.3s; }
.ln.mark { background: var(--highlight); box-shadow: 0 0 0 2px var(--amber); }
.load-tag {
  position: absolute; right: 10px; top: 6px;
  font: 700 10px 'JetBrains Mono', monospace;
  padding: 3px 8px; border-radius: 999px;
  color: white;
  opacity: 0; transform: scale(0.8);
  transition: all 0.45s var(--ease);
}
.load-tag.on { opacity: 1; transform: none; }
.load-tag.a { background: var(--indigo); }
.load-tag.b { background: var(--teal); }

.notes { display: flex; flex-direction: column; gap: 12px; padding-top: 30px; }
.note {
  --c: var(--indigo);
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 4px solid var(--c);
  border-radius: 0 12px 12px 0;
  padding: 9px 13px;
  font-size: 13px;
  line-height: 1.45;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateX(14px);
  transition: all 0.5s var(--ease);
}
.note.on { opacity: 1; transform: none; }
.note.teal { --c: var(--teal); }
.note b {
  display: block;
  font: 700 13.5px 'Space Grotesk', sans-serif;
  margin-bottom: 2px;
}
</style>
