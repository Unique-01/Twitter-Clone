from django import forms
from .models import Tweet, Reply


class TweetForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(TweetForm, self).__init__(*args, **kwargs)

        self.fields['content'].label = ""
        self.fields['seen_by'].label = ""

    class Meta:
        model = Tweet
        fields = ['seen_by', 'content']
        widgets = {
            'content':
            forms.Textarea(attrs={'placeholder': "What's happening?"})
        }


class ReplyForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(ReplyForm, self).__init__(*args, **kwargs)

        self.fields['content'].label = ""

    class Meta:
        model = Reply
        fields = ['content']
        widgets = {
            'content':
            forms.Textarea(attrs={'placeholder': "Tweet your reply"})
        }