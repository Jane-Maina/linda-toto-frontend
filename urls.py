from django.urls import path
from .views import (
    ParentSignupView,
    HospitalSignupView,
    LoginView,
    AddChildView,
    AddVaccineRecordView
)

urlpatterns = [
    path('parent/signup/', ParentSignupView.as_view(), name='parent-signup'),
    path('hospital/signup/', HospitalSignupView.as_view(), name='hospital-signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('child/add/', AddChildView.as_view(), name='add-child'),
    path('vaccine/<str:child_unique_id>/', AddVaccineRecordView.as_view(), name='vaccine-record'),
]