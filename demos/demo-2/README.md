# Demo 2 — delivery-fee

**Idea:** some answers must be *exact*. The skill tells Claude to run a script instead of doing math in its head.
Only the script's **output** enters the conversation, never its code.

> Needs an environment where Claude can run code (Claude Code, or the Claude app with code execution turned on) and Python 3.

## Test the script yourself first
```bash
cd delivery-fee
python3 scripts/calc_fee.py --km 12.5 --order 300 --day Tue   # fee=107 baht
python3 scripts/calc_fee.py --km 12.5 --order 600 --day Tue   # free
python3 scripts/calc_fee.py --km 2    --order 100 --day Sun   # no delivery
```

## Then ask Claude
| Prompt | Expected |
|---|---|
| `How much is delivery for a 300 baht order, 12.5 km away, on Tuesday?` | 107 baht |
| `Same order but it's 600 baht` | Free |
| `Can you deliver 2 km on Sunday?` | No Sunday delivery — suggest Monday |
| `How much is delivery?` | Asks for distance, order total, and day |

Ask the first one twice — you get the same number both times.

## Your turn
Change `PER_KM = 7` to `10` in the script. Ask again. The skill's instructions didn't change, but the answer did.
