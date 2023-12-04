from rest_framework import serializers
from .models import Category , Post


class SimplePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content_image' ]


class CategorySerializer(serializers.ModelSerializer):
    posts = SimplePostSerializer(many=True, read_only=True)
    slug = serializers.ReadOnlyField()
    class Meta:
        model = Category
        fields = ['id','slug','name','posts']
    
class PostSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()
    class Meta:
        model = Post
        fields = ['id', 'title','slug', 'content', 'image', 'published_date', 'category']




