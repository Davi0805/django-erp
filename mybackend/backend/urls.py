from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import UsersViewSet, GroupViewSet, ContractorViewSet, EmailsViewSet, Pedidos_pendentesViewSet, export_view, PedidosViewSet, CargasInfoViewSet, StatBoxViewSet, CountryViewSet, ce_mercantedownload, bl_original_download, packinglist_download, afrmm_download, TransactionsViewSet, IsAuthenticatedView, MyTokenObtainPairView

router = routers.DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'contractor', ContractorViewSet)
router.register(r'emails', EmailsViewSet)
router.register(r'pedidos', PedidosViewSet, basename='pedidos')
router.register(r'cargasinfo', CargasInfoViewSet, basename='cargas')
router.register(r'statbox', StatBoxViewSet, basename='statbox')
router.register(r'country', CountryViewSet)
router.register(r'transactions', TransactionsViewSet, basename='transactions')

urlpatterns = [
    path('', include('django_prometheus.urls')),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/isauthenticated', IsAuthenticatedView.as_view()) ,
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path('export/', export_view, name='export'),
    path('repositorio/ce_m/<pk>/', ce_mercantedownload.as_view()),
    path('repositorio/bl/<pk>/', bl_original_download.as_view()),
    path('repositorio/packinglist/<pk>/', packinglist_download.as_view()),
    path('repositorio/afrmm/<pk>/', afrmm_download.as_view()),
]
