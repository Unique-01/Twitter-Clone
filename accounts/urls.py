from django.urls import path
from . import views

urlpatterns = [
    path('p/<username>/',views.profile,name="profile"),
    path('accounts/profile_update/',views.profile_update,name="profile_update"),
    path("followToggle/<str:username>/",views.followToggle, name="followToggle"),
]
