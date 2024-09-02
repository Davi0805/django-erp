from django.contrib.auth.models import User, Group
from rest_framework import permissions, viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Contractor, Emails, Pedidos, CargasInfo, Country, Transactions
from api.serializers import UsersSerializer,StatBoxSerializer, GroupSerializer, PedidosSerializer, ContractorSerializer, EmailsSerializer, CargasInfoSerializer, CountrySerializer, TransactionsSerializer
from api.utils import download_excel_data
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
import pandas as pd
import xlwt
from api.models import CargasInfo
from .signals import put_request_signal
import requests
from django.core.cache import cache
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

@method_decorator(cache_page(timeout=60 * 30), name='list')
class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.only('id', 'name')
    serializer_class = CountrySerializer
    """ permission_classes = [permissions.IsAuthenticated] """

    """ @method_decorator(cache_page(timeout=60 * 5, key_prefix='cargasinfocache'), name='list')
    class CargasInfoViewSet(viewsets.ModelViewSet):
        queryset = CargasInfo.objects.prefetch_related('contractorname', 'origin').all()
        serializer_class = CargasInfoSerializer
        authentication_classes = [JWTAuthentication]
        parser_classes = [FormParser, MultiPartParser, JSONParser]

        def run_custom_function(self, request, instance):
            put_request_signal.send(sender=self.__class__, request=request, instance=instance)
            pass
        def update(self, request, *args, **kwargs):
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            # Call your custom function
            print("\nENTRANDO NA FUNCAO\n")
            self.run_custom_function(request, instance)
            cache_key = 'cargasinfocache'
            cache.delete(cache_key)

            cargas = CargasInfo.objects.all()
            cache.set(cache_key, cargas, 60*1)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to forcibly
                # invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data) """

class CargasInfoViewSet(viewsets.ModelViewSet):
        queryset = CargasInfo.objects.prefetch_related('contractorname', 'origin').all()
        serializer_class = CargasInfoSerializer
        authentication_classes = [JWTAuthentication]
        parser_classes = [FormParser, MultiPartParser, JSONParser]

        def get_cache_key(self, instance):
            return f"cargasinfo:{instance.pk}"
        
        def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            instance = serializer.instance

            # Set the cache key with the new instance data
            cache_key = self.get_cache_key(instance)
            cache.set(cache_key, instance, 60*10)  # Cache for 10 minutes

            # Invalidate the list cache
            list_cache_key = "cargasinfo:list"
            cache.delete(list_cache_key)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        def update(self, request, *args, **kwargs):
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            # Delete the cache key for the updated instance
            cache_key = self.get_cache_key(instance)
            cache.delete(cache_key)

            # Set the cache key with the updated data
            cache.set(cache_key, instance, 60*10)  # Cache for 10 minutes

            list_cache_key = "cargasinfo:list"
            cache.delete(list_cache_key)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to forcibly
                # invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        def destroy(self, request, *args, **kwargs):
            instance = self.get_object()
            self.perform_destroy(instance)

            # Delete the cache key for the deleted instance
            cache_key = self.get_cache_key(instance)
            cache.delete(cache_key)

            # Invalidate the list cache
            list_cache_key = "cargasinfo:list"
            cache.delete(list_cache_key)

            return Response(status=status.HTTP_204_NO_CONTENT)
   
        def list(self, request):
            # Get the cache key for the list view
            cache_key = f"cargasinfo:list"

            # Try to get the cached data
            data = cache.get(cache_key)
            if data is not None:
                return Response(data)

            # If the cache is empty, get the data from the database
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data

            # Set the cache key with the data
            cache.set(cache_key, data, 60*10)  # Cache for 10 minutes

            return Response(data)

    


class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    authentication_classes = [JWTAuthentication]

class StatBoxViewSet(viewsets.ModelViewSet):
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
	response['Content-Disposition'] = 'attachment; filename="TREVO_Cargas.xls"'	#creating workbook
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
			   my_row.type_of_load, str(my_row.origin.name), my_row.weight, 
			   my_row.cost, my_row.ce_mercante]
		for col_num, cell_value in enumerate(row):
			ws.write(row_num + 1, col_num, cell_value, font_style)
	wb.save(response)
	return response

class ce_mercantedownload(APIView):
    def get(self, request, pk):
        object = CargasInfo.objects.get(pk=pk)
        serializer = CargasInfoSerializer(object)
        data = serializer.data
        file_url = data['ce_m_file']
        file_path = object.ce_m_file.path  # get the file path from the model
        with open(file_path, 'rb') as f:
            file_data = f.read()
        response = HttpResponse(file_data, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_url}"'
        return response
    
class bl_original_download(APIView):
     def get(self, request, pk):
        object = CargasInfo.objects.get(pk=pk)
        serializer = CargasInfoSerializer(object)
        data = serializer.data
        file_url = data['blfile']
        file_path = object.blfile.path
        with open(file_path, 'rb') as f:
           file_data = f.read()
        response = HttpResponse(file_data, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_url}"'
        return response

class packinglist_download(APIView):
     def get(self, request, pk):
        object = CargasInfo.objects.get(pk=pk)
        serializer = CargasInfoSerializer(object)
        data = serializer.data
        file_url = data['packinglist']
        file_path = object.packinglist.path
        with open(file_path, 'rb') as f:
           file_data = f.read()
        response = HttpResponse(file_data, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_url}"'
        return response  
     
class afrmm_download(APIView):
     def get(self, request, pk):
        object = CargasInfo.objects.get(pk=pk)
        serializer = CargasInfoSerializer(object)
        data = serializer.data
        file_url = data['afrmmfile']
        file_path = object.afrmmfile.path
        with open(file_path, 'rb') as f:
           file_data = f.read()
        response = HttpResponse(file_data, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_url}"'
        return response  


# Create your views here.
