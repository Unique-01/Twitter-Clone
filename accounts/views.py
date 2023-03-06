from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Profile
from .forms import ProfileForm
from django.http import HttpResponseRedirect
from django.urls import reverse

# Create your views here.


def profile(request, username):
    user = User.objects.get(username=username)

    return render(request, 'profile.html', {
        'user': user,
        'username': username
    })


def followToggle(request, username):
    otheruser = User.objects.get(username=username)
    requestuser = User.objects.get(username=request.user.username)
    otheruserprofile = Profile.objects.get(user=otheruser)
    requestuserprofile = Profile.objects.get(user=requestuser)
    followers = otheruserprofile.followers.all()

    if username != requestuser.username:
        if requestuserprofile in followers:
            otheruserprofile.followers.remove(requestuserprofile)
        else:
            otheruserprofile.followers.add(requestuserprofile.id)

    return HttpResponseRedirect(reverse(profile, args=[otheruser.username]))


@login_required
def profile_update(request):
    try:
        profile = request.user.profile
    except Profile.DoesNotExist:
        profile = Profile(user=request.user)

    if request.method == 'POST':
        profile_form = ProfileForm(request.POST,
                                   request.FILES,
                                   instance=profile)

        if profile_form.is_valid():
            profile_form.save()
            return redirect('profile', request.user.username)

    else:
        profile_form = ProfileForm(instance=profile)

    return render(request, 'profile_update.html',
                  {'profile_form': profile_form})
