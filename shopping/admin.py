from django.contrib import admin

from .models import Shop, Product, ProductListing


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductListing)
class ProductListingAdmin(admin.ModelAdmin):
    pass
