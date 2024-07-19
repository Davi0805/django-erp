from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
""" from .models import CargasInfo """
from django.apps import apps

class CargasInfoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        """ data = await self.cargasdata()
        serialized_data = [{"id": carga.id, 
                    "shipping_status": carga.shipping_status, 
                    "type_of_load": carga.type_of_load,  
                    "weight": str(carga.weight), 
                    "cost": str(carga.cost), 
                    "created_at": str(carga.created_at), 
                    "ce_mercante": carga.ce_mercante,  
                    "contractorstring": carga.contractorstring, 
                    "ncm": carga.ncm, 
                    "cntrnum": carga.cntrnum, 
                    "referenciaid": carga.referenciaid, 
                    "afrmmpago": carga.afrmmpago, 
                    "nfnum": carga.nfnum} for carga in data]
        await self.send(text_data=json.dumps(serialized_data)) """

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def cargasdata(self):
        CargasInfo = apps.get_model('api', 'CargasInfo')
        return list(CargasInfo.objects.all())