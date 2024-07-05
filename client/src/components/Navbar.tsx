import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { User } from '../types/types';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
interface PropsType {
  user: User | null;
}
const Navbar = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Sign Out Successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Sign Out Fail');
    }
  };
  return (
    <nav className="navbar">
      <Link to={'/'} onClick={() => setIsOpen(false)}>
        HOME
      </Link>
      <Link to={'/search'} onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to={'/cart'} onClick={() => setIsOpen(false)}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role == 'admin' && (
                <Link to={'/admin/dashboard'} onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              )}

              <Link to={'/orders'} onClick={() => setIsOpen(false)}>
                Orders
              </Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={'/login'} onClick={handleLogout}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
