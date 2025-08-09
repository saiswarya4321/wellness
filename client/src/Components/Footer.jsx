import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 w-full">
      <p>&copy; {new Date().getFullYear()} Wellness App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
