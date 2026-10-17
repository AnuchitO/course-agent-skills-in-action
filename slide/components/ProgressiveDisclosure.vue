<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// 1 level 1 · 2 request + match · 3 level 2 · 4 level 3 · 5 context meter
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

const skills = [
  { name: 'emoji-only', desc: 'Reply using only emoji…', match: true },
  { name: 'expense-check', desc: 'Check an expense claim…' },
  { name: 'delivery-fee', desc: 'Quote our delivery fee…' },
  { name: 'brand-slides', desc: 'Make decks in our brand…' },
]
</script>

<template>
  <div class="pd">
    <!-- request banner -->
    <div class="req" :class="{ on: c >= 2 }">
      <span class="who">User</span>
      “Emoji mode: how was your weekend?”
    </div>

    <div class="levels">
      <!-- Level 1 -->
      <div class="lvl l1" :class="{ on: c >= 1 }">
        <div class="lvl-head"><span class="n">1</span> Always loaded</div>
        <div class="lvl-sub">name + description of <b>every</b> skill</div>
        <div
          v-for="s in skills"
          :key="s.name"
          class="mini"
          :class="{ match: s.match && c >= 2, fade: !s.match && c >= 2 }"
        >
          <b>{{ s.name }}</b> <span>{{ s.desc }}</span>
        </div>
        <div class="cost">≈ 100 tokens each</div>
      </div>

      <div class="arrow" :class="{ on: c >= 3 }">
        <span>match!</span>
        <svg viewBox="0 0 60 20"><path d="M2 10 H52 M44 3 L54 10 L44 17" /></svg>
      </div>

      <!-- Level 2 -->
      <div class="lvl l2" :class="{ on: c >= 3 }">
        <div class="lvl-head"><span class="n">2</span> Loaded on match</div>
        <div class="lvl-sub">the full SKILL.md <b>body</b></div>
        <div class="doc">
          <div class="doc-tab">emoji-only/SKILL.md</div>
          <div class="doc-text">Reply to everything using only emoji — no words, no letters, no numbers.</div>
        </div>
        <div class="cost">keep it under ~500 lines</div>
      </div>

      <div class="arrow" :class="{ on: c >= 4 }">
        <span>if needed</span>
        <svg viewBox="0 0 60 20"><path d="M2 10 H52 M44 3 L54 10 L44 17" /></svg>
      </div>

      <!-- Level 3 -->
      <div class="lvl l3" :class="{ on: c >= 4 }">
        <div class="lvl-head"><span class="n">3</span> Only if the body asks</div>
        <div class="lvl-sub">extra files &amp; scripts</div>
        <div class="extra"><span>📂 references/</span> read when needed</div>
        <div class="extra"><span>⚙️ scripts/</span> <b>run</b> — only the output comes back</div>
        <div class="none">emoji-only has none → nothing more loaded</div>
      </div>
    </div>

    <!-- context meter -->
    <div class="meter" :class="{ on: c >= 5 }">
      <span class="meter-label">Claude's context</span>
      <div class="bar">
        <div class="seg s1" :style="{ width: c >= 5 ? '8%' : '0%' }">L1</div>
        <div class="seg s2" :style="{ width: c >= 5 ? '6%' : '0%' }">L2</div>
        <div class="seg free" :style="{ width: c >= 5 ? '86%' : '100%' }">free for your actual work</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pd { display: flex; flex-direction: column; gap: 12px; }
.req {
  align-self: flex-start;
  background: var(--amber-soft);
  border: 1.5px solid var(--amber);
  border-radius: 12px;
  padding: 6px 14px;
  font-size: 14px;
  opacity: 0; transform: translateY(-8px);
  transition: all 0.5s var(--ease);
}
.req.on { opacity: 1; transform: none; }
.who {
  font: 700 9.5px 'JetBrains Mono', monospace;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--amber-ink); margin-right: 8px;
}
.levels {
  display: grid;
  grid-template-columns: 1.15fr 54px 1fr 54px 1fr;
  align-items: stretch;
}
.lvl {
  --c: var(--indigo); --s: var(--indigo-soft); --k: var(--indigo-ink);
  background: var(--surface);
  border: 1px solid var(--line);
  border-top: 5px solid var(--c);
  border-radius: 14px;
  padding: 10px 12px 12px;
  box-shadow: var(--shadow);
  display: flex; flex-direction: column; gap: 6px;
  opacity: 0; transform: translateY(14px);
  transition: all 0.55s var(--ease);
}
.lvl.on { opacity: 1; transform: none; }
.l2 { --c: var(--teal); --s: var(--teal-soft); --k: var(--teal-ink); }
.l3 { --c: var(--clay); --s: var(--clay-soft); --k: var(--clay-ink); }
.lvl-head { font: 700 15px 'Space Grotesk', sans-serif; display: flex; align-items: center; gap: 8px; }
.n {
  width: 22px; height: 22px; border-radius: 7px;
  background: var(--c); color: white;
  display: grid; place-items: center; font-size: 12px;
}
.lvl-sub { font-size: 11.5px; color: var(--muted); margin-bottom: 2px; }
.mini {
  font-size: 11px;
  padding: 5px 8px;
  border-radius: 8px;
  background: var(--s);
  border: 1.5px solid transparent;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: all 0.4s var(--ease);
}
.mini b { font-family: 'JetBrains Mono', monospace; color: var(--k); }
.mini span { color: var(--muted); }
.mini.match { border-color: var(--amber); background: var(--highlight-soft); box-shadow: 0 0 0 3px rgba(227,161,51,.18); }
.mini.fade { opacity: 0.45; }
.cost {
  margin-top: auto;
  font: 600 10px 'JetBrains Mono', monospace;
  color: var(--k);
}
.doc {
  border: 1.5px solid var(--teal);
  border-radius: 10px;
  overflow: hidden;
  font: 11.5px/1.5 'JetBrains Mono', monospace;
  background: var(--surface);
  padding-bottom: 8px;
}
.doc-tab { background: var(--teal); color: white; padding: 3px 8px; margin-bottom: 6px; font-size: 10.5px; }
.doc-text { padding: 0 10px; }
.extra {
  font-size: 11.5px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1.5px dashed var(--clay);
  background: var(--s);
}
.extra span { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--k); margin-right: 4px; }
.none { font-size: 10.5px; color: var(--muted); font-style: italic; margin-top: auto; }
.arrow {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.5s;
}
.arrow.on { opacity: 1; }
.arrow span { font: 700 9.5px 'JetBrains Mono', monospace; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
.arrow svg { width: 44px; }
.arrow path { fill: none; stroke: var(--ink); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }

.meter {
  display: flex; align-items: center; gap: 12px;
  opacity: 0; transition: opacity 0.5s;
}
.meter.on { opacity: 1; }
.meter-label { font: 700 11px 'JetBrains Mono', monospace; color: var(--muted); white-space: nowrap; }
.bar {
  flex: 1; height: 26px; display: flex;
  border-radius: 8px; overflow: hidden;
  border: 1px solid var(--line); background: var(--surface);
}
.seg {
  display: grid; place-items: center;
  font: 700 10px 'JetBrains Mono', monospace;
  color: white; white-space: nowrap; overflow: hidden;
  transition: width 1s var(--ease);
}
.s1 { background: var(--indigo); }
.s2 { background: var(--teal); }
.free { background: var(--green-soft); color: var(--green-ink); }
</style>
