---
theme: default
title: Agent Skills in Action
info: |
  A hands-on workshop on Agent Skills and SKILL.md —
  from a reusable prompt to private knowledge to real code.
author: AnuchitO
colorSchema: auto
codeCopy: true
aspectRatio: 16/9
canvasWidth: 980
transition: slide-left
drawings:
  persist: false
fonts:
  sans: IBM Plex Sans Thai
  serif: Space Grotesk
  mono: JetBrains Mono
  weights: '400,600,700'
duration: 180min
layout: default
class: cover-slide
---

<div class="cover">
  <div class="eyebrow">Hands-on workshop · 3 hours</div>
  <h1 class="cover-title">Agent Skills<br><span>in Action</span></h1>
  <p class="cover-sub">From a prompt you keep re-pasting<br>to an AI that knows <b>your</b> rules and runs <b>your</b> code.</p>
  <div class="cover-files">
    <span>📁 emoji-only/</span><span>📁 expense-check/</span><span>📁 delivery-fee/</span>
  </div>
</div>

<style>
.slidev-layout.cover-slide { display: flex !important; flex-direction: column; justify-content: center; overflow: hidden; position: relative; }
.cover { text-align: left; max-width: 760px; }
.cover::after { content: ''; position: absolute; right: -80px; bottom: -80px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, var(--clay-soft) 0%, transparent 70%); z-index: -1; }
.cover-title { font-size: 4.2rem !important; line-height: 0.95 !important; margin: 0.3rem 0 1rem !important; }
.cover-title span { color: var(--clay); }
.cover-sub { font-size: 1.25rem; color: var(--muted); line-height: 1.5; }
.cover-sub b { color: var(--ink); }
.cover-files { display: flex; gap: 10px; margin-top: 2rem; }
.cover-files span {
  font: 600 13px 'JetBrains Mono', monospace;
  background: var(--surface); border: 1px solid var(--line); border-radius: 10px;
  padding: 6px 12px; box-shadow: var(--shadow);
}
</style>

<!--
Welcome. Don't say the word "skill" yet beyond the title — the first ten minutes are about feeling a problem.
-->

---

<div class="eyebrow">roadmap</div>

# Today's journey

<p>Three hours · three skills you'll build and take home</p>

<div class="road">
  <div v-click="1" class="stop"><b>1</b><span>A simple prompt</span><small>feel the pain</small></div>
  <div v-click="2" class="stop"><b>2</b><span>Why skills?</span><small>5 gaps an LLM can't fill</small></div>
  <div v-click="3" class="stop"><b>3</b><span>Anatomy</span><small>folder · frontmatter · body</small></div>
  <div v-click="4" class="stop"><b>4</b><span>How it loads</span><small>model asks, agent fetches</small></div>
  <div v-click="5" class="stop lab"><b>5</b><span>Labs 0 → 3</span><small>by hand, then with skill-creator</small></div>
</div>

<style>
.road { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 4.5rem; position: relative; }
.road::before { content: ''; position: absolute; left: 6%; right: 6%; top: 34px; border-top: 3px dashed var(--line); }
.stop { position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.stop b {
  width: 68px; height: 68px; border-radius: 22px; display: grid; place-items: center;
  background: var(--surface); border: 2.5px solid var(--clay); color: var(--clay);
  font: 700 28px 'Space Grotesk', sans-serif; box-shadow: var(--shadow);
}
.stop.lab b { background: var(--clay); color: white; }
.stop span { font: 700 16px 'Space Grotesk', sans-serif; margin-top: 6px; }
.stop small { color: var(--muted); font-size: 12.5px; }
</style>

<!--
Five stops. The last one is where participants spend most of their time — the first four are there so the labs make sense.
-->

---
clicks: 4
---

<div class="eyebrow amber">Act 1 · just a prompt</div>

# Let's start with a prompt

<div class="grid grid-cols-[1fr_1.15fr] gap-8 mt-4 items-center">
<div>

A fun instruction. Nothing special yet.

<div v-copy class="prompt-card">Reply to everything using only emoji — no words.</div>

<div v-click="4" class="takeaway mt-6">It works! 🎉 &nbsp;…but watch what happens next.</div>

</div>

<ChatMock title="New chat" height="330px" :messages="[
  { role: 'user', text: 'Reply to everything using only emoji — no words.', at: 1, copy: true },
  { role: 'ai', text: '👍😄', at: 1, big: true },
  { role: 'user', text: 'How do I feel after three coffees?', at: 2, copy: true },
  { role: 'ai', text: '😳⚡💓🏃‍♂️', at: 3, big: true },
]" />
</div>

<style>
.prompt-card {
  margin-top: 1rem;
  font: 15px/1.5 'JetBrains Mono', monospace;
  background: var(--amber-soft); border: 1.5px solid var(--amber);
  padding: 12px 16px; border-radius: 12px;
}
</style>

<!--
Do this LIVE in a real chat if you can. Do NOT call it a skill. Just a prompt.
Click 1: paste the instruction. Click 2–3: ask the coffee question. Click 4: "It works!"
-->

---
clicks: 5
---

<div class="eyebrow amber">Act 1 · the pain</div>

# Now keep using it…

<div class="grid grid-cols-[1.15fr_1fr] gap-8 mt-2 items-center">

<ChatMock title="Later that day" height="380px" :messages="[
  { role: 'user', text: 'What should I eat tonight?', at: 0 },
  { role: 'ai', text: 'How about a bowl of khao soi? It is rich, warm and…', at: 1, bad: true },
  { role: 'user', text: 'Reply to everything using only emoji — no words.', at: 2, paste: true },
  { role: 'divider', text: 'new chat', at: 3 },
  { role: 'user', text: 'Reply to everything using only emoji — no words.', at: 4, paste: true },
  { role: 'user', text: 'Reply to everything using only emoji — no words.', at: 5, paste: true },
]" />

<div class="pain">
  <div v-click="1" class="pain-item"><span>😩</span> Long chat — it <b>drifted back</b> to words.</div>
  <div v-click="2" class="pain-item"><span>📋</span> So you <b>paste the instruction again</b>.</div>
  <div v-click="3" class="pain-item"><span>🆕</span> New chat → it remembers <b>nothing</b>.</div>
  <div v-click="5" class="pain-item big">Paste. Paste. Paste.<br><b>Every. Single. Time.</b></div>
</div>

</div>

<style>
.pain { display: flex; flex-direction: column; gap: 14px; }
.pain-item { font-size: 17px; }
.pain-item span { font-size: 24px; margin-right: 10px; vertical-align: middle; }
.pain-item.big { font: 600 22px/1.3 'Space Grotesk', sans-serif; color: var(--clay-ink); margin-top: 8px; display: block; }
</style>

<!--
Let the room groan. Ask: "Who has a prompt they paste every day?" Get two or three examples — you'll reuse them in the labs.
-->

---
clicks: 3
---

<div class="eyebrow">the turn</div>

# What if we wrote it down <span style="color:var(--clay)">once</span>?

<PromptToFile class="mt-2" />

<div v-click="3" class="takeaway">That file is called <code>SKILL.md</code>. That's all a skill is: <b>instructions Claude finds by itself</b>, when they're relevant.</div>

<!--
Click 1: the three pasted copies fold into a single file — just the body, the exact prompt we kept pasting.
Click 2: add the frontmatter on top (name + description) — the body moves down. That's a complete SKILL.md.
Click 3: every new chat picks it up automatically.
Hover the file to copy it at either step.
Now — and only now — say the word "skill".
-->

---
layout: center
class: text-center
---

<div class="section-num">?</div>

# But why do we need this?

<p style="font-size:1.2rem;color:var(--muted)">Claude is already smart. What can't it do on its own?</p>

<!--
Pause. Take a couple of guesses from the room before revealing the five gaps.
-->

---
clicks: 5
---

<div class="eyebrow">Act 2 · why skills</div>

# 5 things a plain LLM can't do on its own

<FiveGaps class="mt-6" />

<!--
One card per click. For each, give a one-line story:
1 Private knowledge — it never saw your price list, so it invents one.
2 Consistency — ask twice, get two formats.
3 Memory across chats — what we just felt with the emoji prompt.
4 Reliable procedure — long tasks drift, steps get skipped.
5 Real code — math in its head is close, not exact.
-->

---
layout: center
class: text-center
---

<div class="quote">
A skill doesn't make Claude <span class="s">smarter</span>.<br>
It makes Claude <span class="h">informed</span>, <span class="h">consistent</span>, and <span class="h">reliable</span><br>
about <b>your</b> world.
</div>

<style>
.quote { font: 600 2rem/1.35 'Space Grotesk', sans-serif; letter-spacing: -0.02em; }
.quote .s { text-decoration: line-through; text-decoration-color: var(--rose); color: var(--muted); }
.quote .h { color: var(--clay); }
</style>

<!--
The one sentence to remember. The intelligence is already there — the skill supplies knowledge, rules and repeatability.
-->

