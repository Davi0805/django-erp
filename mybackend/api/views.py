from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from api.models import Contractor, Emails, Pedidos, CargasInfo
from api.serializers import UsersSerializer,StatBoxSerializer, GroupSerializer, PedidosSerializer, ContractorSerializer, EmailsSerializer, CargasInfoSerializer
#from api import serializers
from api.utils import download_excel_data
from rest_framework_simplejwt.authentication import JWTAuthentication

import pytz
import pandas as pd
import xlwt
from api.models import CargasInfo
import requests
from django.http import HttpResponse


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
    
""" def export_view(request):

    return download_excel_data(request) """
def export_view(request):
	# content-type of response
	response = HttpResponse(content_type='application/ms-excel')	#decide file name
	response['Content-Disposition'] = 'attachment; filename="ThePythonDjango.xls"'	#creating workbook
	wb = xlwt.Workbook(encoding='utf-8')	#adding sheet
	ws = wb.add_sheet("sheet1")	# Sheet header, first row
	row_num = 0	
	font_style = xlwt.XFStyle()
	# headers are bold
	font_style.font.bold = True	#column header names, you can use your own headers here
	columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', ]	#write column headers in sheet
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)	# Sheet body, remaining rows
	font_style = xlwt.XFStyle()	#get your data, from database or from a text file...
	data = CargasInfo.objects.all() #dummy method to fetch data.
	for row_num, my_row in enumerate(data):
		row = [my_row.contractorname.name, my_row.contractorstring, my_row.shipping_status, 
			   my_row.type_of_load, str(my_row.origin.name), str(my_row.destination.name), my_row.destination.name, my_row.weight, 
			   my_row.cost, my_row.ce_mercante]
		for col_num, cell_value in enumerate(row):
			ws.write(row_num + 1, col_num, cell_value, font_style)
	wb.save(response)
	return response

# Create your views here.
