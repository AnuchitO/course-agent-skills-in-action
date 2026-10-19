<script setup lang="ts">
/**
 * Lab test kit: one card per test. The input is shown in full and copies
 * with one click (hover → copy button); the expected result sits underneath
 * so participants can check Claude's answer themselves.
 *
 *   <TestKit :cols="4" receipt :tests="[
 *     { input: 'Can I claim this? …', expect: '✅ OK to submit', tone: 'ok' },
 *   ]" />
 */
interface Test { input: string, expect: string, tone?: 'ok' | 'warn' | 'bad' | 'info', note?: string }
withDefaults(defineProps<{ tests: Test[], cols?: number, receipt?: boolean }>(), { cols: 4, receipt: false })
</script>

<template>
  <div class="tk" :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }">
    <div v-for="(t, i) in tests" :key="i" class="test">
      <div class="head">
        <span class="n">{{ i + 1 }}</span>
        <span class="lbl">Test {{ i + 1 }}</span>
        <span v-if="t.note" class="note">{{ t.note }}</span>
      </div>
      <pre v-copy="t.input" class="input" :class="{ receipt }">{{ t.input }}</pre>
      <div class="expect" :class="t.tone ?? 'info'">
        <div class="lbl">Expected</div>
        <div class="txt">{{ t.expect }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tk { display: grid; gap: 12px; align-items: stretch; }
.test {
  display: flex; flex-direction: column; gap: 8px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 11px 11px;
  box-shadow: var(--shadow);
  min-width: 0;
}
.head { display: flex; align-items: center; gap: 7px; }
.n {
  display: inline-grid; place-items: center;
  width: 20px; height: 20px; border-radius: 6px;
  background: var(--amber); color: white;
  font: 700 11px 'Space Grotesk', sans-serif;
}
.lbl {
  font: 700 9.5px 'JetBrains Mono', monospace;
  letter-spacing: .12em; text-transform: uppercase; color: var(--muted);
}
.note { margin-left: auto; font-size: 10.5px; color: var(--muted); }

.input {
  flex: 1;
  margin: 0;
  font: 11.5px/1.5 'JetBrains Mono', monospace;
  white-space: pre-wrap; word-break: break-word;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-radius: 9px;
  padding: 8px 10px;
  color: var(--ink);
}
/* Receipt look for Lab 1: dashed paper edge */
.input.receipt {
  background: var(--paper);
  border: 1.5px dashed var(--line);
}

.expect {
  --c: var(--indigo);
  border-left: 4px solid var(--c);
  border-radius: 0 8px 8px 0;
  background: color-mix(in srgb, var(--c) 9%, transparent);
  padding: 5px 9px 6px;
}
.expect.ok { --c: var(--green); }
.expect.warn { --c: var(--amber); }
.expect.bad { --c: var(--rose); }
.expect .lbl { color: var(--c); }
.expect .txt { font-size: 12px; line-height: 1.4; color: var(--ink); margin-top: 1px; }
</style>
