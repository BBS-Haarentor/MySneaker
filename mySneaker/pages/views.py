from django.contrib.auth.views import LoginView
from django.shortcuts import render


class login_view(LoginView):
    template_name = 'login.html'

def home_view(request):
    return render(request, 'home.html', {})



def is_lehrer(user):
    return user.groups.filter(name='lehrer').exists()