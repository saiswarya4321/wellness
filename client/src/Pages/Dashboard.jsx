import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/session/sessions`);
        setSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSessions();
  }, []);

  if (loading) return <p>Loading sessions...</p>;

  return (
    <div className="pt-20 pl-4 pr-4 pb-4 min-h-screen bg-gray-100 ">
      <h2 className="text-xl font-bold mb-4">Available Wellness Sessions</h2>
      <ul className="flex flex-wrap w-full gap-4">
        {sessions.map(session => (
          <li key={session._id} className="p-4 bg-white shadow rounded min-w-[100px]  sm:min-w-[150px] flex-1 basis-[20%] md:basis[25%] lg:basis-[20%]">
            <h3 className="font-semibold  text-gray-600 p-1">{session.title}</h3>
            <p className="text-sm text-gray-500"> {session.tags.join(', ')}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
