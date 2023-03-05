from django.urls import path
from . import views

urlpatterns = [
    path('<username>/',views.profile,name="profile"),
    path('accounts/profile_update/',views.profile_update,name="profile_update")
]
