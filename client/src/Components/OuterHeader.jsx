import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function OuterHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full z-10">
      {/* Logo */}
      <div className="text-violet-600 text-3xl font-bold">Wellness</div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden text-2xl"
      >
        {isOpen ? '×' : '☰'}
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } sm:block absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent`}
      >
        <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4 py-4 sm:p-0">
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
          <li className='bg-white text-violet-500 border border-violet-500 p-2'><Link to="/signup" onClick={() => setIsOpen(false)}>Join us</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default OuterHeader;
