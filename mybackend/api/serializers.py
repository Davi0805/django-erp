from django.contrib.auth.models import User, Group
from api.models import Contractor, Emails, Pedidos, CargasInfo, Country, Company, Transactions
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist

#AUTH DO DJANGO REST FRAMEWORK
class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

# SERIALIZERS

class ContractorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contractor
        fields = ['id', 'name', 'cnpj', 'created_at', 'open_orders', 'total_orders', 'observacoes']

class EmailsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Emails
        fields = ['author_name', 'email', 'created_at', 'contractor']

class CountrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class PedidosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pedidos
        fields = ['shipping_id', 'contractor_id', 'created_at', 'deadline_date', 'delivery_status', 'costs', 'faturamento', 'expected_profit']

class TransactionsSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Transactions
        fields = ['id', 'nome_operador', 'transaction_date', 'transaction_value', 'transaction_type']
        lookup_field = 'id'

class CargasInfoSerializer(serializers.HyperlinkedModelSerializer):
    contractor_name_display = serializers.StringRelatedField(source='contractorname.name', read_only=True)
    contractorname = serializers.PrimaryKeyRelatedField(queryset=Contractor.objects.all(), write_only=False)

    origin_name_display = serializers.StringRelatedField(source='origin.name', read_only=True)
    origin = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), write_only=False)

    class Meta:
        model = CargasInfo
        fields = ['id', 'contractorname', 'contractor_name_display', 'shipping_status', 'type_of_load', 'origin', 'origin_name_display', 'weight', 'cost', 'created_at', 'ce_mercante', 'ce_m_file', 'packinglist', 'contractorstring', 'ncm', 'cntrnum', 'referenciaid', 'afrmmpago', 'afrmmfile', 'blnum', 'blfile', 'nfnum']
        lookup_field = 'id'

    def get_contractor_name_display(self, obj):
        return obj.contractorname.name

    def get_origin_name_display(self, obj):
        return obj.origin.name
    
class StatBoxSerializer(serializers.Serializer):
    option_l_count = serializers.SerializerMethodField()
    option_t_count = serializers.SerializerMethodField()
    option_b_count = serializers.SerializerMethodField()
    option_p_count = serializers.SerializerMethodField()

    class Meta:
        model = CargasInfo
        fields = ['option_l_count', 'option_t_count', 'option_b_count', 'option_p_count']

    def get_option_l_count(self, obj):
        return CargasInfo.objects.filter(shipping_status='L').count()

    def get_option_t_count(self, obj):
        return CargasInfo.objects.filter(shipping_status='T').count()

    def get_option_b_count(self, obj):
        return CargasInfo.objects.filter(shipping_status='B').count()

    def get_option_p_count(self, obj):
        return CargasInfo.objects.filter(shipping_status='P').count()