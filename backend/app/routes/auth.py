from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, TokenResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=TokenResponse)
def signup(user_create: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    user = AuthService.create_user(db, user_create)
    tokens = AuthService.generate_tokens(user)
    return tokens

@router.post("/login", response_model=TokenResponse)
def login(email: str, password: str, db: Session = Depends(get_db)):
    """Login with email and password"""
    user = AuthService.authenticate_user(db, email, password)
    tokens = AuthService.generate_tokens(user)
    return tokens