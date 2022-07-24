from django.contrib import admin
from django.urls import include, path
from chess.views import BaseView

urlpatterns = [
    path("", BaseView.as_view()),
]
