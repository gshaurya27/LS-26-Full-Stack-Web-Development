from django.urls import path
from . import views

urlpatterns = [
    path('bounties/', views.get_bounties),
    path('bounties/create/', views.create_bounty),
    path('bounties/<int:pk>/', views.get_bounty),
    path('bounties/<int:pk>/update/', views.update_bounty),
    path('bounties/<int:pk>/delete/', views.delete_bounty),
]