---
clicks: 5
---

<div class="eyebrow teal">Act 3 · anatomy</div>

# A skill is a folder

<div class="grid grid-cols-[2fr_1fr] gap-6 mt-4 items-start">

<SkillFolder folder="emoji-only" :entries="[
  { name: 'SKILL.md', kind: 'required', at: 1, note: 'entry point, read first' },
  { name: 'scripts/', kind: 'optional', at: 2, color: 'teal', note: 'code to run' },
  { name: 'references/', kind: 'optional', at: 3, color: 'indigo', note: 'longer docs, on demand' },
  { name: 'assets/', kind: 'optional', at: 3, color: 'rose', note: 'templates, images, files' },
]" />

<div v-click="4" class="card">
  <b style="font-family:'Space Grotesk'">Quick check ✋</b>
  <p class="text-sm mt-2">A folder with <b>only</b> <code>SKILL.md</code> inside — is that a complete skill?</p>
  <p v-click="5" class="text-sm" style="color:var(--teal-ink)"><b>Yes.</b> Everything else is optional, added only when needed.</p>
</div>

</div>

<!--
Click 1: SKILL.md (solid = required). Click 2–3: optional folders (dashed).
Click 4–5: ask the quick check, wait for answers, reveal.
-->

---
clicks: 5
---

<div class="eyebrow teal">Act 3 · anatomy</div>

# Inside SKILL.md: a header<sup class="fn-mark">1</sup> and a body

<SkillAnatomy class="mt-2" />

<div class="footnote">
  <sup>1</sup> <b>Frontmatter</b> = the small block of settings at the very top of a file, between two <code>---</code> lines, written as <code>key: value</code> (a format called YAML).
  The word comes from books: the <i>front matter</i> is the title and copyright pages before the story — information <i>about</i> the book, not the book itself.
  Here it's information <i>about</i> the skill (its name, when to use it); everything below the second <code>---</code> is the skill itself.
</div>

<style>
.fn-mark { font-size: 0.45em; color: var(--clay); margin-left: 2px; }
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.9rem;
  border-top: 1px solid var(--line);
  padding-top: 6px;
  font-size: 10.5px; line-height: 1.45; color: var(--muted);
}
.footnote sup { color: var(--clay); font-weight: 700; }
.footnote b { color: var(--ink); }
.footnote code { font-size: 0.95em !important; padding: 0 0.25em !important; }
</style>

<!--
Click 1: frontmatter — the ID card between the --- lines. (Footnote explains the word: from book publishing, info ABOUT the book.)
Click 2: name. Click 3: description — the most important line in the file. WHAT it does + WHEN to use it.
Click 4: the body — plain Markdown, no special syntax.
Click 5: teaser — the header is always loaded, the body only on match. We'll see why in a moment.
-->

---

<div class="eyebrow teal">Act 3 · anatomy</div>

# The description decides everything

<div class="grid grid-cols-2 gap-6 mt-6">

<div v-click class="card bad-desc">
  <div class="lbl">❌ vague</div>

```yaml
description: Helps with expenses.
```

  <p class="text-sm">When? For what? Claude can't tell if a receipt question should use it.</p>
</div>

<div v-click class="card good-desc">
  <div class="lbl">✅ what + when</div>

```yaml
description: Check an expense claim
  against our company policy and flag
  anything that won't be reimbursed.
  Use when someone pastes a receipt,
  bill, or expense claim.
```

</div>
</div>

<div v-click class="takeaway mt-6">Claude picks a skill from the description <b>alone</b> — before it has read a single rule.</div>

<style>
.bad-desc { border-top: 5px solid var(--rose); }
.good-desc { border-top: 5px solid var(--teal); }
.lbl { font: 700 11px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; }
.bad-desc .lbl { color: var(--rose-ink); }
.good-desc .lbl { color: var(--teal-ink); }
</style>

<!--
This is the #1 reason skills "don't work" in practice. Spend a minute here.
-->

---

<div class="eyebrow amber">Demo 0 · write it</div>

# Our first skill: `emoji-only`

<div class="grid grid-cols-[1.3fr_1fr] gap-8 mt-4 items-start">

```md {all|1-6|2|3-5|8-9|all}
---
name: emoji-only
description: Reply using only emoji, no words.
  Use when the user asks for emoji-only answers
  or says "emoji mode".
---

Reply to everything using only emoji — no words,
no letters, no numbers.
Capture the meaning with emoji alone.
```

<div class="steps">
  <div v-click="1"><b>1</b> Header between <code>---</code> lines</div>
  <div v-click="2"><b>2</b> <code>name</code> = folder name</div>
  <div v-click="3"><b>3</b> <code>description</code>: what + when</div>
  <div v-click="4"><b>4</b> Body: the same prompt we kept pasting</div>
  <div v-click="5" class="path">📁 demos/demo-0/emoji-only/SKILL.md</div>
</div>

</div>


<!--
Point out: the body is literally the prompt from Act 1. Nothing new to learn — just a new place to put it.
-->

---
clicks: 5
---

<div class="eyebrow indigo">Act 4 · how it loads</div>

# Progressive disclosure: load only what's needed

<ProgressiveDisclosure class="mt-2" />

<!--
Click 1: at startup Claude only sees the name + description of every installed skill. Tiny — so you can install many.
Click 2: a request arrives; Claude matches it against the descriptions.
Click 3: only now does the body of THAT ONE skill load.
Click 4: extra files and scripts load only if the body points to them.
Click 5: the payoff — your context stays free for the actual work.
-->

---
clicks: 7
---

<div class="eyebrow indigo">Act 4 · the real mechanism</div>

# One request, step by step

<RequestFlow class="mt-2" :steps="[
  { lane: 'user', title: 'User', detail: '“Emoji mode: how was your weekend?”' },
  { lane: 'agent', title: 'Packs the context', detail: 'skill descriptions + user message', arrow: 'right', label: 'sends to model' },
  { lane: 'model', title: 'Reads the descriptions', detail: '“emoji-only fits this request”' },
  { lane: 'model', title: 'Asks for the file', detail: 'Read emoji-only/SKILL.md', code: true, arrow: 'left', label: 'tool call' },
  { lane: 'agent', title: 'Fetches it from disk', detail: 'returns the full body', arrow: 'right', label: 'tool result' },
  { lane: 'model', title: 'Follows the instructions', detail: 'emoji only — no words' },
  { lane: 'user', title: 'Answer', detail: '🏖️😴🍜☀️' },
]" />

<!--
The key insight: the model never touches the disk. It ASKS (a tool call), the agent FETCHES, the model READS.
There's no search engine doing the matching in step 3 — it's the model reading text and judging.
-->

---
clicks: 4
---

<div class="eyebrow indigo">Act 4 · the key idea</div>

# Model asks. Agent fetches. Model reads.

<div class="mech">
  <div class="lane agent-lane"><span class="lane-title">Agent / harness</span></div>
  <div class="lane model-lane"><span class="lane-title">Model (Claude)</span></div>

  <div v-click="2" class="m agent fetch"><span>Agent</span><b>fetches</b><small>reads the file from disk<sup>1</sup></small></div>
  <div v-click="1" class="m model ask"><span>Model</span><b>asks</b><small>“I need SKILL.md”<sup>1</sup></small></div>
  <div v-click="2" class="arr a1"><em>tool call</em><svg viewBox="0 0 200 16" preserveAspectRatio="none"><line x1="194" y1="8" x2="8" y2="8"/><polyline points="20,2 6,8 20,14"/></svg></div>
  <div v-click="3" class="arr a2"><em>tool result</em><svg viewBox="0 0 200 16" preserveAspectRatio="none"><line x1="6" y1="8" x2="192" y2="8"/><polyline points="180,2 194,8 180,14"/></svg></div>
  <div v-click="3" class="m model read"><span>Model</span><b>reads</b><small>follows the instructions</small></div>
</div>

<p v-click="4" class="mech-caption">
The descriptions are already in Claude's system prompt. Claude decides from them, then <b>asks</b> for more only when it needs it.<sup>2</sup>
</p>

<div class="footnote">
  <sup>1</sup> <b>How it asks depends on the product.</b> Claude app &amp; API: Claude runs a bash command, e.g. <code>cat emoji-only/SKILL.md</code>.
  Claude Code: Claude calls its built-in <code>Skill</code> tool and Claude Code adds the skill's content to the conversation, where it stays for later turns.
  <b>The same loop repeats</b> for <code>references/</code> (read when needed) and <code>scripts/</code> (run with bash; only the output comes back).<br>
  <sup>2</sup> <b>You can also ask yourself:</b> in Claude Code, type <code>/emoji-only</code> at the start of a message. With <code>disable-model-invocation: true</code> only you can run it, and its description isn't even shown to Claude.
  Sources: platform.claude.com · Agent Skills overview; code.claude.com · Skills.
</div>

