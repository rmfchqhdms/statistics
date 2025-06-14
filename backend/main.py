from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import numpy as np
from datetime import datetime

from .database import SessionLocal, engine
from . import models, schemas, crud
from .auth import get_current_user

app = FastAPI(title="Statistics Analysis API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/upload", response_model=schemas.Dataset)
async def upload_dataset(
    file: UploadFile,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """데이터셋 업로드 엔드포인트"""
    try:
        df = pd.read_csv(file.file)
        dataset = crud.create_dataset(db, df, current_user.id)
        return dataset
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/datasets", response_model=List[schemas.Dataset])
async def get_datasets(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """사용자의 데이터셋 목록 조회"""
    return crud.get_user_datasets(db, current_user.id)

@app.get("/api/datasets/{dataset_id}/statistics")
async def get_dataset_statistics(
    dataset_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """데이터셋의 기본 통계량 조회"""
    dataset = crud.get_dataset(db, dataset_id)
    if not dataset or dataset.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.read_csv(dataset.file_path)
    return {
        "basic_stats": df.describe().to_dict(),
        "correlation": df.corr().to_dict()
    }

@app.post("/api/datasets/{dataset_id}/analysis")
async def analyze_dataset(
    dataset_id: int,
    analysis_type: str,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """데이터셋 분석 수행"""
    dataset = crud.get_dataset(db, dataset_id)
    if not dataset or dataset.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    df = pd.read_csv(dataset.file_path)
    
    if analysis_type == "pca":
        from sklearn.decomposition import PCA
        pca = PCA(n_components=2)
        result = pca.fit_transform(df.select_dtypes(include=[np.number]))
        return {"pca_result": result.tolist()}
    
    elif analysis_type == "clustering":
        from sklearn.cluster import KMeans
        kmeans = KMeans(n_clusters=3)
        result = kmeans.fit_predict(df.select_dtypes(include=[np.number]))
        return {"cluster_labels": result.tolist()}
    
    else:
        raise HTTPException(status_code=400, detail="Unsupported analysis type") 