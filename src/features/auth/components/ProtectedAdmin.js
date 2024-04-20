import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from './../../user/userSlice';

const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);
    console.log(user);
    console.group(userInfo);

    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else if(!user && userInfo.role!== 'admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }

    return children;
}

export default ProtectedAdmin