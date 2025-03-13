from django.urls import path
from . import views

urlpatterns = [
    path("questions/", views.home, name="home"),
    path("questions/play/", views.play, name="play"),
    path("questions/auto/", views.auto_play, name = "auto")
]