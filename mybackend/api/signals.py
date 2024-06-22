from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CargasInfo

@receiver(post_save, sender=CargasInfo)
def send_data_update(sender, instance, **kwargs):
    print({
        'id': instance.id,
        'shipping_status': instance.shipping_status,
        'contractorstring': instance.contractorstring,
        'type_of_load': instance.type_of_load
    })