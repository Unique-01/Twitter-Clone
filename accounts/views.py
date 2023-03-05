from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Profile
from .forms import ProfileForm

# Create your views here.


def profile(request, username):
    user = User.objects.get(username=username)

    return render(request, 'profile.html', {
        'user': user,
        'username': username
    })


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
