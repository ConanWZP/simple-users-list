import React, {ChangeEvent, useEffect, useState} from 'react';
import "./styles.scss"
import UserList from "./components/UserList/UserList";
import axios from 'axios';
import Ready from './components/Ready';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

export interface IUsers {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

interface IUsersInfo {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUsers[]
}



const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState<IUsers[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [invitedUsers, setInvitedUser] = useState<number[]>([])
    const [success, setSuccess] = useState<boolean>(false)



    const fetchUser = async () => {
        const usersInfo =  await axios.get<IUsersInfo>('https://reqres.in/api/users')
            .then(response => {
                const dataUsers = response.data
                setUsers(dataUsers.data)
                setIsLoading(false)
            })
    }

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const onClickInvite = (id: number) => {

        if (invitedUsers.includes(id)) {
            setInvitedUser(prevState => prevState.filter(value => value !== id))
        } else {
            setInvitedUser(prevState => [...prevState, id])
        }
    }



    return (
        <BrowserRouter>


        <div className={"App"}>
            <Routes>
                { success ?
                    <Route path={'/ready'} element={<Ready count={invitedUsers.length} />} />
                    :
                    <Route path={'*'} element={<div>Ошибка 404</div>} />
                }



                    <Route path={'/'} element={<UserList //onClickSend={onClickSend}
                                                         searchValue={searchValue}
                                                         isLoading={isLoading} users={users}
                                                         onChangeSearch={onChangeSearch}
                                                         onClickInvite={onClickInvite}
                                                         invitedUsers={invitedUsers} setSuccess={setSuccess}/>}
                           />


            </Routes>
        </div>
        </BrowserRouter>
    );
};

export default App;