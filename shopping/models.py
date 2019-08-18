from decimal import Decimal

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext


class Shop(models.Model):
    name = models.CharField(_('name'), max_length=150, db_index=True)
    address_line_1 = models.CharField(_('address line 1'), max_length=300)
    address_line_2 = models.CharField(_('address line 2'), max_length=300, blank=True)
    city = models.CharField(_('city'), max_length=150)
    zip_code = models.CharField(_('zip code'), max_length=15)

    def __str__(self):
        return gettext("%(name)s at %(full_address)s") % {
            'name': self.name,
            'full_address': self.get_full_address(),
        }

    def get_full_address(self):
        return f'{self.address_line_1}, {self.address_line_2}, {self.city}, {self.zip_code}, Canada'


class Product(models.Model):
    name = models.CharField(_('name'), max_length=150, db_index=True)
    is_liquid = models.BooleanField(_('is liquid'), help_text=_('is the product a liquid or not?'), default=False)

    def __str__(self):
        return self.name


class ProductListing(models.Model):
    price_kg = models.DecimalField(_('price per kilogram'), max_digits=15, decimal_places=2)
    price_l = models.DecimalField(_('price per liter'), max_digits=15, decimal_places=2, blank=True, null=True)
    product = models.ForeignKey('Product', verbose_name=_('product'),
                                related_name='product_listings', on_delete=models.CASCADE)
    shop = models.ForeignKey('Shop', verbose_name=_('product'),
                             related_name='product_listings', on_delete=models.CASCADE)

    def __str__(self):
        return gettext("%(product_name)s at %(shop_name)s") % {
            'product_name': self.product.name,
            'shop_name': self.shop.name,
        }

    @property
    def price_lb(self):
        return self.price_kg / Decimal('0.45359237')

    @property
    def price_gal(self):
        if not self.price_l:
            return None
        return self.price_l / Decimal('0.26417')
