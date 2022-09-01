from datetime import timedelta
import logging
from types import NoneType
from fastapi import APIRouter, Depends, HTTPException
from app.api.auth.api_key_auth import get_api_key
from app.core.config import SETTINGS, cls_factory
from app.crud.game import get_all_games_by_owner, get_game_by_id
from app.crud.groups import add_user_to_admingroup, add_user_to_basegroup, add_user_to_teachergroup, check_user_in_admingroup, check_user_in_basegroup, check_user_in_group, check_user_in_teachergroup
from app.crud.stock import new_stock_entry
from app.crud.user import create_user, get_teacher_list, get_user_by_id, get_user_by_id_or_name, get_user_status, remove_user, toggle_user_active, update_pw, update_user
from app.db.session import get_async_session
from app.db.init_db import init_admin, init_teachers
from app.models.game import Game
from app.models.groups import BaseGroup
from app.models.stock import Stock
from app.models.user import User
from app.schemas.group import GroupBase
from app.schemas.user import UserPostElevated, UserPostStudent, UserPwChange, UserResponse
from starlette import status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from fastapi.security.api_key import APIKey
from fastapi.security import OAuth2PasswordRequestForm
from app.api.auth.util import pwd_context, hash_pw, base_auth_required, get_current_active_user, admin_auth_required, teacher_auth_required, create_access_token
from app.services.user_service import UserService
from app.validation.user import validate_student_signup


router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
async def get_user_root():
    return {"HAHA": "du banane, userroot hier"}


@router.post("/create/student", status_code=status.HTTP_201_CREATED)
async def post_baseuser(user_post: UserPostStudent, session: AsyncSession = Depends(get_async_session)) -> int:
    user_service = UserService(session=session)
    return await user_service.create_student(create_data=user_post)
    #await user_service.validate(user_data=user_post)

    user_post.hashed_pw = hash_pw(user_post.unhashed_pw)
    user_post.unhashed_pw = ""
    # check game signup enabled
    game: Game = await get_game_by_id(id=user_post.game_id, session=session)
    if not game.signup_enabled or not game.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Game is not active or signup is disabled")
    new_user_id = await create_user(user_post=user_post, session=session)
    user_group_entry: BaseGroup | None = await add_user_to_basegroup(user_id=new_user_id, session=session)
    # create init stock for student
    stock_data = Stock(game_id=user_post.game_id, company_id=new_user_id,
                       current_cycle_index=game.current_cycle_index)
    new_stock: Stock = await new_stock_entry(entry_data=stock_data, session=session)
    return new_user_id


