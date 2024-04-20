import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';

function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
const token = localStorage.getItem("token");
console.log(token);
console.log(children);

  if (user) {
    return children;
  }
  else return <Navigate to="/login"></Navigate>;
}

export default Protected;