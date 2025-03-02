import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    toast.success('Logout Successfully')
    navigate('/signin')
    dispatch(signout());
  }

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">CRUD App</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span>{user.email}</span>
              <button onClick={() => logoutUser()} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="bg-green-500 px-4 py-2 rounded">Sign In</Link>
              <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
