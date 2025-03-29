import random
import time
import uuid

from app.redis_client import r
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()


@router.post('/')
def create_session():
    session_id = str(uuid.uuid4())
    key = f'session:{session_id}'

    r.rpush(key, '__placeholder__')
    r.expire(key, 3600)

    print('🔧 Redis key created:', key)
    print('🔎 Current keys:', r.keys('session:*'))

    return {'session_id': session_id}


class Option(BaseModel):
    name: str


@router.post('/{session_id}/option')
def add_option(session_id: str, option: Option):
    key = f'session:{session_id}'

    r.rpush(key, option.name)
    r.expire(key, 3600)

    options = r.lrange(key, 0, -1)
    options = [opt for opt in options if opt != '__placeholder__']
    return {'options': options}


@router.get('/{session_id}/options')
def get_options(session_id: str):
    key = f'session:{session_id}'

    if not r.exists(key):
        raise HTTPException(status_code=404, detail='Session not found')

    all_options = r.lrange(key, 0, -1)
    options = [opt for opt in all_options if opt != '__placeholder__']

    return {'options': options}


@router.delete('/{session_id}/option')
def delete_option(session_id: str, option: Option):
    key = f'session:{session_id}'

    if not r.exists(key):
        raise HTTPException(status_code=404, detail='Session not found')

    r.lrem(key, 0, option.name)

    options = r.lrange(key, 0, -1)
    options = [opt for opt in options if opt != '__placeholder__']
    return {'options': options}


@router.post('/{session_id}/spin')
def spin(session_id: str):
    key = f'session:{session_id}'

    if not r.exists(key):
        raise HTTPException(status_code=404, detail='Session not found')

    options = r.lrange(key, 0, -1)
    options = [opt for opt in options if opt != '__placeholder__']

    if len(options) == 0:
        raise HTTPException(status_code=400, detail='No options available')

    winner = random.choice(options)

    return {'winner': winner}


@router.delete('/{session_id}')
def delete_session(session_id: str):
    key = f'session:{session_id}'

    if not r.exists(key):
        raise HTTPException(status_code=404, detail='Session not found')

    r.delete(key)

    return {'message': f'Session {session_id} deleted'}
