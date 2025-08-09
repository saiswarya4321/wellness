import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function MySessions() {
  const token=localStorage.getItem("token")
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [mySessions, setMySessions] = useState([]);

 useEffect(() => {
  const fetchSessions = async () => {
    try {
      
      
      if(!token){
        console.error("Please Login")
      }

      console.log("Sending request with headers:", {
        Authorization: token
      });

      const res = await axios.get(`${baseURL}/session/my-sessions`, {
        withCredentials: true,
        headers: {
          Authorization: token
        }
      });

      console.log("response", res.data);
      setMySessions(res.data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    }
  };

  fetchSessions();
  

}, []);
const drafts = mySessions.filter(s => s.status === "draft");
const published = mySessions.filter(s => s.status === "published");


  return (
    <div className='pt-20 pl-4 pr-4 pb-4 bg-gray-100 min-h-screen'>
      <h1 className='text-gray-600 text-2xl font-bold mb-4'>My Sessions</h1>
      <Link to="/dashboard/createnew">
  <button className='bg-green-500 text-white text-sm font-bold p-2 rounded'>
    + Create New
  </button>
</Link>
      <h2 className='text-xl font-semibold mt-6 mb-2'> Drafts</h2>
<ul className='flex  flex-wrap gap-2 w-full '>
  {drafts.map(session => (
    <li key={session._id} className='p-2 bg-white rounded shadow flex-1 min-w-[100px] sm:min-w-[150px]  sm:basis-[20%] md:basis-[25%] lg:basis-[20%]'>
      <h3 className='font-bold'>{session.title}</h3>
      <p>Tags: {session.tags.join(', ')}</p>
      <Link to={`/dashboard/sessioneditor/${session._id}`} className='text-blue-500 underline'>Edit</Link>
    </li>
  ))}
</ul>

<h2 className='text-xl font-semibold mt-6 mb-2'>Published</h2>
<ul className='flex flex-wrap gap-2 w-full'>
  {published.map(session => (
    <li key={session._id} className='p-4 bg-white rounded shadow flex-1  min-w-[150px]  sm:basis-[20%] md:basis-[25%] lg:basis-[20%]'>
      <h3 className='font-bold'>{session.title}</h3>
      <p>Tags: {session.tags.join(', ')}</p>
      <Link to={`/dashboard/sessioneditor/${session._id}`} className='text-green-600 underline'>View / Edit</Link>
    </li>
  ))}
</ul>
{!token && <p className='text-center bg-red-500 text-white p-2 mt-2 font-bold rounded shadow'>Please login</p>}
    </div>
  );
}

export default MySessions;
