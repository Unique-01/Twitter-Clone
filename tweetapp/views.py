from django.shortcuts import render,redirect
from .models import Tweet,TweetMedia
from . forms import TweetForm
from django.contrib import messages

# Create your views here.

def tweetUpload(request):
    new_tweet = None
    tweet_form = TweetForm()
    if request.method == 'POST':
        tweet_form = TweetForm(request.POST)
        images = request.FILES.getlist('images')
        if tweet_form.is_valid():
            new_tweet = tweet_form.save(commit=False)
            new_tweet.author = request.user
            new_tweet.save()

            for i in images:
                tweet_image = TweetMedia(tweet=new_tweet,image=i)
                tweet_image.save()
            messages.success(request, "Tweet has been uploaded ")
            return redirect("index")
            