<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Agent on the LEFT, model on the RIGHT (same layout as RequestFlow)
// 1 guessing in its head · 2 model asks to run · 3 script runs outside
// 4 only output comes back · 5 same answer every time
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))
</script>

<template>
  <div class="sb">
    <!-- sandbox -->
    <div class="side box" :class="{ live: c >= 3 }">
      <div class="side-head">Agent / harness · runs it outside the model</div>
      <div class="code">
        <div class="code-tab">scripts/calc_fee.py <span class="lock">🔒 code never enters context</span></div>
<pre>if day == "sunday":
    print("NO_DELIVERY")
elif order &gt; 500:
    print("fee=0 baht")
else:
    fee = ceil(40 + max(0, km - 3) * 7)
    print(f"fee={fee} baht")</pre>
      </div>
      <div class="run" :class="{ on: c >= 3 }">
        <span class="dot" /> $ python3 calc_fee.py … → <b>fee=107 baht</b>
      </div>
    </div>
    <!-- boundary -->
    <div class="wall">
      <div class="pkt req" :class="{ on: c >= 2 }">◀ run</div>
      <div class="pkt res" :class="{ on: c >= 4 }">output only ▶</div>
    </div>

    <!-- model context -->
    <div class="side model">
      <div class="side-head">Model (Claude) · context</div>
      <div class="msg user">“300 ฿ order, 12.5 km, Tuesday — delivery fee?”</div>

      <div class="guess" :class="{ on: c >= 1, gone: c >= 2 }">
        <div class="guess-title">doing math in its head…</div>
        <span>≈ 106 ฿?</span><span>≈ 107 ฿?</span><span>≈ 110 ฿?</span>
      </div>

      <div class="msg call" :class="{ on: c >= 2 }">
        <b>asks agent to run</b>
        <code>calc_fee.py --km 12.5 --order 300 --day Tue</code>
      </div>

      <div class="msg out" :class="{ on: c >= 4 }">
        <b>result</b><code>fee=107 baht</code>
      </div>

      <div class="msg ai" :class="{ on: c >= 5 }">
        Delivery fee: <b>107 baht</b> · arrives in 2–3 days
        <span class="again">ask again → 107 ✓ · again → 107 ✓</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.sb {
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: stretch;
  min-height: 330px;
}
.side {
  border-radius: 16px;
  padding: 12px 14px;
  display: flex; flex-direction: column; gap: 9px;
}
.model { background: var(--indigo-soft); }
.box { background: var(--teal-soft); transition: box-shadow 0.4s; }
.box.live { box-shadow: 0 0 0 3px var(--teal); }
.side-head { font: 700 14px 'Space Grotesk', sans-serif; }
.model .side-head { color: var(--indigo-ink); }
.box .side-head { color: var(--teal-ink); }
.msg {
  background: var(--surface);
  border-radius: 11px;
  padding: 7px 11px;
  font-size: 12.5px;
  box-shadow: var(--shadow);
}
.msg.user { background: var(--amber-soft); align-self: flex-end; }
.msg.call, .msg.out, .msg.ai {
  opacity: 0; transform: translateY(8px);
  transition: all 0.5s var(--ease);
}
.msg.on { opacity: 1; transform: none; }
.msg b {
  display: block;
  font: 700 9.5px 'JetBrains Mono', monospace;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--indigo-ink);
}
.msg.ai b { display: inline; font: inherit; font-weight: 700; letter-spacing: 0; text-transform: none; color: var(--teal-ink); }
.msg code { font-size: 11.5px; background: none !important; border: none !important; padding: 0 !important; color: var(--ink) !important; }
.msg.out { border: 2px solid var(--teal); }
.msg.out b { color: var(--teal-ink); }
.again { display: block; margin-top: 3px; font: 600 10.5px 'JetBrains Mono', monospace; color: var(--green); }
.guess {
  display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
  border: 1.5px dashed var(--rose);
  background: var(--rose-soft);
  border-radius: 11px;
  padding: 6px 10px;
  max-height: 0; opacity: 0; overflow: hidden;
  transition: all 0.5s var(--ease);
}
.guess.on { max-height: 80px; opacity: 1; }
.guess.gone { max-height: 0; opacity: 0; padding: 0 10px; border-width: 0; }
.guess-title { width: 100%; font: 700 9.5px 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .1em; color: var(--rose-ink); }
.guess span { font: 600 13px 'JetBrains Mono', monospace; color: var(--rose-ink); }
.guess span:nth-child(3) { transform: rotate(-3deg); }
.guess span:nth-child(4) { transform: rotate(4deg); }

.wall {
  position: relative;
  display: flex; flex-direction: column; justify-content: center; gap: 60px;
  align-items: center;
}
.wall::before {
  content: ''; position: absolute; top: 8px; bottom: 8px; left: 50%;
  border-left: 2px dashed var(--line);
}
.pkt {
  position: relative; z-index: 1;
  font: 700 10.5px 'JetBrains Mono', monospace;
  padding: 5px 9px; border-radius: 999px;
  color: white; white-space: nowrap;
  opacity: 0;
  transition: all 0.8s var(--ease);
}
.pkt.req { background: var(--indigo); transform: translateX(40px); }
.pkt.req.on { opacity: 1; transform: translateX(0); }
.pkt.res { background: var(--teal); transform: translateX(-40px); }
.pkt.res.on { opacity: 1; transform: translateX(0); }

.code {
  background: var(--surface); border-radius: 11px; overflow: hidden;
  border: 1.5px solid var(--teal);
}
.code-tab {
  background: var(--teal); color: white;
  font: 600 11px 'JetBrains Mono', monospace;
  padding: 4px 10px;
  display: flex; justify-content: space-between;
}
.lock { font-size: 9.5px; opacity: .9; }
.code pre {
  margin: 0; border: none !important; border-radius: 0 !important;
  padding: 8px 10px !important;
  font: 11.5px/1.5 'JetBrains Mono', monospace !important;
  background: var(--surface) !important;
}
.run {
  font: 12px 'JetBrains Mono', monospace;
  background: var(--terminal); color: #d6f5ef;
  border-radius: 9px; padding: 7px 10px;
  opacity: 0; transition: opacity 0.5s;
}
.run.on { opacity: 1; }
.run b { color: #7ee2cf; }
.dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #7ee2cf; margin-right: 6px; animation: pulse 1.2s infinite; }
@keyframes pulse { 50% { opacity: .3; } }
</style>
