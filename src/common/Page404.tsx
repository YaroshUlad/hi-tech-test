import React from 'react';

import error404img from './../assets/404.svg';

import './404.css'
import {NavLink} from "react-router-dom";


export const Page404 = (): React.ReactElement => {
    return (
        <div className={'wrapper'}>
            <img src={error404img} alt="404 error"/>
            <NavLink to={'/'}>TO MAIN PAGE</NavLink>
        </div>
    );
};