from django.shortcuts import render
from django.views import generic
# from allauth.account.forms import LoginForm
from accounts.forms import CustomLoginForm
from tweetapp.forms import TweetForm
from tweetapp.models import Tweet
# class IndexView(generic.ListView):
#     template_name ='index.html'

def indexView(request):
    tweets = Tweet.objects.all()
    login_form = CustomLoginForm()
    tweet_form = TweetForm()
    if request.method == "POST":
        tweet_form = TweetForm(request.POST)
    return render(request,'index.html',{'login_form':login_form,'tweet_form':tweet_form,'tweets':tweets})