@router.post("/create/teacher", status_code=status.HTTP_201_CREATED)
@admin_auth_required
async def post_teacheruser(user_post: UserPostElevated, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> int:
    user_service = UserService(session=session)
    return await user_service.create_teacher(create_data=user_post)
    
    if user_post.name == "":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Empty name not allowed")
    user_post.hashed_pw = hash_pw(user_post.unhashed_pw)
    new_user_id = await create_user(user_post=user_post, session=session)
    result: User | None = await add_user_to_teachergroup(user_id=new_user_id, session=session)
    toggle_result: bool = await toggle_user_active(user_id=new_user_id, session=session)
    if not toggle_result:
        await session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong with activating the user")
    return new_user_id


#@router.post("/create/admin", status_code=status.HTTP_201_CREATED)
async def post_adminuser(new_user: UserPostElevated, api_key: APIKey = Depends(get_api_key), session: AsyncSession = Depends(get_async_session)) -> int:
    if new_user.name == "":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Empty name not allowed")
    new_user.hashed_pw = hash_pw(new_user.unhashed_pw)
    new_user_id = await create_user(user_post=new_user, session=session)
    result: User | None = await add_user_to_admingroup(session=session, user_id=new_user_id)
    toggle_result: bool = await toggle_user_active(user_id=new_user_id, session=session)
    if not toggle_result:
        await session.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Something went wrong with activating the user")
    return new_user_id


@router.get("/get_by_id/{id}", status_code=status.HTTP_200_OK, response_model=UserResponse)
@teacher_auth_required
async def get_user_by_id(id: int, 
                         current_user: User = Depends(get_current_active_user), 
                         session: AsyncSession = Depends(get_async_session)):
    user_service = UserService(session=session)
    return await user_service.user_repo.read(id=id)
    
    result = await get_user_by_id_or_name(id=id, name=None, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result
    


@router.get("/get_by_name/{username}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_user_by_name(username: str, 
                           current_user: User = Depends(get_current_active_user), 
                           session: AsyncSession = Depends(get_async_session)):
    user_service = UserService(session=session)
    return await user_service.user_repo.get_user_by_name(name=username)    
    
    result = await get_user_by_id_or_name(id=None, name=username, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result


@router.put("/toggle_active/{user_id}", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def toggle_user_active_by_id(user_id: int, 
                                   current_user: User = Depends(get_current_active_user), 
                                   session: AsyncSession = Depends(get_async_session)) -> bool:
    user_service = UserService(session=session)
    # auth check if target teacher and current admin
    return await user_service.toggle_active(user_id=user_id)
    
    result = await toggle_user_active(user_id=user_id, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result

# dep
@router.delete("/delete/{user_id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def delete_user(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    user_status = await get_user_status(user_id=user_id, session=session)
    if user_status:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="It is not allowed to delete active Users. Please deactivate the User before deleting.")
    games: list[Game] = await get_all_games_by_owner(user_id=user_id, session=session)
    logging.warning(f"{len(games)=}")
    if len(games) > 0:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"It is not allowed to delete Users that own games. Delete or move ownership of the games with the ids: {[g.id for g in games]}")
    result: bool | None = await remove_user(id=user_id, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if result == True:
        return {"success"}
    elif result == False:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete("/delete_student/{user_id}", status_code=status.HTTP_202_ACCEPTED)
@teacher_auth_required
async def delete_student(user_id: int, 
                         current_user: User = Depends(get_current_active_user), 
                         session: AsyncSession = Depends(get_async_session)):
    user_service: UserService = UserService(session=session)
    return await user_service.remove_user(id=user_id)


@router.delete("/delete_teacher/{user_id}", status_code=status.HTTP_202_ACCEPTED)
@admin_auth_required
async def delete_teacher(user_id: int, 
                         current_user: User = Depends(get_current_active_user), 
                         session: AsyncSession = Depends(get_async_session)):
    user_service: UserService = UserService(session=session)
    return await user_service.remove_teacher(user_id=user_id)


@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: AsyncSession = Depends(get_async_session)):
    user_service: UserService = UserService(session=session)
    user: User = await user_service.authenticate_user(name=form_data.username, password=form_data.password)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=SETTINGS.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.put("/modify", status_code=status.HTTP_202_ACCEPTED, response_model=UserResponse)
@base_auth_required
async def modify(update_data: UserPwChange, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    # verify old pw
    if not update_data.old_pw:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Old password not supplied")
    if not pwd_context.verify(update_data.old_pw, current_user.hashed_pw):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Old password does not match")
    update_data.id = current_user.id
    user: User = await update_pw(update_data=update_data, session=session)

    return user


@router.put("/teacher/modify/", status_code=status.HTTP_202_ACCEPTED, response_model=UserResponse)
@teacher_auth_required
async def modify_by_teacher(update_data: UserPwChange, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)):
    user: User | None = await update_pw(update_data=update_data, session=session)
    if isinstance(user, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="No User found by the supplied id")

    return user


@router.get("/me", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def me(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> User:
    return current_user


@router.get("/my_auth", status_code=status.HTTP_200_OK)
async def my_auth(current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> str:
    auth_str = "no group"
    if isinstance((await check_user_in_basegroup(user_id=current_user.id, session=session)), User):
        auth_str = "base"
    if isinstance((await check_user_in_teachergroup(user_id=current_user.id, session=session)), User):
        auth_str = "teacher"
    if isinstance((await check_user_in_admingroup(user_id=current_user.id, session=session)), User):
        auth_str = "admin"
    return auth_str


@router.get("/teacher_list", status_code=status.HTTP_200_OK, response_model=list[UserResponse])
@admin_auth_required
async def get_all_teachers(current_user: User = Depends(get_current_active_user), 
                           session: AsyncSession = Depends(get_async_session)) -> list[User]:
    user_service: UserService = UserService(session=session)
    return await user_service.user_repo.get_all_teachers()

    teacher_list: list[User] = await get_teacher_list(session=session)
    return teacher_list


@router.get("/user_status/{user_id}", status_code=status.HTTP_200_OK)
@teacher_auth_required
async def get_user_status_by_id(user_id: int, current_user: User = Depends(get_current_active_user), session: AsyncSession = Depends(get_async_session)) -> bool:
    user_service: UserService = UserService(session=session)
    user: User = await user_service.user_repo.read(id=user_id)
    return user.is_active

    result = await get_user_status(user_id=user_id, session=session)
    if isinstance(result, NoneType):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    else:
        return result


@router.post("/init_a", status_code=status.HTTP_201_CREATED)
async def init_a(api_key: APIKey = Depends(get_api_key), session: AsyncSession = Depends(get_async_session)) -> int:
    new_admin_id = await init_admin(session=session)
    toggle_result = await toggle_user_active(user_id=new_admin_id, session=session)
    return new_admin_id


@router.post("/init_t", status_code=status.HTTP_201_CREATED)
async def init_t(api_key: APIKey = Depends(get_api_key), session: AsyncSession = Depends(get_async_session)) -> list[int]:
    result = await init_teachers(session=session)
    for _ in result:
        toggle_result = await toggle_user_active(user_id=_, session=session)
    return result
