from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import User, Parent, Hospital, Child, VaccineRecord
from .serializers import (
    ParentSignupSerializer,
    HospitalSignupSerializer,
    ChildSerializer,
    VaccineRecordSerializer
)


# ──────────────────────────────────────────
# Parent Signup
# ──────────────────────────────────────────
class ParentSignupView(APIView):
    def post(self, request):
        serializer = ParentSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Parent account created successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────
# Hospital Signup
# ──────────────────────────────────────────
class HospitalSignupView(APIView):
    def post(self, request):
        serializer = HospitalSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Hospital account created successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────
# Login (Parent & Hospital)
# ──────────────────────────────────────────
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_type": user.user_type,
                "email": user.email
            }, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )


# ──────────────────────────────────────────
# Add Child (Parents only)
# ──────────────────────────────────────────
class AddChildView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Make sure the logged in user is a parent
        if request.user.user_type != 'parent':
            return Response(
                {"error": "Only parents can add children"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            parent = Parent.objects.get(user=request.user)
        except Parent.DoesNotExist:
            return Response(
                {"error": "Parent profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ChildSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(parent=parent)
            return Response(
                {
                    "message": "Child added successfully!",
                    "unique_id": serializer.data['unique_id'],
                    "child": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        # Let parents view their children
        if request.user.user_type != 'parent':
            return Response(
                {"error": "Only parents can view their children"},
                status=status.HTTP_403_FORBIDDEN
            )
        parent = Parent.objects.get(user=request.user)
        children = Child.objects.filter(parent=parent)
        serializer = ChildSerializer(children, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ──────────────────────────────────────────
# Add Vaccine Record (Hospitals only)
# ──────────────────────────────────────────
class AddVaccineRecordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, child_unique_id):
        # Make sure the logged in user is a hospital
        if request.user.user_type != 'hospital':
            return Response(
                {"error": "Only hospitals can add vaccine records"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            child = Child.objects.get(unique_id=child_unique_id)
        except Child.DoesNotExist:
            return Response(
                {"error": f"No child found with ID {child_unique_id}"},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            hospital = Hospital.objects.get(user=request.user)
        except Hospital.DoesNotExist:
            return Response(
                {"error": "Hospital profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = VaccineRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(child=child, hospital=hospital)
            return Response(
                {"message": "Vaccine record added successfully!", "record": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, child_unique_id):
        # Both parents and hospitals can view vaccine records
        try:
            child = Child.objects.get(unique_id=child_unique_id)
        except Child.DoesNotExist:
            return Response(
                {"error": f"No child found with ID {child_unique_id}"},
                status=status.HTTP_404_NOT_FOUND
            )

        records = VaccineRecord.objects.filter(child=child)
        serializer = VaccineRecordSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)