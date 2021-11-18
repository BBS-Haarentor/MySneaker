from django.contrib.auth.views import LoginView
from django.shortcuts import render



class login_view(LoginView):
    template_name = 'login.html'

def home_view(request):
    return render(request, 'home.html', {})

def InputForm_view(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            Lager_Sneaker = request.POST.get('Lager_Sneaker')
            Lager_Farben = request.POST.get('Lager_Farben')
            Lager_Fertige_Sneaker = request.POST.get('Lager_Fertige_Sneaker')
            Aktuelle_Beschaffung_Sneaker = request.POST.get('Aktuelle_Beschaffung_Sneaker')
            Aktuelle_Beschaffung_Farben = request.POST.get('Aktuelle_Beschaffung_Farben')
            Aktuelle_Beschaffung_Fertige_Sneaker = request.POST.get('Aktuelle_Beschaffung_Fertige_Sneaker')
            Gesamte_Verfügbarkeit_Sneaker = request.POST.get('Gesamte_Verfügbarkeit_Sneaker')
            Gesamte_Verfügbarkeit_Farben = request.POST.get('Gesamte_Verfügbarkeit_Farben')
            Gesamte_Verfügbarkeit_Fertige_Sneaker = request.POST.get('Gesamte_Verfügbarkeit_Fertige_Sneaker')
            Lager_Periodenende_PLAN_Sneaker = request.POST.get('Lager_Periodenende_PLAN_Sneaker')
            Lager_Periodenende_PLAN_Farben = request.POST.get('Lager_Periodenende_PLAN_Farben')
            Lager_Periodenende_PLAN_Fertige_Sneaker = request.POST.get('Lager_Periodenende_PLAN_Fertige_Sneaker')
            Lagerkosten_pro_Stück_Sneaker = request.POST.get('Lagerkosten_pro_Stück_Sneaker')
            Lagerkosten_pro_Stück_Farben = request.POST.get('Lagerkosten_pro_Stück_Farben')
            Lagerkosten_pro_Stück_Fertige_Sneaker = request.POST.get('Lagerkosten_pro_Stück_Fertige_Sneaker')
            Lagerkosten_PLAN_Sneaker = request.POST.get('Lagerkosten_PLAN_Sneaker')
            Lagerkosten_PLAN_Farben = request.POST.get('Lagerkosten_PLAN_Farben')
            Lagerkosten_PLAN_Fertige_Sneaker = request.POST.get('Lagerkosten_PLAN_Fertige_Sneaker')
            Verbrauch_Produktion_IST_Sneaker = request.POST.get('Verbrauch_Produktion_IST_Sneaker')
            Verbrauch_Produktion_IST_Farben = request.POST.get('Verbrauch_Produktion_IST_Farben')
            Verbrauch_Produktion_IST_Fertige_Sneaker = request.POST.get('Verbrauch_Produktion_IST_Fertige_Sneaker')
            Lager_Periodenende_IST_Sneaker = request.POST.get('Lager_Periodenende_IST_Sneaker')
            Lager_Periodenende_IST_Farben = request.POST.get('Lager_Periodenende_IST_Farben')
            Lager_Periodenende_IST_Fertige_Sneaker = request.POST.get('Lager_Periodenende_IST_Fertige_Sneaker')
            Lagerkosten_IST_Sneaker = request.POST.get('Lagerkosten_IST_Sneaker')
            Lagerkosten_IST_Farben = request.POST.get('Lagerkosten_IST_Farben')
            Lagerkosten_IST_Fertige_Sneaker = request.POST.get('Lagerkosten_IST_Fertige_Sneaker')

    return render(request,'InputForm.html',{'Lager_Sneaker': "test",
                                            'Lager_Farben': "jo",
                                            'Lager_Fertige_Sneaker': "nice"
        ,'Aktuelle_Beschaffung_Sneaker': ""
        ,'Aktuelle_Beschaffung_Farben': ""
        ,'Aktuelle_Beschaffung_Fertige_Sneaker': ""
        ,'Gesamte_Verfügbarkeit_Sneaker': ""
        ,'Gesamte_Verfügbarkeit_Farben': ""
        ,'Gesamte_Verfügbarkeit_Fertige_Sneaker': ""
        ,'Lager_Periodenende_PLAN_Sneaker': ""
        ,'Lager_Periodenende_PLAN_Farben': ""
        ,'Lager_Periodenende_PLAN_Fertige_Sneaker': ""
        ,'Lagerkosten_pro_Stück_Sneaker': ""
        ,'Lagerkosten_pro_Stück_Farben': ""
        ,'Lagerkosten_pro_Stück_Fertige_Sneaker': ""
        ,'Lagerkosten_PLAN_Sneaker': ""
        ,'Lagerkosten_PLAN_Farben': ""
        ,'Lagerkosten_PLAN_Fertige_Sneaker': ""
        ,'Verbrauch_Produktion_IST_Sneaker': ""
        ,'Verbrauch_Produktion_IST_Farben': ""
        ,'Verbrauch_Produktion_IST_Fertige_Sneaker': ""
        ,'Lager_Periodenende_IST_Sneaker': ""
        ,'Lager_Periodenende_IST_Farben': ""
        ,'Lager_Periodenende_IST_Fertige_Sneaker': "",'Lagerkosten_IST_Sneaker': "",'Lagerkosten_IST_Farben': "",'Lagerkosten_IST_Fertige_Sneaker': "",})
def is_lehrer(user):
    return user.groups.filter(name='lehrer').exists()