from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="profile")
    profile_picture = models.ImageField(upload_to="profile_img/",null=True,blank=True)
    cover_photo = models.ImageField(upload_to="cover_img/",null=True,blank=True)
    # about = models.CharField(max_length=1000,null=True,blank=True)
    about = models.TextField()
    location = models.CharField(max_length=500,null=True,blank=True)
    followers = models.ManyToManyField(User,related_name="followers")
    dob = models.DateField()
    link = models.CharField(max_length=500,null=True,blank=True)

    
