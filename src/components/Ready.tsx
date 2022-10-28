import React, {FC} from 'react';
import success from './../assets/success.svg'
import {Link, NavLink} from "react-router-dom";

interface IReady {
    count: number
}

const Ready: FC<IReady> = ({ count=1 }) => {
    return (
        <div className="success-block">
            <img src={success} alt="Success" />
            <h3>Успешно!</h3>
            <p>Всем {count} пользователям отправлено приглашение.</p>
            <NavLink to={'/'}>
                <button className="send-invite-btn">Назад</button>
            </NavLink>

        </div>
    );
};

export default Ready;