<style>
.mech {
  display: grid;
  grid-template-columns: 250px 210px 250px;
  grid-template-rows: 36px 92px 92px;
  row-gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 0.4rem;
}
.lane { grid-row: 1 / 4; border-radius: 20px; align-self: stretch; padding: 8px 16px; }
.agent-lane { grid-column: 1; background: var(--teal-soft); }
.model-lane { grid-column: 3; background: var(--indigo-soft); text-align: right; }
.lane-title { font: 700 14px 'Space Grotesk', sans-serif; }
.agent-lane .lane-title { color: var(--teal-ink); }
.model-lane .lane-title { color: var(--indigo-ink); }
.m {
  z-index: 1; margin: 0 16px; height: 84px;
  border-radius: 16px; background: var(--surface);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: var(--shadow); border: 2px solid;
}
.m span { font: 600 10px 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .14em; opacity: .8; }
.m b { font: 700 28px/1.1 'Space Grotesk', sans-serif; }
.m small { font-size: 11.5px; color: var(--muted); }
.m sup, .mech-caption sup { color: var(--clay); font-weight: 700; }
.m.model { color: var(--indigo-ink); border-color: var(--indigo); }
.m.agent { color: var(--teal-ink); border-color: var(--teal); }
.fetch { grid-column: 1; grid-row: 2 / 4; height: 120px; }
.ask { grid-column: 3; grid-row: 2; }
.read { grid-column: 3; grid-row: 3; }
.arr { z-index: 1; position: relative; padding: 0 4px; }
.a1 { grid-column: 2; grid-row: 2; }
.a2 { grid-column: 2; grid-row: 3; }
.arr svg { width: 100%; height: 16px; overflow: visible; display: block; }
.arr line, .arr polyline { fill: none; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
.a1 line, .a1 polyline { stroke: var(--indigo); }
.a2 line, .a2 polyline { stroke: var(--teal); }
.arr em {
  position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
  font: 700 11px 'JetBrains Mono', monospace; font-style: normal; white-space: nowrap;
}
.a1 em { color: var(--indigo-ink); }
.a2 em { color: var(--teal-ink); }
.mech-caption { text-align: center; font-size: 14px; color: var(--muted); margin-top: 0.7rem; }
.mech-caption b { color: var(--ink); }
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.8rem;
  border-top: 1px solid var(--line);
  padding-top: 6px;
  font-size: 10px; line-height: 1.45; color: var(--muted);
}
.footnote sup { color: var(--clay); font-weight: 700; }
.footnote b { color: var(--ink); }
.footnote code { font-size: 0.95em !important; padding: 0 0.25em !important; }
</style>

<!--
Have the room say it back: "model asks, agent fetches, model reads."
Footnote 1: the exact mechanism differs — bash `cat` in the Claude app/API, the Skill tool in Claude Code — but the shape is the same.
Footnote 2: the model isn't the only one who can trigger a skill; in Claude Code you can call it with /name.
-->

---
layout: center
class: text-center
---

<div class="section-num">0</div>

# Lab 0 · your turn

<p style="color:var(--muted);font-size:1.1rem">Install <code>emoji-only</code> and make it trigger.</p>

---

<div class="eyebrow amber">Lab 0 · 15 min</div>

# Install it, then try it

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="card">

### Claude Code

```bash
# personal — every project
cp -r demos/demo-0/emoji-only ~/.claude/skills/

# or project — shared via git
mkdir -p .claude/skills
cp -r demos/demo-0/emoji-only .claude/skills/
```

</div>

<div class="card">

### Claude app

<p class="text-sm">Upload <code>emoji-only/SKILL.md</code> as it is: a single <code>.md</code> file works.</p>

```bash
# optional: zip the whole folder instead
cd demos/demo-0 && zip -r emoji-only.zip emoji-only
```

<p class="text-sm mt-2"><b>Settings → Skills → + Add → Upload skill</b>, then start a <b>new</b> chat. Step by step on the next slide →</p>

</div>
</div>

<div class="grid grid-cols-3 gap-4 mt-5 text-sm">
  <div v-click v-copy="'Emoji mode please: how was your weekend?'" class="try">💬 <code>Emoji mode please: how was your weekend?</code></div>
  <div v-click class="try">🆕 Open a <b>new chat</b> — does it still work?</div>
  <div v-click v-copy="'Always end every reply with 🙏'" class="try">✏️ Add “always end with 🙏” to the body. Try again.</div>
</div>

<style>
.try { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; box-shadow: var(--shadow); }
</style>

<!--
Walk the room. Most common problems: the folder name doesn't match `name:`, the frontmatter isn't on line 1, or they forgot to open a new chat.
-->

---
clicks: 4
---

<div class="eyebrow amber">Lab 0 · Claude app</div>

# Install a skill in the Claude app

<AppInstallSteps class="mt-1" :steps="[
  { title: 'Open Settings', where: 'your name (bottom-left) → Settings',
    detail: 'Or press ⇧⌘, on a Mac.',
    img: '/claude-app/1-open-settings.png', w: 670, h: 300,
    rings: [{ x: 1.5, y: 5, w: 96, h: 17 }] },
  { title: 'Turn on code execution', where: 'Settings → Capabilities',
    detail: '“Cloud code execution and file creation” must be ON. The app says it is required for skills.',
    img: '/claude-app/2-code-execution.png', w: 1232, h: 450,
    rings: [{ x: 1.4, y: 14.7, w: 18.3, h: 8.4 }, { x: 22.7, y: 63, w: 74.7, h: 19 }] },
  { title: 'Add a skill', where: 'Customize → Skills → + Add',
    detail: 'Choose “Upload skill”. (“Create with Claude” builds one with you, like skill-creator.)',
    img: '/claude-app/3-add-upload.png', w: 962, h: 360,
    rings: [{ x: 86, y: 8.3, w: 11.2, h: 9.7 }, { x: 75, y: 22.8, w: 21.6, h: 9.2 }] },
  { title: 'Upload SKILL.md', where: 'demos/demo-0/emoji-only/SKILL.md',
    detail: 'Drop the file (or a .zip of the folder), then click Upload. A security scan runs first.',
    img: '/claude-app/4-upload-dialog.png', w: 962, h: 560,
    rings: [{ x: 2.6, y: 33, w: 93.2, h: 25.5 }, { x: 2.7, y: 90.5, w: 8.7, h: 6.6 }] },
  { title: 'Try it in a new chat', where: 'hover the prompt to copy it',
    detail: 'Answers in words? Check the skill is switched on and the prompt matches its description.',
    chat: { prompt: 'Emoji mode please: how was your weekend?', reply: '🏖️😴🍜☀️' } },
]" />

<div class="footnote">
  Skills in the Claude app need a <b>Pro, Max, Team or Enterprise</b> plan. On Team and Enterprise an admin may need to turn on Skills and code execution first.
  Screenshots taken from claude.ai in October 2026; menus change, so check the help article <i>“Using Skills in Claude”</i> (support.claude.com) if something looks different.
</div>

<style>
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.8rem;
  border-top: 1px solid var(--line);
  padding-top: 6px;
  font-size: 10px; line-height: 1.45; color: var(--muted);
}
.footnote b { color: var(--ink); }
</style>

<!--
Do this live on the projector while everyone follows on their own laptop. One click = one step.
1 Settings: click your name in the bottom-left corner, then Settings (⇧⌘, on Mac).
2 Capabilities: "Cloud code execution and file creation" must be on. The app labels it "Required for skills."
3 Customize → Skills → + Add → Upload skill. Point out "Create with Claude" — that's the skill-creator idea from section 3.
4 Drop SKILL.md straight in. No zip needed for a single-file skill. A security scan runs on upload.
5 New chat, paste the prompt. If it doesn't trigger: is the skill toggled on? does the prompt match the description?
-->

---

<div class="eyebrow amber">Lab 0 · checkpoint</div>

# Will it trigger? 🤔

<div class="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
  <div v-click="1" v-copy class="q">“Emoji mode: what's for dinner?”</div>
  <div v-click="2" class="a yes">✅ Yes — says “emoji mode”, right there in the description</div>
  <div v-click="3" v-copy class="q">“Explain the weather forecast in emoji”</div>
  <div v-click="4" class="a yes">✅ Probably — it asks for emoji-only answers</div>
  <div v-click="5" v-copy class="q">“What's the capital of Japan?”</div>
  <div v-click="6" class="a no">❌ No — nothing matches, Claude answers normally</div>
</div>

<div v-click="7" class="takeaway mt-8">If it doesn't trigger when you expect it to, <b>fix the description</b>, not the body.</div>

<style>
.q { font: 15px 'JetBrains Mono', monospace; background: var(--amber-soft); border-radius: 12px; padding: 10px 14px; }
.a { font-size: 15px; display: flex; align-items: center; }
.a.yes { color: var(--teal-ink); }
.a.no { color: var(--rose-ink); }
</style>

---
layout: center
class: text-center
---

<div class="section-num">1</div>

# Level up: private knowledge

