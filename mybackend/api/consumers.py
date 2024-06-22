from channels.generic.websocket import WebsocketConsumer
import json

class CargasInfoConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        pass

def send_update(self, event):

        self.send(text_data=json.dumps(event))