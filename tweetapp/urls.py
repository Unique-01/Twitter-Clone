from django.urls import path
from . import views

urlpatterns = [
    path('upload_tweet/',views.tweetUpload,name='tweet_upload'),
    path('<username>/status/<int:pk>/', views.tweetDetail,name="tweet_detail"),
]
