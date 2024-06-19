from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from api.models import Contractor, Emails, Pedidos, CargasInfo
from api.serializers import UsersSerializer,StatBoxSerializer, GroupSerializer, PedidosSerializer, ContractorSerializer, EmailsSerializer, CargasInfoSerializer
#from api import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication


# AUTH DO DJANGO REST FRAMEWORK
class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UsersSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet): 
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# MINHAS VIEWS

    #CONTRACTOR/EMPRESAS

class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all().order_by('-open_orders')
    serializer_class = ContractorSerializer
"""     permission_classes = [permissions.IsAuthenticated] """

class EmailsViewSet(viewsets.ModelViewSet):
    queryset = Emails.objects.all()
    serializer_class = EmailsSerializer
    permission_classes = [permissions.IsAuthenticated]

    #PEDIDOS
    
class Pedidos_pendentesViewSet(viewsets.ModelViewSet):
    queryset = Pedidos.objects.all().filter(delivery_status=False)
    serializer_class = PedidosSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class Pedidos_entreguesViewSet(viewsets.ModelViewSet):
    queryset = Pedidos.objects.all().filter(delivery_status=True)
    serializer_class = PedidosSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class PedidosViewSet(viewsets.ModelViewSet):
    queryset = Pedidos.objects.all().order_by('-delivery_status')
    serializer_class = PedidosSerializer
    """ permission_classes = [permissions.IsAuthenticated] """

class CargasInfoViewSet(viewsets.ModelViewSet):
    queryset = CargasInfo.objects.all()
    serializer_class = CargasInfoSerializer
    authentication_classes = [JWTAuthentication]

class StatBoxViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]

    def list(self, request):
        # Calcular as contagens
        option_l_count = CargasInfo.objects.filter(shipping_status='L').count()
        option_t_count = CargasInfo.objects.filter(shipping_status='T').count()
        option_b_count = CargasInfo.objects.filter(shipping_status='B').count()
        option_p_count = CargasInfo.objects.filter(shipping_status='P').count()

        # Preparar os dados da resposta
        counts_data = {
            'option_l_count': option_l_count,
            'option_t_count': option_t_count,
            'option_b_count': option_b_count,
            'option_p_count': option_p_count
        }

        # Serializar os dados de contagem
        serializer = StatBoxSerializer(counts_data)
        
        # Preparar a resposta final com "results"
        response_data = {
            'results': serializer.data
        }

        return Response(response_data)
# Create your views here.