<p style="color:var(--muted);font-size:1.1rem">Demo 1 · <code>expense-check</code> — rules no LLM could ever guess</p>

---

<div class="eyebrow">Demo 1 · the problem</div>

# Ask a plain LLM about <i>your</i> expense policy

<div class="grid grid-cols-[1fr_1fr] gap-8 mt-6 items-center">

<ChatMock title="No skill" height="270px" :messages="[
  { role: 'user', text: 'Will this be reimbursed? Client dinner, 2 people: food 1,600 ฿, wine 400 ฿, total 2,000 ฿, no receipt.', at: 0, copy: 'Will this be reimbursed? Client dinner, 2 people: food 1,600 baht, 2 glasses of wine 400 baht, total 2,000 baht, no receipt.' },
  { role: 'ai', text: 'A 2,000-baht client dinner sounds reasonable — most companies cover business meals, so you should be fine!', at: 1, bad: true },
]" />

<div>
  <div v-click="2" class="pain-item"><span>❓</span> What's the meal cap?</div>
  <div v-click="2" class="pain-item mt-3"><span>🍷</span> Is alcohol allowed?</div>
  <div v-click="2" class="pain-item mt-3"><span>🧾</span> When is a receipt required?</div>
  <div v-click="3" class="takeaway mt-6">It has <b>never seen</b> your policy. So it guesses — confidently. <br>Gap #1: <b>private knowledge</b>.</div>
</div>

</div>

---

<div class="eyebrow">Demo 1 · write it</div>

# `expense-check/SKILL.md`

<div class="grid grid-cols-[1.3fr_1fr] gap-6 mt-1 items-start">

```md {1-6|10-15|8|17-21|23|all}
---
name: expense-check
description: Check an expense claim against our
  company policy and flag anything that won't be
  reimbursed. Use when someone pastes a receipt.
---
# Expense Policy Checker
Check it against these rules **in this order**.

## Our rules
1. Meals: max 800 baht per person.
2. No alcohol — never reimbursable.
3. A receipt is required for any claim over 1,000 baht.
4. Taxi / Grab: fine. Rental cars: need manager approval.
5. Submit within 30 days of the date on the receipt.

## How to reply
### Verdict — ✅ OK / ⚠️ Needs fixing / ❌ Rejected
### Flags — one line per problem, naming the rule
### Reimbursable total — in baht
(full format in the real file)

Never guess a rule that is not listed here.
```

<div class="steps">
  <div v-click="1"><b class="e">🔒</b> <span class="g">Private knowledge</span> — your rules, nowhere else on earth</div>
  <div v-click="2"><b class="e">📋</b> <span class="g">Procedure</span> — “in this order”</div>
  <div v-click="3"><b class="e">🎯</b> <span class="g">Consistency</span> — same three sections, every time</div>
  <div v-click="4"><b class="e">🛡️</b> A guardrail: don't invent rules</div>
  <div v-click="5" class="path">📁 demos/demo-1/expense-check/SKILL.md</div>
</div>

</div>

<style>
.slidev-code { font-size: 0.7rem !important; line-height: 1.5 !important; }
</style>

<!--
Still just one file, no code. The difference from Demo 0: the body now carries KNOWLEDGE, not just a style.
The slide shows a condensed reply format — open the real file to show the full version.
-->

---
clicks: 5
---

<div class="eyebrow">Demo 1 · before vs after</div>

# Same receipt, two answers

<ReceiptVerdict class="mt-4" />

<!--
Click 1: the plain answer — friendly, confident, wrong.
Click 2: with the skill — a verdict.
Click 3–4: each flag cites a rule number.
Click 5: the reimbursable total. It caught the wine and the missing receipt because YOUR rules told it to.
-->

---

<div class="eyebrow">Lab 1 · 25 min</div>

# Install `expense-check` and test it

<div v-copy="{ selector: 'tbody td:first-child', texts: [
  'Will this be reimbursed? Client dinner, 2 people: food 1,600 baht, 2 glasses of wine 400 baht, total 2,000 baht, no receipt.',
  'Grab to client office, 180 baht, receipt attached, dated last week',
  'Rental car for 2 days, 3,500 baht, receipt attached, no approval',
  'Team lunch, 5 people, 4,500 baht, receipt from 45 days ago',
] }">

| Paste this claim | Expected |
|---|---|
| The client dinner (food 1,600 · wine 400 · no receipt) | ⚠️ Needs fixing — rule 2, rule 3 · pays 1,600 ฿ |
| Grab to client office, 180 ฿, receipt, last week | ✅ OK to submit |
| Rental car 2 days, 3,500 ฿, receipt, no approval | ⚠️ Needs manager approval — rule 4 |
| Team lunch, 5 people, 4,500 ฿, receipt 45 days old | ❌ Over 800/person (rule 1) + too old (rule 5) |

</div>

<div class="grid grid-cols-2 gap-4 mt-5 text-sm">
  <div v-click v-copy="'1. Meals: max 1,000 baht per person.'" class="try">✏️ <b>Change a rule</b>: meal cap → 1,000 ฿. Re-run the dinner. The answer follows your edit.</div>
  <div v-click class="try">🏢 <b>Make it yours</b>: swap in a real rule from your own team.</div>
</div>

<style>
.try { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; box-shadow: var(--shadow); }
</style>

<!--
Team lunch: 4,500 / 5 = 900 per person > 800.
The "change a rule" exercise is the moment it clicks: the policy lives in a file anyone can edit.
-->

---
layout: center
class: text-center
---

<div class="section-num">2</div>

# Level up: real code

<p style="color:var(--muted);font-size:1.1rem">Demo 2 · <code>delivery-fee</code> — when the answer must be <b>exact</b></p>

---
clicks: 4
---

<div class="eyebrow rose" style="color:var(--rose-ink);background:var(--rose-soft)">Demo 2 · the problem</div>

# A small Thai shop's delivery fee

<div class="grid grid-cols-[1fr_1fr] gap-8 mt-6 items-start">

<div class="card rules">
  <div class="lbl">Our rules</div>
  <div v-click="1">🚫 No delivery on Sundays</div>
  <div v-click="2">🎁 Orders over 500 ฿ ship free</div>
  <div v-click="3">🛵 Else: <b>40 ฿</b> base + <b>7 ฿ / km</b> after the first 3 km, rounded up</div>
</div>

<div v-click="4">
  <p class="text-sm" style="color:var(--muted)">300 ฿ order · 12.5 km · Tuesday</p>
  <div class="math">40 + (12.5 − 3) × 7 = <b>106.5</b> → <b>107&nbsp;฿</b></div>
  <div class="takeaway mt-6">A plain LLM does this “in its head”: close, not guaranteed. Money needs <b>exact</b> — every single time.</div>
</div>

</div>

<style>
.rules { display: flex; flex-direction: column; gap: 12px; font-size: 16px; border-top: 5px solid var(--rose); }
.rules .lbl { font: 700 11px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--rose-ink); }

.math { font: 600 16px 'JetBrains Mono', monospace; white-space: nowrap; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 14px 14px; margin-top: 8px; box-shadow: var(--shadow); }
.math b { color: var(--teal-ink); }
</style>

---
clicks: 3
---

<div class="eyebrow teal">Demo 2 · the folder</div>

# Now the skill has a script

<div class="grid grid-cols-[1.4fr_1fr] gap-8 mt-6 items-start">

<SkillFolder folder="delivery-fee" folder-note="Demo 2" :entries="[
  { name: 'SKILL.md', kind: 'required', at: 1, note: 'the instructions' },
  { name: 'scripts/', kind: 'optional', at: 2, color: 'teal' },
  { name: 'calc_fee.py', kind: 'optional', depth: 2, at: 2, color: 'teal', note: 'the exact math' },
]" />

<div v-click="3" class="card">
  <b style="font-family:'Space Grotesk'">Division of labour</b>
  <p class="text-sm mt-2"><b style="color:var(--indigo-ink)">SKILL.md</b> — <i>what</i> to do and <i>when</i>.</p>
  <p class="text-sm"><b style="color:var(--teal-ink)">calc_fee.py</b> — the part that must never be wrong.</p>
</div>

</div>

---

<div class="eyebrow teal">Demo 2 · write it</div>

# `SKILL.md` + `calc_fee.py`

<div class="grid grid-cols-[1.1fr_1fr] gap-5 mt-1">

````md {1-6|8|10-11|12-16|17-20|all}
---
name: delivery-fee
description: Quote our shop's delivery fee.
  Use when a customer asks how much delivery
  costs or whether delivery is free.
---
# Delivery Fee Quoter
Follow these steps in order. **Never do the fee math yourself.**

1. Find the distance (km), the order total,
   and the day. If missing, ask the customer.
2. Run the calculator:
   ```bash
   python3 scripts/calc_fee.py \
     --km <km> --order <total> --day <day>
   ```
3. Reply with exactly what the script printed:
   **Distance:** … km
   **Delivery fee:** … baht
   **Arrives:** 2–3 days
