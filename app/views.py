import requests
from paths import *
from django.shortcuts import render, redirect
from django.http import HttpResponseNotAllowed

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

def cambiar_divisa(request):
    if request.method == "POST":
        divisa = request.POST.get("divisa")
        
        urlGET = RUTA_API + "valorDolar/"
        
        if divisa == "usd":
            try:
                # Obtencion del valor del dolar
                serie = requests.get(urlGET).json()
                valor_dolar = serie["valor"]
                
                print(f"Enviando PUT a: {RUTA_API}actualizarUSD/")
                
                # Solicitud put para actualizar los precios en la bd
                upd_request = requests.put(
                    f"{RUTA_API}actualizarUSD/",
                    json={"valor": valor_dolar},
                    headers={'Content-Type': 'application/json'}
                )
                upd_request.raise_for_status()

                return redirect("catalogo")
                
            except Exception as e:
                print("Error en cambiar divisa: ", str(e))
                # Redirigir a catálogo incluso si hay error
                return redirect("catalogo")
        else:
            try:
                # Obtencion del valor del dolar
                serie = requests.get(urlGET).json()
                valor_dolar = serie["valor"]
                
                print(f"Enviando PUT a: {RUTA_API}actualizarCLP/")
                
                # Solicitud put para actualizar los precios en la bd
                upd_request = requests.put(
                    f"{RUTA_API}actualizarCLP/",
                    json={"valor": valor_dolar},
                    headers={'Content-Type': 'application/json'}
                )
                upd_request.raise_for_status()

                return redirect("catalogo")
                
            except Exception as e:
                print("Error en cambiar divisa: ", str(e))
                # Redirigir a catálogo incluso si hay error
                return redirect("catalogo")
                
    else:
        return HttpResponseNotAllowed(["POST"])