# Facilitator guide — Agent Skills in Action

**Length:** 3 hours (trim the labs to fit 2 hours).
**Audience:** anyone who uses Claude — no programming needed until Demo 2.
**Run the deck:** `cd slide && npm install && npm run dev` · press `P` for presenter mode (speaker notes + next click).

## The story in one line
Feel the pain of re-pasting a prompt → write it down once → learn why that matters (five gaps) → learn the file's shape → see how it loads → build three skills, each adding one idea.

## Agenda

| Time | Section | Slides | What happens |
|---|---|---|---|
| 0:00–0:10 | Welcome | Cover, roadmap | Don't say "skill" yet. |
| 0:10–0:25 | **Act 1 · just a prompt** | Prompt → pain → "write it once" | Do it live. Paste the emoji prompt, then show it drifting and forgetting in a new chat. Ask: "who pastes the same prompt every day?" |
| 0:25–0:40 | **Act 2 · why skills** | 5 gaps, quote | One story per gap. Land the line: *a skill doesn't make Claude smarter, it makes it informed, consistent, reliable.* |
| 0:40–0:55 | **Act 3 · anatomy** | Folder, inside SKILL.md, description | Quick check: is a folder with only SKILL.md a valid skill? (Yes.) Spend time on the description slide — it is the #1 cause of "my skill doesn't work". |
| 0:55–1:10 | **Demo 0 + Act 4 · how it loads** | emoji-only code, progressive disclosure, one-request flow, "asks/fetches/reads" | Have the room say back: *model asks, agent fetches, model reads.* |
| 1:10–1:30 | **Lab 0** | Install & try, "will it trigger?" | Everyone gets emoji-only working. |
| 1:30–1:40 | Break | | |
| 1:40–2:10 | **Demo 1 + Lab 1 · private knowledge** | Plain LLM guesses → SKILL.md → receipt before/after → lab table | Key exercise: change a rule, re-run, watch the answer follow. |
| 2:10–2:50 | **Demo 2 + Lab 2 · real code** | Problem, folder, code, script boundary, full flow, lab | Run the script by hand first, then via Claude. Change `PER_KM` and show the answer change. |
| (+20–30 min) | **Bonus · skill-creator + Lab 3** | Section 3: why, what it is, the loop, interview, with vs without, why it helps, will it trigger, where it runs, Lab 3 | Let Claude build a skill with them. If you only have 3 hours, show the slides (10 min) and set Lab 3 as homework, or cut Lab 2 to 20 min. |
| 2:50–3:00 | Recap & Q&A | Comparison table, gap matrix, takeaways, template | Send people off with the template and one skill idea of their own. |

## Hand-outs
The `demos/` folder is the hand-out. Share it as a zip or the repo link.

```
demos/
├── README.md                     how to install a skill
├── demo-0/emoji-only/SKILL.md
├── demo-1/expense-check/SKILL.md
└── demo-2/delivery-fee/
    ├── SKILL.md
    └── scripts/calc_fee.py
```

Each `demo-N/README.md` has the exact prompts to try and the expected answers.

## Before the session
- [ ] Install all three skills on the presenting machine and test every prompt in the lab tables.
- [ ] Have one chat window **without** skills ready for the "plain LLM" comparisons.
- [ ] Demo 2 needs code execution (Claude Code, or the Claude app with code execution on) and Python 3.
- [ ] Claude app path (Oct 2026): your name → Settings → Capabilities (code execution ON) → Customize → Skills → + Add → Upload skill. A single SKILL.md uploads as-is; folders with scripts need a .zip. Re-check before the session — menus change.
- [ ] For the skill-creator section: in Claude Code run `/plugin marketplace add anthropics/skills` then `/plugin install example-skills@anthropic-agent-skills`, and try one short skill-creator run before the session. In the Claude app it's already there on paid plans, but runs a lighter loop (no side-by-side baseline, benchmark or description tuning).

## Common lab problems
| Symptom | Fix |
|---|---|
| Skill never triggers | Description is vague, or the prompt doesn't match it. Add "Use when…". |
| Skill not found at all | Folder name ≠ `name:`, or the `---` frontmatter isn't on line 1. |
| Old behaviour after editing | Start a new chat. |
| Upload fails in the Claude app | Folder name ≠ `name:`, no `SKILL.md` inside the zip, or invalid characters in name/description. |
| Demo 2 does math itself | Body must say "Never do the fee math yourself" and code execution must be on. |
| Emoji show as boxes | Terminal font — use the chat app. |
