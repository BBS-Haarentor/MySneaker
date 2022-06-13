

from datetime import datetime
import logging
from types import NoneType
from fastapi import Depends, HTTPException
from sqlmodel import or_, select
from app.models.game import Game
from app.models.groups import TeacherGroup
from app.models.user import User
from sqlmodel.ext.asyncio.session import AsyncSession
from app.schemas.user import UserBase, UserPatch, UserPwChange, UserResponseWithGradeName
from app.api.auth.util import pwd_context, hash_pw



async def create_user(user_post: UserBase, session: AsyncSession) -> int:
    """Function to create a new User entry via ORM

    Args:
        user_post (UserBase): UserPost-Object with parameters hashed_pw and name set, for students game_id is also set
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        int: id of the newly created user entry
    """
    if user_post.game_id is not None:
        new_user = User(name=user_post.name, hashed_pw=user_post.hashed_pw, game_id=user_post.game_id)
    else:
        new_user = User(name=user_post.name, hashed_pw=user_post.hashed_pw)
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    logging.info(f"created new User with id: {new_user.id}")
    return new_user.id

async def get_user_by_id_or_name(id: int | None, name: str | None, session: AsyncSession) -> User | None:
    """Function to get a User-Object via ORM given a name or id

    Args:
        id (int | None): Optional id parameter to get the User by
        name (str | None): Optional name parameter to get the User by
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        User | None: User-Object or NoneType-Object respectively if User was found by supplied parameter or not
    """
    result = await session.exec(select(User).where(or_(User.id == id, User.name == name)))
    return result.one_or_none()


async def get_user_by_id(id: int, session: AsyncSession) -> User | None:
    """Function to get a User-Object via ORM given id

    Args:
        id (int): id parameter to get the User by
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        User | None: User-Object or NoneType-Object respectively if User was found by supplied parameter or not
    """
    result = await session.exec(select(User).where(User.id == id))
    return result.one_or_none()


async def get_user_by_name(search_name: str, session: AsyncSession) -> User | None:
    """Function to get a User-Object via ORM given name

    Args:
        search_name (str): name parameter to get the User by
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        User | None: User-Object or NoneType-Object respectively if User was found by supplied parameter or not
    """
    result = await session.exec(select(User).where(User.name == search_name))
    return result.one_or_none()


async def update_user(update_data: UserPatch, session: AsyncSession) -> User | None:
    to_be_updated_user: User | None = await get_user_by_id(id=update_data.id, session=session)
    if isinstance(to_be_updated_user, NoneType):
        return to_be_updated_user
    to_be_updated_user.name = update_data.name
    to_be_updated_user.email = update_data.email
    session.add(to_be_updated_user)
    await session.commit()
    await session.refresh(to_be_updated_user)

    return to_be_updated_user

async def update_last_login(user: User, session: AsyncSession) -> bool:
    """Function to update the last login field of a User upon login

    Args:
        user (User): User-Object supplied by endpoint dependency injection current_user
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        bool: boolean to indicate whether the update attempt was successful
    """
    now = datetime.now()
    user.last_login = now
    session.add(user)
    await session.commit()
    await session.refresh(user)
    if user.last_login == now:
        return True
    else:
        return False


async def remove_user(id: int, session: AsyncSession) -> bool | None:
    """Function to remove a User from the database via the id of the User

    Args:
        id (int): id parameter of the User to be removed
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        bool | None: boolean to indicate whether the remove attempt was successful or NoneType-Object if no User was found with the given id
    """
    result = await session.exec(select(User).where(User.id == id))
    to_be_deleted: User | None = result.one_or_none()
    if isinstance(to_be_deleted, NoneType):
        return to_be_deleted
    await session.delete(to_be_deleted)
    await session.commit()
    double_check = await session.exec(select(User).where(User.id == id))
    typed_double_check: User | None = double_check.one_or_none()
    if isinstance(typed_double_check, NoneType):
        return True
    else:
        return False
    
    
async def update_pw(update_data: UserPwChange, session: AsyncSession) -> User | None:
    """Function to update the password of a User

    Args:
        update_data (UserPwChange): SQLModel-Schema with old and new password
        session (AsyncSession): An asynchronous Session handed down via function call from endpoint

    Returns:
        User | None: returns User with new hashed_pw parameter set
    """
    result = await session.exec(select(User).where(User.id == update_data.id))
    user: User = result.one_or_none()
    if pwd_context.verify(update_data.old_pw, user.hashed_pw):
        user.hashed_pw = hash_pw(update_data.new_pw)
        return user
    else:
        return None


async def get_all_users_for_teacher(user_id: int, session: AsyncSession) -> list[UserResponseWithGradeName]:
    game_result = await session.exec(select(Game).where(Game.owner_id == user_id))
    game_list: list[Game] = game_result.all()
    
    param_dict = {}
    
    for g in game_list:
        param_dict[g.id] = g.grade_name
    
    game_ids: list[int]= []
    for g in game_list:
        game_ids.append(g.id)
        
    game_names: list[str] = []
    for g in game_list:
        game_names.append(g.grade_name)
        
    result_list: list[UserResponseWithGradeName] = []
    r = await session.exec(select(User))
    unfiltered_user_list: list[User] = r.all()
    
    for u in unfiltered_user_list:
        if u.game_id in game_ids:
            new_u = UserResponseWithGradeName.from_orm(u)
            
            new_u.grade_name = param_dict[u.game_id]
            result_list.append(new_u)
    return result_list


async def check_user_in_game(game_id: int, user_id: int, session: AsyncSession) -> bool | None:
    user_result = await session.exec(select(User).where(User.id == user_id))
    user: User | None = user_result.one_or_none()
    if isinstance(user, NoneType):
        return None
    else:
        if user.game_id == game_id:
            return True
        else:
            return False
    
async def toggle_user_active(user_id: int, session: AsyncSession) -> bool | None: 
    result = await session.exec(select(User).where(User.id == user_id))
    user: User | None = result.one_or_none()
    if isinstance(user, NoneType):
        return None
    old_status = user.is_active
    user.is_active = not old_status
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user.is_active


async def get_teacher_list(session: AsyncSession) -> list[User]:
    result = await session.exec(select(User).join(TeacherGroup))
    teacher_list: list[User] = result.all()
    return teacher_list