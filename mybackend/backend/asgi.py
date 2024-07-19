import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import django
import api.routing

import api  # Import the routing module

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            api.routing.websocket_urlpatterns  # Use the imported routing module
        )
    ),
})