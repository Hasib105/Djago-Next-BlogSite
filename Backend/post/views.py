from django.shortcuts import render
from .models import Category , Post
from .serializers import CategorySerializer , PostSerializer
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer