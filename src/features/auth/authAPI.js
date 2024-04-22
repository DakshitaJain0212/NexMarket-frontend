import { message, notification } from 'antd';
import { navigate } from 'react-router-dom';

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
      
        const data = await response.json();
        console.log(data.token)
        
        localStorage.setItem("token", data.token);
        resolve({ data });
      } else {
        const err = await response.json();
        console.log(err);
        message.error(err.error)
        reject(err);
      }
    } catch (error) {
      reject(error);
    }

  });
}

export function checkAuth(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/check', {
        method: 'GET',
        body: JSON.stringify(userId),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}


export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout');
      if (response.ok) {
        resolve({ data:'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}


export function resetPasswordRequest(email) {
  // const navigate = useNavigate();
  console.log(email);
  return new Promise(async (resolve, reject) => {
    try {
      console.log("safe work")
      const response = await fetch('http://localhost:8000/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        notification.success({
          message: 'Mail Sent!',
          description: 'Mail sent successfully.',
        });
        // navigate(`/reset-password?token=${data.token}&email=${data.email}`)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
     
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        notification.success({
          message: 'Password Reset!',
          description: 'Password reset successfully.',
        });
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}