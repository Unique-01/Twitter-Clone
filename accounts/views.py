from django.shortcuts import render
from django.contrib.auth.models import User

# Create your views here.

def profile(request,username):
    user = User.objects.get(username=username)

    return render(request,'profile.html',{'user':user,'username':username})