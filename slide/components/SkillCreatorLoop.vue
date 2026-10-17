<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * The skill-creator loop.
 * 1 Interview · 2 Draft · 3 Test · 4 Review · 5 Improve
 * 6 loop arrow "repeat" · 7 Optimize description · 8 Package
 */
const { $clicks } = useSlideContext()
const c = computed(() => Number($clicks.value ?? 0))

// node centres on a 560 × 330 stage
const nodes = [
  { n: 1, x: 90, y: 165, title: 'Interview', sub: 'what · when · output', who: 'you + Claude', color: 'amber' },
  { n: 2, x: 250, y: 55, title: 'Draft', sub: 'writes SKILL.md', who: 'Claude', color: 'clay' },
  { n: 3, x: 450, y: 105, title: 'Test', sub: 'with skill vs without', who: 'Claude, in parallel', color: 'indigo' },
  { n: 4, x: 450, y: 245, title: 'Review', sub: 'side by side + scores', who: 'you', color: 'amber' },
  { n: 5, x: 250, y: 280, title: 'Improve', sub: 'generalise, explain why', who: 'Claude', color: 'clay' },
]
const on = (n: number) => c.value >= n
</script>

<template>
  <div class="loop">
    <div class="stage">
      <svg viewBox="0 0 560 330" class="wires">
        <path :class="{ on: on(2) }" d="M92 122 Q 100 62 164 56" />
        <path :class="{ on: on(3) }" d="M333 46 Q 372 46 396 60" />
        <path :class="{ on: on(4) }" d="M455 149 L 455 199" />
        <path :class="{ on: on(5) }" d="M368 256 Q 348 276 334 280" />
        <!-- improve → test: the loop -->
        <path class="loopback" :class="{ on: on(6) }" d="M302 243 Q 332 182 392 150" />
        <polygon class="head" :class="{ on: on(2) }" points="166,56 156,51 156,61" />
        <polygon class="head" :class="{ on: on(3) }" points="398,61 388,61 393,52" />
        <polygon class="head" :class="{ on: on(4) }" points="455,202 450,192 460,192" />
        <polygon class="head" :class="{ on: on(5) }" points="332,281 339,273 342,283" />
        <polygon class="head clay" :class="{ on: on(6) }" points="395,149 388,158 384,149" />
      </svg>

      <div class="center" :class="{ on: on(6) }">
        <b>repeat</b>
        <span>until you're happy</span>
      </div>

      <div
        v-for="node in nodes"
        :key="node.n"
        class="node"
        :class="[node.color, { on: on(node.n), now: c === node.n }]"
        :style="{ left: `${node.x}px`, top: `${node.y}px` }"
      >
        <span class="num">{{ node.n }}</span>
        <div>
          <b>{{ node.title }}</b>
          <small>{{ node.sub }}</small>
          <em>{{ node.who }}</em>
        </div>
      </div>
    </div>

    <div class="side">
      <div class="extra" :class="{ on: on(7) }">
        <span class="tag">then</span>
        <b>Optimise the description</b>
        <small>tests ~20 should / shouldn't-trigger prompts and rewrites the description</small>
      </div>
      <div class="extra" :class="{ on: on(8) }">
        <span class="tag">finally</span>
        <b>Package</b>
        <small><code>my-skill.skill</code>, ready to install or share</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loop { display: grid; grid-template-columns: 560px 1fr; gap: 26px; align-items: center; }
.stage { position: relative; width: 560px; height: 330px; }
.wires { position: absolute; inset: 0; width: 100%; height: 100%; color: var(--muted); overflow: visible; }
.wires path {
  fill: none; stroke: var(--muted); stroke-width: 2.2; stroke-linecap: round;
  stroke-dasharray: 260; stroke-dashoffset: 260;
  opacity: 0;
  transition: stroke-dashoffset 0.8s var(--ease), opacity 0.3s;
}
.wires path.on { stroke-dashoffset: 0; opacity: 1; }
.wires path.loopback { stroke: var(--clay); stroke-width: 2.6; stroke-dasharray: 7 6; stroke-dashoffset: 0; }
.wires path.loopback.on { opacity: 1; animation: march 1s linear infinite; }
.wires .head { fill: var(--muted); opacity: 0; transition: opacity .3s .6s; }
.wires .head.clay { fill: var(--clay); }
.wires .head.on { opacity: 1; }
@keyframes march { to { stroke-dashoffset: -26; } }

.center {
  position: absolute; left: 262px; top: 168px; transform: translate(-50%, -50%) scale(0.8);
  text-align: center; opacity: 0; transition: all 0.5s var(--ease);
}
.center.on { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.center b { display: block; font: 700 20px 'Space Grotesk', sans-serif; color: var(--clay-ink); }
.center span { font: 600 10.5px 'JetBrains Mono', monospace; color: var(--muted); }

.node {
  --c: var(--clay); --s: var(--clay-soft); --k: var(--clay-ink);
  position: absolute; transform: translate(-50%, -50%) scale(0.85);
  width: 158px;
  display: flex; gap: 9px; align-items: flex-start;
  background: var(--surface); border: 2px solid var(--c); border-radius: 14px;
  padding: 8px 10px; box-shadow: var(--shadow);
  opacity: 0; transition: all 0.5s var(--ease);
}
.node.on { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.node.now { box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 22%, transparent), var(--shadow); }
.node.amber { --c: var(--amber); --s: var(--amber-soft); --k: var(--amber-ink); }
.node.indigo { --c: var(--indigo); --s: var(--indigo-soft); --k: var(--indigo-ink); }
.num {
  flex: none; width: 24px; height: 24px; border-radius: 8px;
  background: var(--c); color: white; display: grid; place-items: center;
  font: 700 12px 'Space Grotesk', sans-serif;
}
.node b { display: block; font: 700 15px/1.1 'Space Grotesk', sans-serif; color: var(--k); }
.node small { display: block; font-size: 11px; line-height: 1.3; color: var(--ink); margin-top: 2px; }
.node em { display: block; font: 600 9.5px 'JetBrains Mono', monospace; font-style: normal; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; margin-top: 3px; }

.side { display: flex; flex-direction: column; gap: 14px; }
.extra {
  background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--teal);
  border-radius: 0 12px 12px 0; padding: 10px 13px; box-shadow: var(--shadow);
  opacity: 0; transform: translateX(14px); transition: all 0.5s var(--ease);
}
.extra.on { opacity: 1; transform: none; }
.extra .tag { font: 700 9.5px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--teal-ink); }
.extra b { display: block; font: 700 15px 'Space Grotesk', sans-serif; margin: 2px 0; }
.extra small { font-size: 12px; color: var(--muted); line-height: 1.4; display: block; }
</style>
