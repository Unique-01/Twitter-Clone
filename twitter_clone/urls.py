from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include("allauth.urls")),
    path('',views.indexView,name='index'),
    path('',include('accounts.urls')),
    path('',include("tweetapp.urls")),
    path('search/',views.searchView,name='search'),
    # path('',TemplateView.as_view(template_name='index.html'),name='index'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
