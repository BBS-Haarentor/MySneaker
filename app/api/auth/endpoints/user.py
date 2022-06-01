from datetime import timedelta
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException
from app.api.auth.api_key_auth import get_api_key
from app.core.config import SETTINGS, cls_factory
from app.api.auth.user_auth import get_current_active_user, admin_auth_required, authenticate_user, create_access_token, hash_pw, teacher_auth_required
from app.crud.groups import add_user_to_admingroup, add_user_to_basegroup, add_user_to_teachergroup, check_user_in_group
from app.crud.stock import new_stock_entry
from app.crud.user import create_user, get_user_by_id, get_user_by_id_or_name, remove_user, update_user
from app.db.session import get_async_session
from app.models.groups import BaseGroup
from app.models.stock import Stock
from app.models.user import GroupPatch, User
from app.schemas.stock import StockCreate, StockResponse
from app.schemas.user import UserPatch, UserPostElevated, UserPostStudent
from starlette import status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.security.api_key import APIKey
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
async def get_user_root():
    return { "HAHA": "du banane, userroot hier" }


@router.post("/create/student", status_code=status.HTTP_201_CREATED)
async def post_baseuser(user_post: UserPostStudent, session: AsyncSession = Depends(get_async_session)) -> int:
    user_post.hashed_pw = hash_pw(user_post.unhashed_pw)
    new_user_id = await create_user(user_post, session)
    user_group_entry: BaseGroup | None = await add_user_to_basegroup(user_id=new_user_id, session=session)
    # create init stock for student
    stock_data = Stock(game_id=user_post.game_id, company_id=new_user_id, current_cycle_index=0)
    new_stock: StockResponse = await new_stock_entry(entry_data=stock_data, session=session)
    return { f"Student user created with {new_user_id}"}

   

@router.post("/create/teacher", status_code=status.HTTP_201_CREATED)
async def post_teacheruser(user_post: UserPostElevated, session: AsyncSession = Depends(get_async_session)): # current_user: User = Depends(get_current_active_user),
    user_post.hashed_pw = hash_pw(user_post.unhashed_pw)
    new_user_id = await create_user(user_post, session)
    result: User | None = await add_user_to_teachergroup(user_id=new_user_id, session=session)
    return { f"Teacher user created with {new_user_id}"}


@router.post("/create/admin", status_code=status.HTTP_201_CREATED)
async def post_adminuser(new_user: UserPostElevated, session: AsyncSession = Depends(get_async_session)): #api_key: APIKey = Depends(get_api_key),
    new_user.hashed_pw = hash_pw(new_user.unhashed_pw)
    new_user_id = await create_user(user_post=new_user, session=session)
    result: User | None = await add_user_to_admingroup(session=session, user_id=new_user_id)
    return { f"Admin user created with {new_user_id}"}


@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_dummy_by_id(id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    result = await get_user_by_id_or_name(id = id, name = None, session = session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result


@router.get("/get_by_name/{username}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_usery_id(username: str, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    result = await get_user_by_id_or_name(id = None, name = username, session = session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result


@router.patch("/patch", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def patch_dummy(user_data: UserPatch, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    result = await update_user(update_data=user_data, session=session)
    return result

@router.put("/toggle_active", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def toggle_active(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> bool:
    user: None | User = await get_user_by_id(id=user_id, session=session)
    if isinstance(user, NoneType):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="error while toggling activity status")
    old_status = user.is_active
    user.is_active = not old_status
    session.add(user)
    await session.commit()
    await session.refresh(user)
    if user.is_active is not old_status:
        return True
    else:
        return False
    

@router.delete("/{id}", status_code=status.HTTP_200_OK)
@admin_auth_required
async def delete_user(to_be_deleted_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session), api_key: APIKey = Depends(get_api_key)):
    result: bool | None = await remove_user(id=id, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if result == True:
        return { "success" }
    elif result == False:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_async_session)):
    user: User | bool = await authenticate_user(session=session, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=SETTINGS.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.patch("/groups", status_code=status.HTTP_202_ACCEPTED)
@admin_auth_required
async def patch_role(patch_data: GroupPatch, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    result : User | None = await get_user_by_id(patch_data.to_be_patched_user_id)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")

    # remove from groups
    for grp in patch_data.remove_groups:
        group = cls_factory(grp)
        # check whether user already in group
        group_check_result: User | None = await check_user_in_group(user_id=patch_data.to_be_patched_user_id, target_group=group)
        if isinstance(group_check_result, User):
            session.exec(select(group.__class__).where(group.__class__.user_id == patch_data.to_be_patched_user_id))
        else: 
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User not member of one or more group in remove_groups")
    '''
    # add to groups
    for grp in patch_data.add_groups: 
        group = cls_factory(grp)
        group_check_result: User | None = await check_user_in_group(user_id=patch_data.to_be_patched_user_id, target_group=group)
        if isinstance(group_check_result, User):
            result = await session.exec(select(group.__class__).where(group.__class__.user_id == patch_data.to_be_patched_user_id))
            group_entry = result.
        else: 
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already member of one or more group in add_groups")
    '''
    raise NotImplementedError


@router.get("/me")
async def lol():
    return

