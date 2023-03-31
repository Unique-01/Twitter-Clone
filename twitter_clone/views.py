from django.shortcuts import render,reverse
from django.views import generic
from accounts.forms import CustomLoginForm
from tweetapp.forms import TweetForm
from tweetapp.models import Tweet
from datetime import datetime, timedelta
from random import shuffle
import requests
from tweetapp.views import trendingView

def indexView(request):
    trending_words = trendingView(request)
    tweets = Tweet.objects.all()
    shuffled_tweets = list(tweets)
    shuffle(shuffled_tweets)
    login_form = CustomLoginForm()
    tweet_form = TweetForm()
    now = datetime.now()
    nowtime = datetime.now().time()
    yesterday = (now - timedelta(days=1)).date()
    if request.method == "POST":
        tweet_form = TweetForm(request.POST)

    context = {
        'login_form': login_form,
        'tweet_form': tweet_form,
        'tweets': tweets,
        'shuffled_tweets': shuffled_tweets,
        'now': now,
        'yesterday': yesterday,
        'trending_words': trending_words,
    }
    return render(request, 'index.html', context)
