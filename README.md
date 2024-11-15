# Green Seoul Bot Admin API

`Green Seoul Bot`프로젝트의 관리자 페이지 기능을 제공합니다. <br>
FastAPI를 기반으로 하며, 관리자 로그인 후 정책 정보 관리 기능(조회, 추가, 수정, 삭제)이 구현되었습니다. 

## Requirements

- Python 
- FastAPI
- SQLAlchemy
- Pydantic
- PIL

## 설치 및 실행 방법

1. 가상 환경을 생성하고 필요한 패키지를 설치합니다.

    ```bash
    python -m venv venv
    source venv/bin/activate  # 윈도우의 경우 venv\Scripts\activate
    pip install -r requirements.txt
    ```

2. 서버를 실행합니다.

    ```bash
    uvicorn main:app --reload
    ```

3. 서버가 실행된 후 `http://127.0.0.1:8000/docs`에서 Swagger UI 문서를 확인할 수 있습니다.

---

