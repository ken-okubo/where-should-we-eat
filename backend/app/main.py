from app.routers import session
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(session.router, prefix='/session', tags=['Session'])


@app.get('/')
def root():
    return {'message': 'Where should we eat?'}
