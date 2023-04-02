from django.shortcuts import render, reverse
from django.views import generic
from accounts.forms import CustomLoginForm
from tweetapp.forms import TweetForm
from tweetapp.models import Tweet
from datetime import datetime, timedelta
from random import shuffle
import requests
from tweetapp.views import trendingView
from django.contrib.auth.models import User
from django.db.models import Q
import re
from django.utils.http import urlencode


def indexView(request):
    trending_words = trendingView(request)
    tweets = Tweet.objects.all()
    for tweet in tweets:
        tweet.content = re.sub(r'#(\w+)', r'<a href="search?{{ "q"|urlencode }}=\1">#\1</a>', tweet.content)
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


def searchView(request):
    query = request.GET.get('q')
    search_tweets = None
    search_people = None

    if query:
        search_tweets = Tweet.objects.filter(content__icontains=query)
        search_people = User.objects.filter(Q(username__icontains=query) | Q(first_name__icontains=query) | Q(last_name__icontains=query) )

    return render(request, 'search.html', {'search_tweets': search_tweets,'search_people':search_people})
