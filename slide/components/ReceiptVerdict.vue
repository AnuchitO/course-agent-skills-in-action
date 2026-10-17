<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// 1 plain answer · 2 skill verdict · 3 wine flag · 4 receipt flag · 5 total
// Hover the receipt to copy it as a ready-to-paste claim (no receipt image needed)
const RECEIPT_PROMPT = `Will this be reimbursed?
Client dinner, 2 people, 12 Oct
- Food: 1,600 baht
- Wine x 2: 400 baht
Total: 2,000 baht
No receipt attached.`

const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))
</script>

<template>
  <div class="rv">
    <!-- receipt -->
    <div v-copy="RECEIPT_PROMPT" class="receipt">
      <div class="r-head">
        <b>Client dinner</b>
        <span>2 people · 12 Oct</span>
      </div>
      <div class="r-line"><span>Food</span><span>1,600</span></div>
      <div class="r-line" :class="{ struck: c >= 3 }">
        <span>Wine × 2 <em v-if="c >= 3">rule 2</em></span><span>400</span>
      </div>
      <div class="r-total"><span>Total</span><span>2,000 ฿</span></div>
      <div class="r-stamp" :class="{ flag: c >= 4 }">
        no receipt attached <em v-if="c >= 4">rule 3</em>
      </div>
    </div>

    <div class="answers">
      <!-- plain LLM -->
      <div class="ans plain" :class="{ on: c >= 1 }">
        <div class="ans-head"><span class="tag">Plain LLM</span> no skill</div>
        <p>“A 2,000-baht client dinner sounds reasonable. Most companies reimburse business meals — you should be fine!”</p>
        <div class="verdict-note">😬 It guessed. It has never seen your policy.</div>
      </div>

      <!-- with skill -->
      <div class="ans skill" :class="{ on: c >= 2 }">
        <div class="ans-head"><span class="tag">expense-check</span> skill loaded</div>
        <div class="verdict">⚠️ Needs fixing</div>
        <ul>
          <li :class="{ on: c >= 3 }">Wine isn't reimbursable <b>(rule 2)</b></li>
          <li :class="{ on: c >= 4 }">Over 1,000 baht needs a receipt <b>(rule 3)</b></li>
          <li class="ok" :class="{ on: c >= 3 }">Food 1,600 for 2 = 800/person ✓ <b>(rule 1)</b></li>
        </ul>
        <div class="total" :class="{ on: c >= 5 }">Reimbursable total: <b>1,600 ฿</b> <small>once a receipt is attached</small></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rv {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 34px;
  align-items: start;
}
.receipt {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 16px 18px 20px;
  font: 13px/1.6 'JetBrains Mono', monospace;
  box-shadow: var(--shadow);
  transform: rotate(-1.5deg);
  position: relative;
  mask: radial-gradient(circle 6px at 50% 100%, transparent 98%, #000) repeat-x bottom / 16px 100%;
}
.r-head { border-bottom: 1.5px dashed var(--line); padding-bottom: 8px; margin-bottom: 8px; }
.r-head b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 16px; }
.r-head span { color: var(--muted); font-size: 11px; }
.r-line, .r-total { display: flex; justify-content: space-between; position: relative; }
.r-line em, .r-stamp em {
  display: inline-block; vertical-align: 1px; margin-left: 4px; text-decoration: none;
  font: 700 9.5px 'JetBrains Mono', monospace; font-style: normal;
  background: var(--rose); color: white; padding: 2px 6px; border-radius: 6px;
}
.r-line.struck > span { text-decoration: line-through; text-decoration-color: var(--rose); text-decoration-thickness: 2px; color: var(--rose-ink); }
.r-total { border-top: 1.5px dashed var(--line); margin-top: 8px; padding-top: 8px; font-weight: 700; }
.r-stamp {
  position: relative;
  margin-top: 12px;
  text-align: center;
  font-size: 11px;
  color: var(--muted);
  border: 1.5px solid var(--line);
  border-radius: 6px;
  padding: 4px;
  transition: all 0.4s;
}
.r-stamp.flag { border-color: var(--rose); color: var(--rose-ink); background: var(--rose-soft); }

.answers { display: flex; flex-direction: column; gap: 14px; }
.ans {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 10px 16px 12px;
  box-shadow: var(--shadow);
  opacity: 0; transform: translateX(18px);
  transition: all 0.55s var(--ease);
}
.ans.on { opacity: 1; transform: none; }
.ans-head { font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.tag {
  font: 700 10px 'JetBrains Mono', monospace;
  padding: 2px 8px; border-radius: 999px; margin-right: 6px;
}
.plain { border-left: 4px solid var(--rose); }
.plain .tag { background: var(--rose-soft); color: var(--rose-ink); }
.plain p { margin: 0; font-size: 13.5px; font-style: italic; }
.verdict-note { margin-top: 6px; font-size: 12px; color: var(--rose-ink); font-weight: 600; }
.skill { border-left: 4px solid var(--teal); }
.skill .tag { background: var(--teal); color: white; }
.verdict { font: 700 18px 'Space Grotesk', sans-serif; color: var(--amber-ink); margin-bottom: 4px; }
.skill ul { margin: 0; padding-left: 0; list-style: none; }
.skill li {
  font-size: 13px;
  padding: 2px 0 2px 18px;
  position: relative;
  opacity: 0; transform: translateX(8px);
  transition: all 0.45s var(--ease);
}
.skill li.on { opacity: 1; transform: none; }
.skill li::before { content: '✕'; position: absolute; left: 0; color: var(--rose); font-weight: 700; }
.skill li.ok::before { content: '✓'; color: var(--green); }
.skill li b { color: var(--muted); font-weight: 600; font-size: 11.5px; }
.total {
  margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--line);
  font-size: 14px;
  opacity: 0; transition: opacity 0.5s;
}
.total.on { opacity: 1; }
.total b { color: var(--teal-ink); font-size: 17px; }
.total small { color: var(--muted); margin-left: 6px; }
</style>
