from rest_framework import serializers
from .models import Category , Post





    
class PostSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()
    class Meta:
        model = Post
        fields = ['id', 'title','slug', 'content', 'image', 'published_date', 'category']

    def create(self, validated_data):
        category_id = self.context['category_id']
        return Post.objects.create(category_id= category_id , **validated_data)




class CategorySerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()
    posts = PostSerializer(many=True, read_only=True) 
    class Meta:
        model = Category
        fields = ['id','slug','name','posts']

    