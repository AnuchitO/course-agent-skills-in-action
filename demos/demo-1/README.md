# Demo 1 — expense-check

**Idea:** a plain LLM doesn't know *your* rules, so it guesses. A skill hands it the rulebook.

## Step A — without the skill
Ask: `Will this be reimbursed? Client dinner, 2 people: food 1,600 baht, 2 glasses of wine 400 baht, total 2,000 baht, no receipt.`
Notice it can only give generic advice — it doesn't know the 800-baht cap or the no-alcohol rule.

## Step B — with the skill
Paste these one at a time:

| Claim | Expected verdict |
|---|---|
| The dinner above | ⚠️ Needs fixing — wine not allowed (rule 2), receipt needed over 1,000 (rule 3); reimbursable 1,600 baht once a receipt is attached |
| `Grab to client office, 180 baht, receipt attached, dated last week` | ✅ OK to submit |
| `Rental car for 2 days, 3,500 baht, receipt attached, no approval` | ⚠️ Needs manager approval (rule 4) |
| `Team lunch, 5 people, 4,500 baht, receipt from 45 days ago` | ❌ Over 800/person (rule 1) and older than 30 days (rule 5) |

## Your turn
Change one rule (e.g. meal cap 1,000 baht) and re-run the dinner. The answer follows your edit.
