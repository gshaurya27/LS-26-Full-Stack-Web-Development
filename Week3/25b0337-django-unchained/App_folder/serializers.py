from rest_framework import serializers
from .models import Bounty

class BountySerializer(serializers.ModelSerializer):
    class Meta:
        model = Bounty
        fields = '__all__'
        read_only_fields = ['owner', 'created_at']