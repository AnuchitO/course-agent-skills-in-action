"""Delivery fee calculator for our shop.

Rules:
  - No delivery on Sundays.
  - Orders over 500 baht ship free.
  - Otherwise: 40 baht base, plus 7 baht per km after the first 3 km,
    rounded up to the next whole baht.
"""
import argparse
import math

BASE_FEE = 40
FREE_KM = 3
PER_KM = 7
FREE_OVER = 500

parser = argparse.ArgumentParser()
parser.add_argument("--km", type=float, required=True)
parser.add_argument("--order", type=float, required=True)
parser.add_argument("--day", required=True)
args = parser.parse_args()

if args.day.strip().lower().startswith("sun"):
    print("NO_DELIVERY: we don't deliver on Sundays")
elif args.order > FREE_OVER:
    print(f"distance={args.km:g} km, fee=0 baht (free: order over {FREE_OVER} baht)")
else:
    fee = math.ceil(BASE_FEE + max(0, args.km - FREE_KM) * PER_KM)
    print(f"distance={args.km:g} km, fee={fee} baht")
