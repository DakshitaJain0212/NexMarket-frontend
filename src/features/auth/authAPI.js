import { message, notification } from "antd";
import { navigate } from "react-router-dom";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://nex-market-backend.vercel.app/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://nex-market-backend.vercel.app/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        notification.success({
          message: "login Successfully!"
        })
        resolve({ data });
      } else {
        const err = await response.json();
        console.log(err);
        notification.error({
          message: 'Password Requirements',
          description: (
            <ul>
              <li>It must contain at least one capital letter.</li>
              <li>It must be at least 8 characters long.</li>
              <li>It must not contain spaces or special characters.</li>
              <li>It should include a mix of uppercase letters, lowercase letters, numbers, and symbols for increased security.</li>
            </ul>
          ),
          duration: 0, // Duration 0 indicates it won't auto close
        });
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
      const response = await fetch("https://nex-market-backend.vercel.app/auth/check", {
        method: "GET",
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
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://nex-market-backend.vercel.app/auth/logout");
      if (response.ok) {
        resolve({ data: "success" });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export function resetPasswordRequest(email) {
  // const navigate = useNavigate();
  console.log(email);
  return new Promise(async (resolve, reject) => {
    try {
      console.log("safe work");
      const response = await fetch("https://nex-market-backend.vercel.app/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        notification.success({
          message: "Mail Sent!",
          description: "Mail sent successfully.",
        });

        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://nex-market-backend.vercel.app/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        notification.success({
          message: "Password Reset!",
          description: "Password reset successfully.",
        });
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
