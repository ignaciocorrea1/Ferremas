from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from .forms import CustomAuthenticationForm

# Vista para el inicio
def index(request):
    return render(request, "pages/index.html")

# Vista para el catálogo
def catalogo(request):
    return render(request, "pages/catalogo.html")

# Vista para producto
def producto(request):
    return render(request, "pages/producto.html")

# Vista para iniciar sesión
def login_view(request):
    form = CustomAuthenticationForm(request, data=request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return redirect('/')  # Puedes cambiar a "index" si tienes un nombre asignado

    return render(request, 'pages/login.html', {"login_form": form})
