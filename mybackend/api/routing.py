""" # routing.py
from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from api import consumers

websocket_urlpatterns = [
    re_path(r'ws/cargas/$', consumers.CargasInfoConsumer.as_asgi())
] """