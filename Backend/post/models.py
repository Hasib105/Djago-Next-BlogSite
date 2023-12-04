from django.db import models
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
  """Model for blog post categories."""
  name = models.CharField(max_length=255)
  slug = models.SlugField(unique=True)

  def __str__(self):
    return self.name
  
  def save(self, *args, **kwargs):
        # Auto-generate slug from the name if not provided
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
  


class Post(models.Model):
  title = models.CharField(max_length=255)
  slug = models.SlugField(unique=True, blank=True)
  content = models.TextField()
  content_image = models.ImageField(upload_to='post_images/%Y/%m/%d/',null=True, blank=True)
  published_date = models.DateTimeField(auto_now_add=True)
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts')

  def __str__(self):

    return self.title
  
  def save(self, *args, **kwargs):
        # Auto-generate slug from the title if not provided
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)