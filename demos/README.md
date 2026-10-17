# Workshop demos

Three skills, each adding **one** new idea.

| Folder | Skill | New idea | Files |
|---|---|---|---|
| `demo-0/` | `emoji-only` | A skill steers behaviour — write the prompt once | `SKILL.md` |
| `demo-1/` | `expense-check` | A skill carries **private knowledge** (your rules) | `SKILL.md` |
| `demo-2/` | `delivery-fee` | A skill can **run real code** for exact answers | `SKILL.md` + `scripts/calc_fee.py` |

## Install a skill

Each skill is the *inner* folder (e.g. `demo-0/emoji-only/`). The folder name must match the `name:` in its `SKILL.md`.

**Claude Code** — copy the skill folder into one of:

```bash
# personal: available in every project
cp -r demo-0/emoji-only ~/.claude/skills/

# project: shared with everyone who clones the repo
mkdir -p .claude/skills && cp -r demo-0/emoji-only .claude/skills/
```

**Claude app (web / desktop)** — needs a Pro, Max, Team or Enterprise plan.

1. Click your name (bottom-left) → **Settings** (⇧⌘, on a Mac).
2. **Capabilities** → turn on **Cloud code execution and file creation** (the app says it's required for skills).
3. **Customize → Skills → + Add → Upload skill**.
4. Drop the skill's `SKILL.md` straight in — a single `.md` file works — or a `.zip` of the whole folder.
   Skills with extra files (like `delivery-fee` with its script) must be zipped:

```bash
cd demo-2 && zip -r delivery-fee.zip delivery-fee
```

(Menus as of October 2026 — if something looks different, see "Using Skills in Claude" on support.claude.com.)

Then open a **new** chat and try the prompts in each demo's README.
