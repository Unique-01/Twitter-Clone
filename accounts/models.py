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
    following = models.ManyToManyField("self",related_name="followers",symmetrical=False)
    dob = models.DateField()
    website = models.URLField(max_length=500,null=True,blank=True)
    link = models.CharField(max_length=500,null=True,blank=True)

    def __str__(self):
        return self.user.username

    
