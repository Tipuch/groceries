from decimal import Decimal

from django.http import JsonResponse
from django.views import View
from rest_framework.viewsets import ReadOnlyModelViewSet

from shopping.models import Vegetable
from shopping.serializers import VegetableSerializer
from shopping.utils import convert_weight


class PriceHelperView(View):
    def get(self, request):
        price = request.GET.get('price', None)
        if not price:
            return JsonResponse(
                {'error': 'price is a required query parameter'},
                status=400
            )
        weight_values = dict()
        weight_values['kg'] = request.GET.get('kg', default=None)
        weight_values['g'] = request.GET.get('g', default=None)
        weight_values['lbs'] = request.GET.get('lbs', default=None)

        values = list(weight_values.values())
        if not any(values):
            return JsonResponse(
                {'error': 'one of (kg, g, lbs) needs to be defined'},
                status=400,
            )

        weight_ratio = None
        for k, v in weight_values.items():
            if v:
                weight_ratio = Decimal(str(price)) / Decimal(str(v)), k
                break

        response_data = dict()
        # here we check if we have weight information
        if weight_ratio:
            data = {
                'kg': f"{weight_ratio[0]:.2f} $/kg" if weight_ratio[1] == 'kg'
                else f"{convert_weight(weight_ratio[0], weight_ratio[1], 'kg'):.2f} $/kg",
                'g': f"{weight_ratio[0]:.2f} $/g" if weight_ratio[1] == 'g'
                else f"{convert_weight(weight_ratio[0], weight_ratio[1], 'g'):.2f} $/g",
                'lbs': f"{weight_ratio[0]:.2f} $/lbs" if weight_ratio[1] == 'lbs'
                else f"{convert_weight(weight_ratio[0], weight_ratio[1], 'lbs'):.2f} $/lbs",
            }
            response_data.update(data)
        return JsonResponse(response_data)


class VegetableViewSet(ReadOnlyModelViewSet):
    serializer_class = VegetableSerializer
    queryset = Vegetable.objects.all()
    limit = 10

    def get_queryset(self):
        queryset = super().get_queryset()
        q = self.request.query_params.get('q')
        is_fruit = self.request.query_params.get('is_fruit') == "true"
        if q:
            queryset = queryset.filter(name__icontains=q)
        if is_fruit:
            queryset = queryset.filter(is_fruit=is_fruit)
        return queryset[:self.limit]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # change formatting for response to prevent security issues
        return JsonResponse(data={"data": response.data})
