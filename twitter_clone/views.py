from django.shortcuts import render
from django.views import generic
# from allauth.account.forms import LoginForm
from accounts.forms import CustomLoginForm

# class IndexView(generic.ListView):
#     template_name ='index.html'

def indexView(request):
    login_form = CustomLoginForm()
    return render(request,'index.html',{'login_form':login_form})
