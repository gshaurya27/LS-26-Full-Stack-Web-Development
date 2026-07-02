from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Bounty
from .serializers import BountySerializer
from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from django.core.cache import cache


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bounties(request):
    bounties = Bounty.objects.filter(owner=request.user)
    serializer = BountySerializer(bounties, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bounty(request):
    serializer = BountySerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(owner=request.user)
        cache.delete(f"bounties_{request.user.id}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bounties(request):
    cache_key = f"bounties_{request.user.id}"

    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data, status=status.HTTP_200_OK)

    bounties = Bounty.objects.filter(owner=request.user)
    serializer = BountySerializer(bounties, many=True)

    cache.set(cache_key, serializer.data, timeout=60)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_bounty(request, pk):
    try:
        bounty = Bounty.objects.get(id=pk, owner=request.user)
    except Bounty.DoesNotExist:
        raise Http404

    bounty.delete()
    cache.delete(f"bounties_{request.user.id}")
    return Response(
        {"message": "Deleted successfully"},
    status=status.HTTP_200_OK
    )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_bounty(request, pk):
    try:
        bounty = Bounty.objects.get(id=pk, owner=request.user)
    except Bounty.DoesNotExist:
        raise Http404

    serializer = BountySerializer(bounty, data=request.data)

    if serializer.is_valid():
        serializer.save()
        cache.delete(f"bounties_{request.user.id}")
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)