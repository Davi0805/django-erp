import os
from django.core.asgi import get_asgi_application
import django

import api  # Import the routing module

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

application = get_asgi_application()