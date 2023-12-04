from django.urls import path 
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='category')
router.register('posts', views.PostViewSet, basename='posts')


post_router = routers.NestedDefaultRouter(router, 'categories', lookup='category')
post_router.register('post', views.CategoryViewSet, basename='post-category')


urlpatterns = router.urls + post_router.urls 
