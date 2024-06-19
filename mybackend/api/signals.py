from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import CargasInfo

@receiver(post_save, sender=CargasInfo)
def send_data_update(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "data_group", {
            'type': 'send_data',
            'data': {
                'id': instance.id,
                'shipping_status': instance.shipping_status,
                'contractorstring': instance.contractorstring,
                'type_of_load': instance.type_of_load
            }
        }
    )
