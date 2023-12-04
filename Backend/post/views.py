from django.shortcuts import render
from .models import Category , Post
from .serializers import CategorySerializer , PostSerializer , PostCategorySerializer
from rest_framework.viewsets import ModelViewSet
# Create your views here.

class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class PostCategoryViewSet(ModelViewSet):
    
    serializer_class = PostCategorySerializer

    def get_serializer_context(self):
        return {'category_id':self.kwargs['category_pk']}
    
    def get_queryset(self):
        return Post.objects.filter(category_id=self.kwargs['category_pk'])
    
    
class PostViewset(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()