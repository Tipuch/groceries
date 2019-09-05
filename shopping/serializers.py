from rest_framework import serializers

from .models import Vegetable


class VegetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vegetable
        fields = ['id', 'name', 'is_fruit']