````

```python {all|1-4|8-9|10-11|12-15}
BASE_FEE = 40     # baht
FREE_KM = 3       # first 3 km included
PER_KM = 7        # baht per extra km
FREE_OVER = 500   # free delivery above this

args = parse_args()   # --km  --order  --day

if args.day.lower().startswith("sun"):
    print("NO_DELIVERY: we don't deliver on Sundays")
elif args.order > FREE_OVER:
    print("fee=0 baht (free: order over 500 baht)")
else:
    extra_km = max(0, args.km - FREE_KM)
    fee = math.ceil(BASE_FEE + extra_km * PER_KM)
    print(f"fee={fee} baht")
```

</div>

<style>
.slidev-code { font-size: 0.68rem !important; line-height: 1.5 !important; }
</style>

<!--
Left: the skill tells Claude WHEN and HOW to use the script — and explicitly not to do the math itself.
Right: the rules as code (condensed — open scripts/calc_fee.py for the full file). The prices now live in constants.
-->

---
clicks: 5
---

<div class="eyebrow teal">Demo 2 · level 3 in action</div>

# The code runs outside. Only the answer comes in.

<ScriptBoundary class="mt-3" />

<!--
Click 1: without a script, the model guesses.
Click 2: with the skill, it asks the agent to run the script.
Click 3: the script runs OUTSIDE the model — its code never enters the context.
Click 4: only the one-line output comes back.
Click 5: same answer, every time. That's gap #5: running real code.
-->

---
clicks: 9
---

<div class="eyebrow indigo">Demo 2 · the full mechanism</div>

# One request, all three levels

<RequestFlow compact :steps="[
  { lane: 'user', title: 'User', detail: '“300 ฿ order, 12.5 km, Tuesday — delivery?”' },
  { lane: 'agent', title: 'Packs the context', detail: 'skill descriptions + message', arrow: 'right', label: 'sends to model' },
  { lane: 'model', title: 'Reads descriptions', detail: '“delivery-fee fits”' },
  { lane: 'model', title: 'Asks for the body', detail: 'Read delivery-fee/SKILL.md', code: true, arrow: 'left', label: 'tool call' },
  { lane: 'agent', title: 'Fetches SKILL.md', detail: 'returns the body', arrow: 'right', label: 'tool result' },
  { lane: 'model', title: 'Asks to run the script', detail: 'calc_fee.py --km 12.5 …', code: true, arrow: 'left', label: 'tool call' },
  { lane: 'agent', title: 'Runs it', detail: 'output only: fee=107 baht', arrow: 'right', label: 'tool result' },
  { lane: 'model', title: 'Writes the reply', detail: 'in the format from SKILL.md' },
  { lane: 'user', title: 'Answer', detail: 'Delivery fee: 107 baht · arrives in 2–3 days' },
]" />

<!--
Same picture as Act 4, with two more steps: the script call (6) and its output (7).
Walk it slowly — this is the slide that makes the whole workshop click for engineers.
-->

---

<div class="eyebrow">Lab 2 · 30 min</div>

# Install `delivery-fee` and break it

<div class="grid grid-cols-[1fr_1.1fr] gap-6 mt-3">

<div>

**1 · Test the script yourself**

```bash
cd demos/demo-2/delivery-fee
python3 scripts/calc_fee.py --km 12.5 \
  --order 300 --day Tue   # fee=107 baht
```

<p class="text-xs" style="color:var(--muted)">Needs somewhere Claude can run code — Claude Code, or the app with code execution on.</p>

</div>

<div v-copy="{ selector: 'tbody td:first-child', texts: [
  'How much is delivery for a 300 baht order, 12.5 km away, on Tuesday?',
  'Same order, but the total is 600 baht',
  'Can you deliver 2 km on Sunday?',
  'How much is delivery?',
] }">

**2 · Then ask Claude**

| Prompt | Expected |
|---|---|
| 300 ฿ order, 12.5 km, Tuesday | 107 ฿ |
| Same, but a 600 ฿ order | Free |
| 2 km on Sunday? | No — suggest Monday |
| “How much is delivery?” | Asks for km, total, day |

</div>
</div>

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
  <div v-click class="try">🔁 Ask the first prompt <b>twice</b>. Same number?</div>
  <div v-click v-copy="'PER_KM = 10'" class="try">✏️ Change <code>PER_KM = 7</code> → <code>10</code>. The skill text didn't change — the answer did.</div>
</div>

<style>
.try { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; box-shadow: var(--shadow); }
</style>

---
layout: center
class: text-center
---

<div class="section-num">3</div>

# Level up: let Claude build the skill

<p style="color:var(--muted);font-size:1.1rem">Bonus · <code>skill-creator</code> — a skill whose whole job is making skills</p>

<div class="official-link">
  <span v-copy="'https://github.com/anthropics/skills/tree/main/skills/skill-creator'">https://github.com/anthropics/skills/tree/main/skills/skill-creator</span>
</div>

<style>
.official-link { margin-top: 1.4rem; }
.official-link span {
  display: inline-block;
  font: 500 12px 'JetBrains Mono', monospace;
  color: var(--muted);
  user-select: all;
}
</style>

<!--
Transition: "You just wrote three skills by hand. Now let's see how Claude can write, test and tune one WITH you."
-->

---
clicks: 3
---

<div class="eyebrow">skill-creator · install</div>

# Get skill-creator

<div class="grid grid-cols-[1.25fr_1fr] gap-6 mt-1 items-start">

<div>
<div class="col-head">Claude app · Settings → Skills</div>
<ShotCallouts src="/skill-creator/find-skill-creator.png" :w="962" :h="350" :max-width="500" :max-height="160" :cols="1" :callouts="[
  { title: 'Search “skill-creator”', text: 'Settings → Customize → Skills, then type in the search box.', x: 42.8, y: 5.1, w: 32, h: 11.1, tone: 'info' },
  { title: 'Under “Yours”? You already have it', text: 'Anthropic ships it as an example skill on paid plans.', x: 1.1, y: 34.3, w: 95.6, h: 15.7, tone: 'good' },
  { title: 'Otherwise click Add', text: 'The official plugin from anthropics/claude-plugins-official.', x: 84.8, y: 76.6, w: 6.2, h: 10.6, tone: 'warn' },
]" />
</div>

<div>
<div class="col-head">Claude Code · in the chat box</div>

```text
/plugin install skill-creator@claude-plugins-official
```

<p class="text-xs" style="color:var(--muted);margin:6px 0 4px">“Marketplace not found”? Add it once, then install again:</p>

```text
/plugin marketplace add anthropics/claude-plugins-official
```

<div class="test-it" v-copy="'Use skill-creator to help me make a new skill'">
  <span>Check it works</span>
  “Use skill-creator to help me make a new skill”
</div>
</div>

</div>

<div class="footnote">
  Screenshot from claude.ai, October 2026. Claude Code command from the README of github.com/anthropics/claude-plugins-official. The same skill is also in github.com/anthropics/skills (<code>example-skills</code> plugin).
</div>

<style>
.col-head { font: 700 11px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--clay-ink); margin-bottom: 8px; }
.test-it {
  margin-top: 14px;
  background: var(--amber-soft); border: 1.5px solid var(--amber);
  border-radius: 12px; padding: 8px 12px; font-size: 13.5px;
}
.test-it span { display: block; font: 700 9.5px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--amber-ink); }
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.8rem;
  border-top: 1px solid var(--line); padding-top: 6px;
  font-size: 10px; line-height: 1.45; color: var(--muted);
}
.footnote code { font-size: .95em !important; padding: 0 .25em !important; }
</style>

<!--
Claude app: it's often already there under "Yours" (Anthropic's example skill). If not, Add the official plugin.
Claude Code: one /plugin install command. If the official marketplace isn't set up yet, add it first.
Have everyone run the "check it works" prompt before moving on.
-->

---

<div class="eyebrow">skill-creator · why</div>

# You know what a good skill needs. That's a lot of work.

<div class="pairs">
  <div class="ph">What you learned today</div><div></div><div class="ph sc">What skill-creator does for you</div>
  <div v-click="1" class="l">Write a sharp <b>description</b>: what + when</div>
  <div v-click="1" class="arrow">→</div>
  <div v-click="1" class="r">Interviews you, writes it, then <b>tests whether it triggers</b></div>
  <div v-click="2" class="l">Keep SKILL.md lean; put exact work in <code>scripts/</code></div>
  <div v-click="2" class="arrow">→</div>
  <div v-click="2" class="r">Drafts the folder; <b>bundles a script</b> when every test run rewrites the same helper</div>
  <div v-click="3" class="l">Check the skill <b>actually helps</b></div>
  <div v-click="3" class="arrow">→</div>
  <div v-click="3" class="r">Runs each test prompt <b>with and without</b> the skill, side by side</div>
  <div v-click="4" class="l">Make sure it works beyond your 3 examples</div>
  <div v-click="4" class="arrow">→</div>
  <div v-click="4" class="r">Improves by <b>generalising and explaining why</b>, not by piling on rules</div>
