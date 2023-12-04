from django.urls import path 
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='category')
router.register('posts', views.PostViewSet, basename='posts')

urlpatterns = router.urls
