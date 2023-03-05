from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include("allauth.urls")),
    path('',views.indexView,name='index'),
    path('',include('accounts.urls'))
    # path('',TemplateView.as_view(template_name='index.html'),name='index'),
]
