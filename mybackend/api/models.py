from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

# Create your models here.

class Contractor(models.Model):
    name = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14)
    created_at = models.DateTimeField(auto_now_add=True)
    open_orders = models.IntegerField(default=0)
    total_orders = models.IntegerField(default=0)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return self.name
        
class Country(models.Model):

    name = models.CharField(max_length=255)
    iso_code = models.CharField(max_length=2, unique=True)


    def __str__(self):

        return self.name

class Company(models.Model):
    name = models.CharField(max_length=60)
    cnpj = models.CharField(max_length=14)
    faturamento = models.DecimalField(max_digits=10, decimal_places=2)
    lucro = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Transactions(models.Model):
    company = models.ForeignKey('Company', on_delete=models.CASCADE)
    contractor = models.ForeignKey('Contractor', on_delete=models.CASCADE)
    carga = models.ForeignKey('CargasInfo', on_delete=models.CASCADE)
    nome_operador = models.CharField(max_length=100)
    transaction_date = models.DateTimeField(auto_now_add=True)
    transaction_value = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=100)

    def __str__(self):
        return self.transaction_date

class Emails(models.Model):
    author_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    contractor = models.ForeignKey('Contractor', on_delete=models.CASCADE)

    def __str__(self):
        return self.email
    
class Pedidos(models.Model):
    shipping_id = models.CharField(max_length=100)
    contractor_id = models.ForeignKey('Contractor', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline_date = models.DateTimeField()
    delivery_status = models.BooleanField(default=False)
    costs = models.DecimalField(max_digits=10, decimal_places=2)
    faturamento = models.DecimalField(max_digits=10, decimal_places=2)
    expected_profit = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.shipping_id
    
class CargasInfo(models.Model):
    OPTION_A = 'L'
    OPTION_B = 'T'
    OPTION_C = 'B'
    OPTION_D = 'P'

    CHOICES = [
        (OPTION_A, 'Liberada'),
        (OPTION_B, 'Em transito'),
        (OPTION_C, 'Bloqueada'),
        (OPTION_D, 'Pendente'),
    ]
    contractorname = models.ForeignKey('Contractor', on_delete=models.CASCADE)
    companyid = models.ForeignKey('Company', on_delete=models.CASCADE, blank=True, null=True)
    contractorstring = models.CharField(max_length=100, default='')
    shipping_status = models.CharField(max_length=15, choices=CHOICES, default=OPTION_D)
    type_of_load = models.CharField(max_length=100)
    origin = models.ForeignKey('Country', on_delete=models.CASCADE, default=46)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    ce_mercante = models.CharField(max_length=15, default='')
    ce_m_file = models.FileField(upload_to='CE_MERCANTE_arquivos', blank=True, null=True)
    ncm = models.DecimalField(max_digits=30, decimal_places=0, blank=True, null=True)
    cntrnum = models.DecimalField(max_digits=30, decimal_places=0, blank=True, null=True)
    referenciaid = models.DecimalField(max_digits=30, decimal_places=0, blank=True, null=True)
    afrmmpago = models.BooleanField(default=False)
    afrmmfile = models.FileField(upload_to='AFRMM_comprovantes', blank=True, null=True)
    blnum = models.DecimalField(max_digits=30, decimal_places=0, blank=True, null=True)
    blfile = models.FileField(upload_to='BL_arquivos', blank=True, null=True)
    nfnum = models.DecimalField(max_digits=30, decimal_places=0, blank=True, null=True)
    packinglist = models.FileField(upload_to='PACKING_LIST_arquivos', blank=True, null=True)

    def __str__(self):

        return f"CargasInfo {self.id}"

    def to_dict(self):

        return {

            'id': self.id,

            'contractorname': self.contractorname.name,

            'contractorstring': self.contractorstring,

            'shipping_status': self.shipping_status,

            'type_of_load': self.type_of_load,

            'weight': self.weight,

            'cost': self.cost,

            'created_at': self.created_at,

            'ce_mercante': self.ce_mercante,

        }

@receiver(post_save, sender=CargasInfo)
def send_update_on_save(sender, instance, created, **kwargs):
    if created:
        event = {'type': 'created', 'data': instance.to_dict()}
    else:
        event = {'type': 'updated', 'data': instance.to_dict()}
    print(event)  # Replace with your desired action

@receiver(post_delete, sender=CargasInfo)
def send_update_on_delete(sender, instance, **kwargs):
    event = {'type': 'deleted', 'data': instance.to_dict()}
    print(event)  # Replace with your desired action