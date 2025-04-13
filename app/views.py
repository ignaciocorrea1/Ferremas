from variables import *
from django.shortcuts import render


# Create your views here.
def index(request):
    context = {}
    return render(request, INDEX_TEMPLATE, context)

def catalogo(request):
    context = {}
    return render(request, CATALOGO_TEMPLATE, context)

def producto(request):
    context = {}
    return render(request, VER_PRODUCTO_TEMPLATE, context)