</div>

<style>
.pairs { display: grid; grid-template-columns: 1fr 40px 1.15fr; row-gap: 10px; column-gap: 6px; margin-top: 1.2rem; align-items: center; }
.ph { font: 700 10.5px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
.ph.sc { color: var(--clay-ink); }
.l, .r { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 9px 13px; font-size: 14px; box-shadow: var(--shadow); }
.r { border-left: 4px solid var(--clay); border-radius: 0 12px 12px 0; }
.arrow { text-align: center; font-size: 22px; color: var(--clay); }
</style>

<!--
Each row: something they learned the hard way today, and the part of skill-creator that does it for them.
-->

---
clicks: 7
---

<div class="eyebrow">skill-creator · what it is</div>

# skill-creator is just a skill, too

<div class="grid grid-cols-[2fr_1fr] gap-6 mt-3 items-start">

<SkillFolder folder="skill-creator" folder-note="from github.com/anthropics/skills" :entries="[
  { name: 'SKILL.md', kind: 'required', at: 1, note: 'the whole loop, in plain English' },
  { name: 'agents/', kind: 'optional', at: 2, color: 'indigo', note: 'grader · comparator · analyzer' },
  { name: 'scripts/', kind: 'optional', at: 3, color: 'teal', note: 'run tests, benchmark, tune, package' },
  { name: 'eval-viewer/', kind: 'optional', at: 4, color: 'rose', note: 'review page for you' },
  { name: 'references/', kind: 'optional', at: 5, color: 'indigo', note: 'data formats' },
]" />

<div>
  <div v-click="6" class="card">
    <b style="font-family:'Space Grotesk'">Look familiar? 👀</b>
    <p class="text-sm mt-2">Same shape as our <code>delivery-fee</code>: a <b>SKILL.md</b> that says what to do, plus <b>scripts</b> for the parts that must be exact.</p>
  </div>
  <div v-click="7" class="card mt-4">
    <b style="font-family:'Space Grotesk'">Its description</b>
    <p class="text-xs mt-2" style="font-family:'JetBrains Mono';line-height:1.5">Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch…</p>
  </div>
</div>

</div>

<!--
Open the real folder on GitHub if you have time. SKILL.md is about 480 lines of plain Markdown — students can read it.
The agents/ files are instructions for helper agents: one grades outputs, one compares two versions blind, one explains why a version won.
-->

---
clicks: 8
---

<div class="eyebrow">skill-creator · the loop</div>

# What it does: draft → test → review → improve

<SkillCreatorLoop class="mt-3" />

<!--
1 Interview: what should it do, when should it trigger, what should the output look like, do we want test cases?
2 Draft: writes SKILL.md (and scripts if needed).
3 Test: runs 2–3 realistic prompts, each WITH the skill and WITHOUT it.
4 Review: you look at the outputs side by side in a review page and type feedback. Empty feedback = "looks good".
5 Improve: Claude rewrites the skill — generalising, not overfitting.
6 Repeat until you're happy.
7–8 Optional extras: tune the description for triggering, then package it as a .skill file.
-->

---
clicks: 5
---

<div class="eyebrow">skill-creator · step 1–2</div>

# It starts by interviewing you

<div class="grid grid-cols-[1.25fr_1fr] gap-8 mt-2 items-center">

<ChatMock title="Claude Code · skill-creator" height="370px" :messages="[
  { role: 'user', text: 'Use skill-creator: I want a skill that checks leave requests against our HR rules.', at: 0, copy: true },
  { role: 'ai', text: 'Sure! A few questions first: What are the rules? When should it be used? What should the answer look like? Shall we set up test cases?', at: 1 },
  { role: 'user', text: 'Max 3 days in a row without a cover person, no leave during Songkran week. Answer: approve / needs info / reject.', at: 2, copy: true },
  { role: 'ai', text: 'Draft SKILL.md written ✓ Here are 3 test prompts — do these look right?', at: 3 },
  { role: 'ai', text: 'Running each prompt with and without the skill…', at: 4 },
]" />

<div class="steps">
  <div v-click="1"><b>1</b> It asks <span class="g">what · when · output · tests?</span></div>
  <div v-click="2"><b>✍️</b> <span>You bring the <span class="g">private knowledge</span>: only you know the rules</span></div>
  <div v-click="3"><b>2</b> It writes the draft and proposes <span class="g">realistic test prompts</span></div>
  <div v-click="4"><b>3</b> It starts testing: <span class="g">with vs without</span></div>
  <div v-click="5" class="path">tip: point it at an existing skill to improve it — the old version becomes the baseline</div>
</div>

</div>

<!--
The interview is the most valuable part for beginners: it asks the questions they wouldn't think to answer.
If the conversation already shows the workflow ("turn this into a skill"), it pulls the answers from the chat history first.
-->

---
clicks: 6
---

<div class="eyebrow">skill-creator · step 3–4</div>

# Proof, not vibes: with skill vs without

<ABTest class="mt-4" />

<!--
Illustrative numbers, using our delivery-fee skill.
1 Two or three realistic test prompts.
2 Each one runs twice at the same time: once with the skill, once without (the baseline).
3 Outputs come back.
4 A grader checks each output against simple pass/fail checks.
5 Benchmark: pass rate (plus time and tokens) for each version.
6 YOU review the outputs in a browser page and type feedback. That feedback drives the next round.
-->

---
clicks: 5
---

<div class="eyebrow">skill-creator · evals</div>

# What is an eval?

<div class="grid grid-cols-[1fr_1.05fr] gap-6 mt-1 items-start">

<div class="vocab">
  <div v-click="1"><b>Eval</b> One realistic test prompt, the kind a real user would type (plus any input files).</div>
  <div v-click="2"><b>Assertion</b> A yes/no check on the answer, e.g. “States the fee is 107 baht”.</div>
  <div v-click="3"><b>Baseline</b> The same prompt <i>without</i> the skill (or with the old version), to compare against.</div>
  <div v-click="4"><b>Grader</b> Reads each answer and marks every assertion pass ✓ / fail ✗, with evidence.</div>
  <div v-click="5"><b>Iteration</b> One round: run all evals → you review → improve the skill → run again.</div>
</div>

<div>

```jsonc
// delivery-fee/evals/evals.json — skill-creator writes this for you
{
  "skill_name": "delivery-fee",
  "evals": [
    {
      "id": 0,
      "prompt": "How much is delivery for a 300 baht order, 12.5 km away, on Tuesday?",
      "expected_output": "Quotes 107 baht using the script",
      "files": [],
      "expectations": [
        "States the delivery fee is 107 baht",
        "Ran scripts/calc_fee.py instead of doing the math itself",
        "Says delivery takes 2–3 days"
      ]
    }
  ]
}
```

</div>
</div>

<div class="run-it" v-copy="'Use skill-creator to run evals on my delivery-fee skill: write 3 realistic test prompts, run each with and without the skill, grade them, and open the review page.'">
  <span>How to run it · just ask</span>
  “Use skill-creator to run evals on my delivery-fee skill: write 3 realistic test prompts, run each with and without the skill, grade them, and open the review page.”
</div>

<style>
.vocab { display: flex; flex-direction: column; gap: 5px; }
.vocab > div {
  background: var(--surface); border: 1px solid var(--line); border-left: 4px solid var(--indigo);
  border-radius: 0 10px 10px 0; padding: 5px 11px; font-size: 12px; line-height: 1.35; box-shadow: var(--shadow);
}
.vocab b { display: block; font: 700 13px 'Space Grotesk', sans-serif; color: var(--indigo-ink); }
.slidev-code { font-size: 0.62rem !important; line-height: 1.5 !important; }
.run-it {
  margin-top: 8px;
  background: var(--amber-soft); border: 1.5px solid var(--amber);
  border-radius: 12px; padding: 6px 12px; font-size: 12px;
}
.run-it span { display: block; font: 700 9.5px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--amber-ink); }
</style>

<!--
Five words, then the file. Stress: you don't write the JSON by hand — skill-creator drafts the prompts and checks, you approve them.
Good assertions are objectively checkable: a number, a word, a file, a step that ran. Taste and style you judge yourself in the review page.
In Claude Code skill-creator runs with- and without-skill in parallel. In the Claude app it runs prompts one by one and skips the baseline.
-->

---
clicks: 6
---

<div class="eyebrow">skill-creator · benchmark</div>

# Reading the benchmark: the summary

