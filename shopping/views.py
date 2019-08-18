from decimal import Decimal

from django.http import JsonResponse
from django.views import View

from shopping.utils import convert_weight, convert_volume


class PriceHelperView(View):
    def get(self, request):
        price = request.GET.get('price', None)
        if not price:
            return JsonResponse(
                {'error': 'price is a required query parameter'},
                status=400
            )
        weight_values, volume_values = dict(), dict()
        weight_values['kg'] = request.GET.get('kg', default=None)
        weight_values['g'] = request.GET.get('g', default=None)
        weight_values['lbs'] = request.GET.get('lbs', default=None)
        volume_values['L'] = request.GET.get('L', default=None)
        volume_values['gal'] = request.GET.get('gal', default=None)

        values = list(weight_values.values())
        values.extend(volume_values.values())
        if not any(values):
            return JsonResponse(
                {'error': 'one of (kg, g, lbs, l, gal) needs to be defined'},
                status=400,
            )

        weight_ratio = None
        for k, v in weight_values.items():
            if v:
                weight_ratio = Decimal(str(price)) / Decimal(str(v)), k
                break
        volume_ratio = None
        for k, v in volume_values.items():
            if v:
                volume_ratio = Decimal(str(price)) / Decimal(str(v)), k
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
        # here we check if we have volume information
        if volume_ratio:
            data = {
                'L': f"{volume_ratio[0]:.2f} $/L" if volume_ratio[1] == 'L'
                else f"{convert_volume(volume_ratio[0], volume_ratio[1], 'L'):.2f} $/L",
                'gal': f"{volume_ratio[0]:.2f} $/gal" if volume_ratio[1] == 'gal'
                else f"{convert_volume(volume_ratio[0], volume_ratio[1], 'gal'):.2f} $/gal",
            }
            response_data.update(data)
        return JsonResponse(response_data)
