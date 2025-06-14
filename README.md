# statistics

# 통계 분석 시스템

데이터 업로드, 분석, 시각화를 위한 웹 기반 통계 분석 시스템입니다.

## 주요 기능

- CSV 파일 업로드 및 관리
- 기본 통계 분석 (평균, 표준편차, 상관관계 등)
- 고급 분석 기능:
  - 주성분 분석 (PCA)
  - 군집 분석 (Clustering)
- 분석 결과 시각화

## 기술 스택

### 백엔드
- FastAPI
- SQLAlchemy
- Pandas
- NumPy
- scikit-learn

### 프론트엔드
- React
- TypeScript
- Chakra UI

## 설치 및 실행

### 백엔드 설정

1. Python 가상환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. 의존성 설치
```bash
cd backend
pip install -r requirements.txt
```

3. 서버 실행
```bash
python run.py
```

### 프론트엔드 설정

1. 의존성 설치
```bash
cd frontend
npm install
```

2. 개발 서버 실행
```bash
npm start
```

## API 엔드포인트

- `POST /api/upload`: 데이터셋 업로드
- `GET /api/datasets`: 데이터셋 목록 조회
- `GET /api/datasets/{dataset_id}/statistics`: 데이터셋 통계 조회
- `POST /api/datasets/{dataset_id}/analysis`: 데이터셋 분석 수행

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

MIT License
