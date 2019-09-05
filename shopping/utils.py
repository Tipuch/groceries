from decimal import Decimal

WEIGHT_UNIT_TABLE = {
    'kg': Decimal('1'),
    'g': Decimal('1000'),
    'lbs': Decimal('2.204623'),
}


def convert_weight(val: Decimal, unit_in: str, unit_out: str):
    return val * WEIGHT_UNIT_TABLE[unit_in] / WEIGHT_UNIT_TABLE[unit_out]
