import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow fixed w-full z-10">
      <div className="text-3xl text-violet-600 font-bold">Wellness</div>

      {/* Hamburger for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden block text-2xl"
      >
        {isOpen ? '×' : '☰'}
      </button>

      {/* Navigation Links */}
      <nav className={`sm:flex ${isOpen ? 'block' : 'hidden'} absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent px-4 sm:px-0`}>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 sm:py-0">
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><Link to="/dashboard" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><Link to="/dashboard/mysessions" onClick={() => setIsOpen(false)}>My Sessions</Link></li>
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
