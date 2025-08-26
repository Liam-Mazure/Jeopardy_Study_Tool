from django.urls import path, re_path
from .views import play

urlpatterns = [
    path("questions/play/", play, name="play"),
    
    #Regex: r -> raw string, ^ -> start of string, . -> any char, * -> zero or more of prev char, $ -> end of string
    # Acts as a catch all matching with any URL 
    # re_path(r'^.*$', FrontendAppView.as_view(), name="frontend"),
]