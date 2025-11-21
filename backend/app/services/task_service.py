from sqlalchemy.orm import Session
from uuid import UUID
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate
from fastapi import HTTPException, status

class TaskService:
    @staticmethod
    def create_task(db: Session, user_id: UUID, task_create: TaskCreate) -> Task:
        task = Task(
            user_id=user_id,
            **task_create.model_dump()
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return task
    
    @staticmethod
    def get_user_tasks(
        db: Session, 
        user_id: UUID, 
        skip: int = 0, 
        limit: int = 10,
        status: str = None
    ) -> list:
        query = db.query(Task).filter(Task.user_id == user_id)
        
        if status:
            query = query.filter(Task.status == status)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def get_task(db: Session, task_id: UUID, user_id: UUID) -> Task:
        task = db.query(Task).filter(
            (Task.id == task_id) & (Task.user_id == user_id)
        ).first()
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        
        return task
    
    @staticmethod
    def update_task(db: Session, task_id: UUID, user_id: UUID, task_update: TaskUpdate) -> Task:
        task = TaskService.get_task(db, task_id, user_id)
        
        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)
        
        db.commit()
        db.refresh(task)
        return task
    
    @staticmethod
    def delete_task(db: Session, task_id: UUID, user_id: UUID) -> None:
        task = TaskService.get_task(db, task_id, user_id)
        db.delete(task)
        db.commit()