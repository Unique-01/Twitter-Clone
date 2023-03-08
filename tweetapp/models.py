from django.db import models
from django.contrib.auth.models import User

# Create your models here.
SEEN_BY_CHOICES = [
    ('Everyone','Everyone'),
    ('People you follow', 'People you follow')
]

class Tweet(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    seen_by = models.CharField(max_length=17,choices=SEEN_BY_CHOICES,default='')


class TweetMedia(models.Model):
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    image = models.FileField(upload_to='tweet_images')
