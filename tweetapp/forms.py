from django import forms
from .models import Tweet

class TweetForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(TweetForm, self).__init__(*args, **kwargs)
        
        self.fields['content'].label =""
        self.fields['seen_by'].label = ""
    class Meta:
        model = Tweet
        fields = ['content','seen_by']