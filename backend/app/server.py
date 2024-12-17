from app import models, schemas, database
from app.database import engine, get_db
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# User endpoints
@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user (Note: In production, you should hash the password)
    db_user = models.User(
        email=user.email,
        hashed_password=user.password,  # TODO: Add password hashing
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# Appointment endpoints
@app.post("/appointments/", response_model=schemas.Appointment)
async def create_appointment(
    appointment: schemas.AppointmentCreate,
    user_id: int,  # TODO: Replace with actual user authentication
    db: Session = Depends(get_db)
):
    db_appointment = models.Appointment(
        **appointment.dict(),
        owner_id=user_id,
        status="pending"
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/appointments/", response_model=List[schemas.Appointment])
async def read_appointments(
    skip: int = 0,
    limit: int = 100,
    user_id: int = None,  # Optional filter by user
    db: Session = Depends(get_db)
):
    query = db.query(models.Appointment)
    if user_id:
        query = query.filter(models.Appointment.owner_id == user_id)
    appointments = query.offset(skip).limit(limit).all()
    return appointments

@app.get("/appointments/{appointment_id}", response_model=schemas.Appointment)
async def read_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@app.put("/appointments/{appointment_id}/status")
async def update_appointment_status(
    appointment_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if status not in ["pending", "confirmed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    appointment.status = status
    db.commit()
    return {"message": "Status updated successfully"}

# Basic route
@app.get("/")
async def home():
    return {"message": "Server is running!"}

# Example route with parameters
@app.get("/api/{name}")
async def hello(name: str):
    return {"message": f"Hello, {name}!"} 