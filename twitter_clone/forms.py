from allauth.account.forms import LoginForm,SignupForm
from crispy_forms.helper import FormHelper

class CustomLoginForm(LoginForm):

    def __init__(self, *args, **kwargs):
        super(CustomLoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        # self.helper.form_show_labels = False

        self.fields["login"].label = ""
        self.fields["password"].label = ""

class CustomSignupForm(SignupForm):

    def __init__(self, *args, **kwargs):
        super(CustomSignupForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper(self)
        self.helper.form_show_labels = False

        self.fields["username"].label = ""
        self.fields["password1"].label = ""
        self.fields["password2"].label = ""
        self.fields["email"].label = ""