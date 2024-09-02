from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver, Signal
from django.core.cache import cache  # Import the cache object
from .models import CargasInfo

put_request_signal = Signal()

""" @receiver(post_save, sender=CargasInfo)
@receiver(post_delete, sender=CargasInfo)
@receiver(put_request_signal, sender=CargasInfo) """
def clear_cache_on_change(sender, instance, **kwargs):
    cache_key = 'cargasinfocache'
    cache.delete(cache_key)

    cargas = CargasInfo.objects.all()
    cache.set(cache_key, cargas, 60*1)