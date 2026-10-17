---
name: delivery-fee
description: Quote our shop's delivery fee for an order. Use when a customer asks how much delivery costs, how far we deliver, or whether delivery is free.
---

# Delivery Fee Quoter

Follow these steps **in order**. Never do the fee math yourself.

1. Find the distance in km, the order total in baht, and the delivery day.
   If any of them is missing, ask the customer for it.
2. Run the calculator:

   ```bash
   python3 scripts/calc_fee.py --km <distance> --order <total> --day <day>
   ```

3. Reply with exactly what the script printed, using this format:

   **Distance:** … km
   **Delivery fee:** … baht
   **Arrives:** 2–3 days

If the script says we don't deliver that day, apologise and suggest Monday.
