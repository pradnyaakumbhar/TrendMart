import { useState } from 'react';
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const user = { _id: 'hgvk', role: 'admin' };
const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = () => {
    setIsOpen(false);
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
              <button>
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
