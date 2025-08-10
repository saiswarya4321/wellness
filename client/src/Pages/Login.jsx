import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'

function Login() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/users/login`, formData);

      toast.success(res.data.message || "Login successful");
      console.log("Token:", res.data.token);

      // Save token if needed
      localStorage.setItem('token', res.data.token);

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
   <div className='min-h-screen p-2 flex justify-center items-center bg-gray-100'>
      
        <form onSubmit={handleSubmit}  className='max-w-md bg-white flex flex-col gap-3 p-2 items-center shadow rounded min-w-[300px]  md:min-w-[450px] '>
            <h2 className='text-gray-500 font-bold p-2 text-2xl'>Login</h2>
<input onChange={handleChange} value={formData.email} type='email' name='email' required  placeholder='Email' className='p-2 focus:outline-none border border-gray-300 w-full rounded-xl'/>
<input onChange={handleChange} value={formData.password} type='password' name='password' required placeholder='Password' className='p-2 focus:outline-none border border-gray-300 w-full rounded-xl'/>
<button type='submit' className='bg-amber-600 text-white font-bold p-2 rounded sm:w-[100px]'>Login</button>

<Link to={'/signup'} className='text-gray-500 text-xs font-bold'>New user</Link>
        </form>
      
    </div>
  )
}

export default Login
