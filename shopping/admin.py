from django.contrib import admin

from .models import Shop, Vegetable, ProductListing


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    search_fields = ('name', 'line_address_1', 'zip_code', 'city')
    ordering = ('name',)


@admin.register(Vegetable)
class VegetableAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    ordering = ('name',)
    list_filter = ('is_fruit',)


@admin.register(ProductListing)
class ProductListingAdmin(admin.ModelAdmin):
    search_fields = ('vegetable__name', 'shop__name')
    autocomplete_fields = ('vegetable', 'shop')
