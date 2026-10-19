<script setup lang="ts">
/**
 * "Your challenge" banner: what participants will do in the lab that follows,
 * and how they know they're done.
 *
 *   <Challenge lab="Lab 1" done="all four claims get the right verdict">
 *     Make Claude check a claim against <b>your</b> rules.
 *   </Challenge>
 */
defineProps<{ lab: string, done?: string }>()
</script>

<template>
  <div class="ch">
    <div class="icon">🎯</div>
    <div class="main">
      <div class="lbl">Your challenge · {{ lab }}</div>
      <div class="goal"><slot /></div>
    </div>
    <div v-if="done" class="done">
      <div class="lbl">Done when</div>
      <div class="crit">{{ done }}</div>
    </div>
  </div>
</template>

<style scoped>
.ch {
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  background: var(--amber-soft);
  border: 1.5px dashed var(--amber);
  border-radius: 14px;
  padding: 10px 16px;
}
.icon { font-size: 26px; line-height: 1; flex: none; }
.main { flex: 1.3; min-width: 0; }
.done {
  flex: 1; min-width: 0;
  border-left: 1.5px dashed var(--amber);
  padding-left: 14px;
}
.lbl {
  font: 700 10px 'JetBrains Mono', monospace;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--amber-ink);
  margin-bottom: 2px;
}
.goal { font: 600 15px/1.35 'Space Grotesk', 'IBM Plex Sans Thai', sans-serif; color: var(--ink); }
.crit { font-size: 12.5px; line-height: 1.4; color: var(--ink); }
</style>
