from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("catalogo/", views.catalogo, name="catalogo"),
    path("producto/", views.producto, name="producto"),
    path("login/", views.login_view, name="login"),  # ← referencia correcta a la vista
    path("iniciar-pago/", views.iniciarPago, name="iniciarPago"),
    path("pago_exitoso/", views.pago_exitoso, name="pago_exitoso"),
    path("resultado_pago/", views.resultado_pago, name="resultado_pago"),
]