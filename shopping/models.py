from decimal import Decimal

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext

from django_countries.fields import CountryField


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


class Vegetable(models.Model):
    name = models.CharField(_('name'), max_length=150)
    is_fruit = models.BooleanField(default=False)

    class Meta:
        index_together = ('name', 'is_fruit')

    def __str__(self):
        return self.name


class ProductListing(models.Model):
    price_kg = models.DecimalField(_('price per kilogram'), max_digits=15, decimal_places=2, blank=True, null=True)
    unit_price = models.DecimalField(_('unit price'), max_digits=15, decimal_places=2, blank=True, null=True)
    rating = models.PositiveIntegerField(_('rating'), validators=[MinValueValidator(1), MaxValueValidator(5)],
                                         help_text=_('between 1 and 5'), blank=True, null=True)
    provenance = CountryField(blank=True)
    vegetable = models.ForeignKey('Vegetable', verbose_name=_('vegetable'),
                                  related_name='product_listings', on_delete=models.CASCADE)
    shop = models.ForeignKey('Shop', verbose_name=_('shop'),
                             related_name='product_listings', on_delete=models.CASCADE)

    def __str__(self):
        return gettext("%(vegetable_name)s at %(shop_name)s") % {
            'vegetable_name': self.vegetable.name,
            'shop_name': self.shop.name,
        }

    @property
    def price_lb(self):
        if not self.price_kg:
            return None
        return self.price_kg / Decimal('0.45359237')

    def clean(self):
        if not (self.price_kg or self.unit_price):
            raise ValidationError(gettext('at least one of "price_kg" or "unit_price" needs to be set.'))
