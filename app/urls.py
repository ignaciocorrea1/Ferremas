from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("catalogo/", views.catalogo, name="catalogo"),
    path("producto/", views.producto, name="producto"),
    path("login/", views.login_view, name="login"),  # ← referencia correcta a la vista
]