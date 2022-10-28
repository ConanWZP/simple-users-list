import React, {ChangeEvent, FC} from 'react';
import Skeleton from './Skeleton';
import User from './User';
import "./../../styles.scss"
import {IUsers} from "../../App";
import {NavLink, useNavigate} from "react-router-dom";

type UserListType = {
    isLoading: boolean
    users: IUsers[],
    searchValue: string,
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
    onClickInvite: (id: number) => void,
    invitedUsers: number[],
    //onClickSend: () => void,
    setSuccess: (e: boolean) => void
}

const UserList: FC<UserListType> = ({
                                        isLoading,
                                        users,
                                        onChangeSearch,
                                        searchValue,
                                        onClickInvite,
                                        invitedUsers,
                                        setSuccess
                                    }) => {

    const navigate = useNavigate()
    const onClickSend = () => {
        setSuccess(true)
        navigate('/ready')
    }


    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                </svg>
                <input onChange={onChangeSearch} value={searchValue} type="text" placeholder="Найти пользователя..."/>
            </div>
            {isLoading ?
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
                :
                <ul className="users-list">
                    {
                        users.filter(el => {
                            const full_name = (el.first_name + el.last_name).toLowerCase().replaceAll(' ', '')
                            const lowSearchValue = searchValue.toLowerCase().replaceAll(' ', '')

                            if (full_name.includes(lowSearchValue) || el.email.toLowerCase().includes(lowSearchValue)) {
                                return true
                            }
                        })
                            .map(user => (
                                <User key={user.id} user={user} onClickInvite={onClickInvite}
                                      invitedUsers={invitedUsers}/>
                            ))
                    }
                </ul>
            }
            {
                invitedUsers.length > 0 &&
                <button onClick={onClickSend} className="send-invite-btn">Отправить приглашение</button>
            }


        </>
    );
};

export default UserList;