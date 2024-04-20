import React from 'react'
import Navbar from "../features/navbar/Navbar";
import UserProfile from '../features/user/components/userProfile';
import Footer from "../features/common/Footer"

const UserProfilePage = () => {
  return (
    <>
    <Navbar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
            <UserProfile />
        </Navbar>
        <Footer></Footer>
        </>
  )
}

export default UserProfilePage