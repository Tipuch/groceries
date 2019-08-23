from django.contrib import admin

from .models import Shop, VegetableSpecies, Vegetable, ProductListing


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    pass


@admin.register(VegetableSpecies)
class VegetableSpeciesAdmin(admin.ModelAdmin):
    pass


@admin.register(Vegetable)
class VegetableAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductListing)
class ProductListingAdmin(admin.ModelAdmin):
    pass
