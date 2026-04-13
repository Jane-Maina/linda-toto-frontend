from rest_framework import serializers
from .models import User, Parent, Hospital, Child, VaccineRecord


# ──────────────────────────────────────────
# Parent Signup
# ──────────────────────────────────────────
class ParentSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'phone_number']

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        phone_number = validated_data.pop('phone_number')

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='parent'
        )
        Parent.objects.create(user=user, first_name=first_name, phone_number=phone_number)
        return user


# ──────────────────────────────────────────
# Hospital Signup
# ──────────────────────────────────────────
class HospitalSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    hospital_name = serializers.CharField()
    location = serializers.CharField()
    documents = serializers.FileField(required=False)

    class Meta:
        model = User
        fields = ['email', 'password', 'hospital_name', 'location', 'documents']

    def create(self, validated_data):
        hospital_name = validated_data.pop('hospital_name')
        location = validated_data.pop('location')
        documents = validated_data.pop('documents', None)

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            user_type='hospital'
        )
        Hospital.objects.create(
            user=user,
            hospital_name=hospital_name,
            location=location,
            documents=documents
        )
        return user


# ──────────────────────────────────────────
# Child
# ──────────────────────────────────────────
class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ['id', 'unique_id', 'name', 'date_of_birth', 'weight']
        read_only_fields = ['unique_id']


# ──────────────────────────────────────────
# Vaccine Record
# ──────────────────────────────────────────
class VaccineRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccineRecord
        fields = ['id', 'vaccine_name', 'date_administered', 'report', 'hospital']
        read_only_fields = ['date_administered', 'hospital']