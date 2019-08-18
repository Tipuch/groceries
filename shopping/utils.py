from decimal import Decimal

WEIGHT_UNIT_TABLE = {
    'kg': Decimal('1'),
    'g': Decimal('1000'),
    'lbs': Decimal('2.204623'),
}

VOLUME_UNIT_TABLE = {
    'L': Decimal('1'),
    'gal': Decimal('0.2199692'),
}


def convert_weight(val: Decimal, unit_in: str, unit_out: str):
    return val * WEIGHT_UNIT_TABLE[unit_in] / WEIGHT_UNIT_TABLE[unit_out]


def convert_volume(val: Decimal, unit_in: str, unit_out: str):
    return val * VOLUME_UNIT_TABLE[unit_in] / VOLUME_UNIT_TABLE[unit_out]
