from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

# ──────────────────────────────────────────
# Custom User Manager
# ──────────────────────────────────────────
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        return self.create_user(email, password, **extra_fields)


# ──────────────────────────────────────────
# Base User (Parent & Hospital both login)
# ──────────────────────────────────────────
class User(AbstractBaseUser):
    USER_TYPES = (
        ('parent', 'Parent'),
        ('hospital', 'Hospital'),
    )
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


# ──────────────────────────────────────────
# Parent Profile
# ──────────────────────────────────────────
class Parent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.first_name


# ──────────────────────────────────────────
# Hospital Profile
# ──────────────────────────────────────────
class Hospital(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hospital_name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    documents = models.FileField(upload_to='hospital_docs/', blank=True, null=True)

    def __str__(self):
        return self.hospital_name


# ──────────────────────────────────────────
# Child
# ──────────────────────────────────────────
class Child(models.Model):
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE, related_name='children')
    unique_id = models.CharField(max_length=20, unique=True, editable=False)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    weight = models.FloatField()

    def save(self, *args, **kwargs):
        # Auto-generate unique ID like LT-A3F9B2
        if not self.unique_id:
            self.unique_id = "LT-" + uuid.uuid4().hex[:6].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.unique_id})"


# ──────────────────────────────────────────
# Vaccine Record
# ──────────────────────────────────────────
class VaccineRecord(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE, related_name='vaccine_records')
    hospital = models.ForeignKey(Hospital, on_delete=models.SET_NULL, null=True)
    vaccine_name = models.CharField(max_length=100)
    date_administered = models.DateField(auto_now_add=True)
    report = models.TextField(blank=True)

    def __str__(self):
        return f"{self.vaccine_name} - {self.child.name}"