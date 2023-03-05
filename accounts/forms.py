from django import forms
from allauth.account.forms import LoginForm, SignupForm
from crispy_forms.helper import FormHelper
from .models import Profile


class CustomLoginForm(LoginForm):

    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        # self.helper.form_show_labels = False

        self.fields["login"].label = ""
        self.fields["password"].label = ""


class CustomSignupForm(SignupForm):
    first_name = forms.CharField(max_length=30, label="", widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    last_name = forms.CharField(max_length=30,label="",widget=forms.TextInput(attrs={'placeholder': 'Last Name'}) )
    dob = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))

    def __init__(self, *args, **kwargs):
        super(CustomSignupForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_show_labels = False

        self.fields["username"].label = ""
        self.fields["password1"].label = ""
        self.fields["password2"].label = ""
        self.fields["email"].label = ""

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        profile = Profile.objects.get_or_create(user=user)
        profile.dob = self.cleaned_data['dob']
