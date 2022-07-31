from django.contrib import admin
from django.urls import include, path
from chess_app.views import BaseView
from chess_app.api import move

urlpatterns = [
    path("", BaseView.as_view()),
    path(
        "api/move", move
    ),
]