<BenchCallouts class="mt-1" :cols="3" :callouts="[
  { key: 'meta', title: 'What was tested', text: 'Skill, date and which evals ran. Here: 3 evals × 1 run each.', tone: 'info' },
  { key: 'pass', title: 'Pass rate: the main number', text: 'Share of checks that passed, averaged over runs. 100% = every check passed.', tone: 'good' },
  { key: 'spread', title: '± = how much runs differ', text: 'Typical distance from the average (std dev). 20.2 ± 4.6 s → most runs took 16–25 s. Big ± = unsteady results.', tone: 'warn', each: true },
  { key: 'time', title: 'Time (s)', text: 'Seconds per run. ~12 s slower with the skill, because it runs calc_fee.py.', tone: 'info' },
  { key: 'tokens', title: 'Tokens = cost', text: 'Text Claude read and wrote. +3,467 per answer is the price of using the skill.', tone: 'info' },
  { key: 'delta', title: 'Delta = with − without', text: '+0.89 = 89 points better with the skill. Worth the extra time and tokens? Here: yes.', tone: 'good' },
]">
<div class="bench">
<div class="bench-title">Benchmark Results</div>
<div class="bench-meta"><span data-co="meta"><b>delivery-fee</b> — 2026-10-17 — Evals: 0, 1, 2 — 3 runs per configuration</span></div>
<table>
<thead><tr><th>Metric</th><th>With skill</th><th>Without skill</th><th data-co="delta">Delta</th></tr></thead>
<tbody>
<tr data-co="pass"><td>Pass rate</td><td>100% <span data-co="spread">± 0%</span></td><td>11% <span data-co="spread">± 19%</span></td><td data-co="delta" class="pos">+0.89</td></tr>
<tr data-co="time"><td>Time (s)</td><td>20.2 <span data-co="spread">± 4.6</span></td><td>7.9 <span data-co="spread">± 0.8</span></td><td data-co="delta" class="pos">+12.4s</td></tr>
<tr data-co="tokens"><td>Tokens</td><td>5366.7 <span data-co="spread">± 1115.0</span></td><td>1900.0 <span data-co="spread">± 200.0</span></td><td data-co="delta" class="pos">+3467</td></tr>
</tbody>
</table>
</div>
</BenchCallouts>

<div class="footnote">
  Redrawn from skill-creator's review page (<code>eval-viewer/generate_review.py</code>) with its <code>aggregate_benchmark.py</code> output. Sample data for teaching; your numbers will differ.
</div>

<style>
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.8rem;
  border-top: 1px solid var(--line); padding-top: 6px;
  font-size: 10px; line-height: 1.45; color: var(--muted);
}
.footnote code { font-size: .95em !important; padding: 0 .25em !important; }
.bench td [data-co~=spread] { margin-left: 5px; }
.slidev-layout .bench td { padding-top: 6px; padding-bottom: 6px; }
</style>

<!--
Read it top to bottom: what ran → pass rate → how stable → what it costs → the difference.
The one-line verdict: "Pass rate went from 11% to 100% for ~12 seconds and ~3.5k tokens more per answer."
Note: the header says "3 runs per configuration" — that's 3 evals × 1 run each in this sample.
± is the standard deviation over ALL runs of that column (every eval, every repeat pooled; aggregate_benchmark.py). Rule of thumb: about 2 in 3 runs fall within average ± that number.
Pass-rate ± is a hint of flakiness, but because evals are pooled it also grows when some evals are simply harder than others. To check real flakiness, repeat each eval 3× and look at that eval on its own (next slide: 3/3 vs 1/3).
-->

---
clicks: 5
---

<div class="eyebrow">skill-creator · benchmark</div>

# Reading the benchmark: which checks matter

<BenchCallouts class="mt-1" :cols="3" :callouts="[
  { key: 'helps', title: '✓ with, ✗ without', text: 'The skill clearly adds value: it knows what the baseline can’t.', tone: 'good' },
  { key: 'weak', title: '✓ in both = weak check', text: 'It can’t tell the versions apart. Swap it for a check only a correct answer passes.', tone: 'warn' },
  { key: 'notes', title: 'Analysis notes', text: 'skill-creator flags what averages hide: weak checks, flaky evals, cost trade-offs.', tone: 'info' },
]">
<div class="bench bench-split">
<div>
<div class="bench-eval">eval · <b>sunday-refusal</b> <span>with 100% (3/3) · without 33% (1/3)</span></div>
<table>
<thead><tr><th>Assertion</th><th>With skill</th><th>Without skill</th></tr></thead>
<tbody>
<tr data-co="helps"><td>Says there is no delivery on Sunday</td><td class="ok">✓</td><td class="no">✗</td></tr>
<tr data-co="helps"><td>Suggests Monday instead</td><td class="ok">✓</td><td class="no">✗</td></tr>
<tr data-co="weak"><td>Reply is polite and short</td><td class="ok">✓</td><td class="ok">✓</td></tr>
</tbody>
</table>
</div>
<div class="bench-notes" data-co="notes">
<div class="bench-notes-title">Analysis notes</div>
<ul>
<li>“Reply is polite and short” passes in both configurations — it doesn’t show the skill’s value</li>
<li>Without the skill every fee question gets a guessed number (106 ฿, 54 ฿, 40 ฿)</li>
<li>Skill adds ~12 s and ~3,500 tokens per answer but lifts pass rate from 11% to 100%</li>
<li>Only 1 run per eval — run 3× before trusting small differences</li>
</ul>
</div>
</div>
</BenchCallouts>

<div class="flags-row">
  <div v-click="4" class="flags"><b>Red flags</b> ✗ in both → check is broken or task too hard · ✗ with but ✓ without → the skill is <b>hurting</b> · big ± → flaky, run 3× · 1–2 evals → too few to trust</div>
  <div v-click="5" class="habit"><b>Your habit for every new skill</b> 3 realistic prompts · 1–3 checks each · run with vs without · read the delta · fix and re-run</div>
</div>

<style>
.flags-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.flags, .habit { border-radius: 10px; padding: 7px 11px; font-size: 11.5px; line-height: 1.45; }
.flags { background: var(--rose-soft); border: 1.5px solid var(--rose); }
.habit { background: var(--teal-soft); border: 1.5px solid var(--teal); }
.flags > b:first-child, .habit > b:first-child { display: block; font: 700 10px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
.flags > b:first-child { color: var(--rose-ink); }
.habit > b:first-child { color: var(--teal-ink); }
</style>

<!--
The per-assertion table is where you learn to write better checks.
"Reply is polite and short" passes with AND without the skill, so it proves nothing about the skill.
Close with the habit: every new or changed skill gets evals before you share it.
-->

---
clicks: 6
---

<div class="eyebrow">skill-creator · speed</div>

# Evals taking 20 minutes? Shrink the formula

<SpeedUpEvals class="mt-2" />

<div v-click="6" class="fast-row">
  <div class="fast" v-copy="'Use skill-creator in quick mode: use only 2 test prompts this round, run every with-skill and baseline run in parallel in one turn, reuse the round-1 baseline instead of re-running it, grade with a script where possible, and skip the analysis notes and description tuning until the final round.'">
    <span>Quick-mode prompt · copy</span>
    “Use skill-creator in quick mode: 2 test prompts, all runs in parallel in one turn, reuse the round-1 baseline, grade with a script, skip analysis + description tuning until the final round.”
  </div>
  <div class="fast" v-copy="'python -m scripts.run_loop --eval-set trigger-evals.json --skill-path <path-to-skill> --model <model-id> --runs-per-query 1 --max-iterations 2 --num-workers 20'">
    <span>Faster trigger tuning · copy</span>
    <code>run_loop …</code><br><code>‑‑runs‑per‑query 1 ‑‑max‑iterations 2 ‑‑num‑workers 20</code>
  </div>
</div>

<div class="footnote">
  Fewer prompts and repeats = <b>less certainty</b>: use quick mode while iterating, then run the full set (3 runs, fresh baseline) before you trust or share the numbers.
  Defaults from skill-creator's <code>run_eval.py</code> / <code>run_loop.py</code>: runs-per-query 3 · num-workers 10 · max-iterations 5 · timeout 30 s. “Launch all runs in the same turn” and “grade with a script” come from its SKILL.md.
</div>

<style>
.fast-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; margin-top: 12px; }
.fast {
  background: var(--amber-soft); border: 1.5px solid var(--amber);
  border-radius: 12px; padding: 7px 12px; font-size: 12px; line-height: 1.4;
}
.fast span { display: block; font: 700 9.5px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: var(--amber-ink); margin-bottom: 2px; }
.fast code { font-size: 11px !important; background: none !important; border: none !important; padding: 0 !important; }
.footnote {
  position: absolute; left: 3.5rem; right: 3.5rem; bottom: 0.8rem;
  border-top: 1px solid var(--line); padding-top: 6px;
  font-size: 10px; line-height: 1.45; color: var(--muted);
}
.footnote b { color: var(--ink); }
.footnote code { font-size: .95em !important; padding: 0 .25em !important; }
</style>

