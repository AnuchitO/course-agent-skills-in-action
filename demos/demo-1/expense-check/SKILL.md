---
name: expense-check
description: Check an expense claim against our company expense policy and flag anything that won't be reimbursed. Use when someone pastes a receipt, bill, or expense claim before submitting it.
---

# Expense Policy Checker

When the user pastes an expense or receipt, check it against these rules
**in this order**, then reply in the format below.

## Our rules
1. Meals: max 800 baht per person.
2. No alcohol — never reimbursable.
3. A receipt is required for any claim over 1,000 baht.
4. Taxi / Grab: fine. Rental cars: need manager approval.
5. Submit within 30 days of the date on the receipt.

## How to reply

### Verdict
One of: ✅ OK to submit / ⚠️ Needs fixing / ❌ Will be rejected

### Flags
- One line per problem, naming the rule number it breaks.
- If nothing is wrong, write "No issues found."

### Reimbursable total
The amount that WILL be paid after removing anything not allowed, in baht.

Never guess a rule that is not listed here. If something is unclear, ask.
