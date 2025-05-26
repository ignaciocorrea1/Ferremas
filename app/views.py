import requests
from paths import *
from django.shortcuts import render, redirect
from django.http import HttpResponseNotAllowed, JsonResponse

# Create your views here.
def index(request):
    context = {}
    return render(request, INDEX_TEMPLATE, context)

def catalogo(request):
    # Se obtienen los productos
    url = RUTA_API + "productos/"
    response = requests.get(url)
    
    # Si hay productos
    if response.status_code == 200:
        productos = response.json()
        context = {
            "productos": productos
        }
        return render(request, CATALOGO_TEMPLATE, context)
    # Si no hay productos
    elif response.status_code == 404:
        context = {
            "mensaje": "No hay productos actualmente"
        }
        return render(request, CATALOGO_TEMPLATE, context)
    # Si ocurre algún error
    else:
        context = {
            "mensaje": "No hay productos actualmente"
        }
        return render(request, CATALOGO_TEMPLATE, context)

def producto(request):
    context = {}
    return render(request, VER_PRODUCTO_TEMPLATE, context)

def iniciarPago(request):
    context = {}
    return render(request, INICIAR_PAGO_TEMPLATE, context)

def pago_exitoso(request):
    estado = request.GET.get("estado", "error")
    return render(request, PAGO_EXITOSO_TEMPLATE, {"estado": estado})

def resultado_pago(request):
    estado = request.GET.get("estado", "error")
    return render(request, PAGO_REULTADO_TEMPLATE, {"estado": estado})