<!--
Why is it slow? Every eval runs twice (with + without), maybe 3 times each, each run is a full Claude task, then each answer is graded.
Waiting time is roughly: evals × versions × repeats × time per run ÷ how many run at the same time.
Shrink any factor and the wait shrinks:
1 Fewer evals per round (2–3), the full set only at the end. Re-run only what changed or failed.
2 For a NEW skill, the baseline (no skill) never changes between rounds — reuse round 1's answers instead of re-running them. Re-run it once at the end.
3 One run per prompt while drafting; three before you trust a number. For trigger tuning, --runs-per-query 1.
4 Cheaper runs: small inputs, short answers, a lean SKILL.md (big skills are slow because every run reads them), and grade with a script — skill-creator's SKILL.md says scripts are faster and reusable.
5 Parallel: Claude Code can run all with/without runs in one turn (skill-creator's own rule). The Claude app runs them one by one — use Claude Code for big skills.
Trade-off: less data = less certainty. Quick mode for iterating, full mode before you share.
-->

---

<div class="eyebrow">skill-creator · why it really helps</div>

# Four reasons it beats writing by hand

<div class="why">
  <div v-click class="w"><span>📏</span><b>Measured, not guessed</b><p>Every version is compared with a baseline, so you <i>know</i> the skill helps.</p></div>
  <div v-click class="w"><span>🧑‍⚖️</span><b>You stay the judge</b><p>A review page shows each output side by side. Your comments drive the next round.</p></div>
  <div v-click class="w"><span>🌍</span><b>Built to generalise</b><p>It explains the <i>why</i> instead of shouting ALWAYS / NEVER, so the skill works on prompts it never saw.</p></div>
  <div v-click class="w"><span>♻️</span><b>Spots repeated work</b><p>If every test run writes the same helper, it moves that into <code>scripts/</code>, like our <code>calc_fee.py</code>.</p></div>
</div>

<style>
.why { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 1.6rem; }
.w { background: var(--surface); border: 1px solid var(--line); border-top: 5px solid var(--clay); border-radius: 14px; padding: 12px 13px; box-shadow: var(--shadow); }
.w span { font-size: 24px; }
.w b { display: block; font: 700 15px 'Space Grotesk', sans-serif; margin: 6px 0 4px; }
.w p { font-size: 12.5px; line-height: 1.45; color: var(--muted); margin: 0; }
</style>

---
clicks: 5
---

<div class="eyebrow">skill-creator · optional extra</div>

# Will it trigger? Measured, not guessed

<TriggerEval class="mt-3" />

<!--
Callback to the Lab 0 checkpoint, where we guessed whether a prompt would trigger the skill.
skill-creator turns that into a test: ~20 realistic prompts, half should trigger, half are near-misses that should NOT.
The near-misses matter most: "Grab to the airport" mentions a fare and a distance, but it isn't our delivery fee.
It holds back 40% of the prompts as a test set and picks the description with the best TEST score, so it doesn't just memorise.
Scores on this slide are illustrative.
-->

---

<div class="eyebrow">skill-creator · where it runs</div>

# Install it, and know the difference

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="card">

### Claude Code · full loop

```bash
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

<ul class="text-sm mt-2">
  <li>Runs tests <b>in parallel</b>, with and without the skill</li>
  <li>Benchmark + review page</li>
  <li>Description tuning (uses <code>claude -p</code>)</li>
</ul>

</div>

<div class="card">

### Claude app · lighter loop

<p class="text-sm">Already available on paid plans.</p>

<ul class="text-sm mt-2">
  <li>Interview, draft, and run test prompts <b>one by one</b></li>
  <li>Feedback in the chat instead of a review page</li>
  <li>No baseline benchmark or description tuning</li>
  <li>Can still package a <code>.skill</code> file to download</li>
</ul>

</div>
</div>

<!--
Source: github.com/anthropics/skills (README and skill-creator/SKILL.md). The Claude app has no helper agents, so the side-by-side baseline and benchmark are skipped there.
-->

---

<div class="eyebrow">Lab 3 · 20 min</div>

# Build one with skill-creator

<div class="grid grid-cols-[1.2fr_1fr] gap-6 mt-3">

<div class="lab-steps">
  <div v-click><b>1</b> Install it (previous slide) and start a new session</div>
  <div v-click v-copy="'Use skill-creator to make a skill that '"><b>2</b> Ask: <code>Use skill-creator to make a skill that &lt;a rule your team keeps asking about&gt;</code></div>
  <div v-click><b>3</b> Answer the interview. Approve 2–3 test prompts</div>
  <div v-click><b>4</b> Review the outputs. Write <b>one</b> piece of feedback</div>
  <div v-click><b>5</b> Compare its SKILL.md with the ones you wrote by hand</div>
</div>

<div class="card">
  <b style="font-family:'Space Grotesk'">Or improve one of ours</b>

```text
Use skill-creator to improve
demos/demo-1/expense-check.
Add a rule: hotel max 2,500 baht/night.
```

  <p class="text-sm mt-2">The current version becomes the <b>baseline</b>. Did the new one actually get better?</p>
</div>

</div>

<style>
.lab-steps { display: flex; flex-direction: column; gap: 12px; font-size: 15px; }
.lab-steps > div > b:first-child {
  display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 8px;
  background: var(--clay); color: white; font: 700 12px 'Space Grotesk'; margin-right: 8px;
}
</style>

<!--
Good first skills: something with private rules (like Demo 1) — that's where the with/without comparison shows the clearest difference.
-->

---
layout: center
class: text-center
---

<div class="quote">
<span class="h">You</span> bring the knowledge and the judgement.<br>
<span class="h">skill-creator</span> brings the writing, testing and measuring.
</div>

<style>
.quote { font: 600 2rem/1.35 'Space Grotesk', sans-serif; letter-spacing: -0.02em; }
.quote .h { color: var(--clay); }
</style>

---

<div class="eyebrow">recap</div>

# Three demos, one new idea each

| | **Demo 0 · `emoji-only`** | **Demo 1 · `expense-check`** | **Demo 2 · `delivery-fee`** |
|---|---|---|---|
| **What it shows** | A skill steers behaviour | A skill holds private rules | A skill runs real code |
| **New gap filled** | Memory across chats | Private knowledge | Running real code |
| **Files** | `SKILL.md` | `SKILL.md` | `SKILL.md` + `scripts/calc_fee.py` |
| **Body** | One instruction | A rulebook + reply format | Steps + when to run the script |
| **Demo input** | “Emoji mode: how was your weekend?” | Dinner receipt with wine, no receipt | “12.5 km, 300 ฿, Tuesday?” |
| **The aha** | Written once, works in every chat | No LLM knows your 800 ฿ cap | Exact 107 ฿, every time |
| **Difficulty** | ⭐ | ⭐⭐ | ⭐⭐⭐ |

---
clicks: 4
---

<div class="eyebrow">recap</div>

# Which gaps did we close?

<GapMatrix class="mt-4" />

<!--
Click per column. Demo 0 → memory + consistency. Demo 1 adds private knowledge + procedure. Demo 2 adds real code — all five.
-->

---

<div class="eyebrow">take home</div>

# Five things to remember

<div class="remember">
  <div v-click><b>1</b> A skill is a <b>folder</b> with a <code>SKILL.md</code>.</div>
  <div v-click><b>2</b> <code>SKILL.md</code> = <b>frontmatter</b> (name, description) + <b>Markdown body</b>.</div>
  <div v-click><b>3</b> The <b>description</b> decides when it's used: say <i>what</i> + <i>when</i>.</div>
  <div v-click><b>4</b> Loading is lazy: descriptions → body → files &amp; scripts. <b>Model asks, agent fetches.</b></div>
  <div v-click><b>5</b> Put anything that must be <b>exact</b> in a script.</div>
</div>

<style>
.remember { display: flex; flex-direction: column; gap: 14px; margin-top: 1.6rem; font-size: 1.15rem; }
.remember b:first-child {
  display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 10px;
  background: var(--clay); color: white; font: 700 15px 'Space Grotesk'; margin-right: 12px;
}
</style>

---

<div class="eyebrow">your next skill</div>

# Start from this template

<div class="grid grid-cols-[1.2fr_1fr] gap-8 mt-4 items-start">

```md
---
name: my-skill
description: <What it does>. Use when <the situation
  or words that should trigger it>.
---

# <Title>

## Rules
- <the things only your team knows>

## Steps
1. <what to do first>
2. <run scripts/my_tool.py if it must be exact>

## Reply format
<exactly how the answer should look>
```

<div class="card">
  <b style="font-family:'Space Grotesk'">Good first candidates</b>
  <ul class="text-sm mt-2">
    <li>A prompt you paste every week</li>
    <li>A policy people keep asking about</li>
    <li>A report with a fixed format</li>
    <li>A calculation that must be exact</li>
  </ul>
</div>

</div>

---
layout: center
class: text-center
---

<h1 style="font-size:3.4rem">🙏 Thank you</h1>

<p style="color:var(--muted);font-size:1.2rem">Questions? Let's build your first skill together.</p>

<div class="mt-8" style="font: 600 13px 'JetBrains Mono', monospace; color: var(--muted)">github.com/anuchito/course-agent-skills-in-action</div>
