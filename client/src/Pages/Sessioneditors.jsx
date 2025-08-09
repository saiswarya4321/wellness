import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Sessioneditors = () => {
  const autoSaveTimer = useRef(null); 
  const { id } = useParams(); // session ID from URL
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
   const token = localStorage.getItem("token")

  const [session, setSession] = useState({
    title: '',
    tags: [],
    json_file_url: '',
  });

  // Fetch session by ID on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
       
        const res = await axios.get(`${baseURL}/session/my-sessions/${id}`, { withCredentials: true, headers: { Authorization: token } });
        setSession(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch session');
      }
    };

    if (id) fetchSession();
  }, [id, baseURL]);

  // Debounce Auto Save Draft
  useEffect(() => {
    // Avoid auto-save for empty sessions
    if (!session.title && !session.json_file_url) return;

    // Clear previous timer if any
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    // Set new debounce timer
    autoSaveTimer.current = setTimeout(() => {
      handleSaveDraft(true); // Auto-save
    }, 5000); // 5 seconds

    // Cleanup on component unmount or next session change
    return () => clearTimeout(autoSaveTimer.current);
  }, [session]); // 🔁 Runs every time session state changes

  // Handle Draft Save
  const handleSaveDraft = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(`${baseURL}/session/my-sessions/save-draft`, { ...session, _id: id }, { withCredentials: true, headers: { Authorization: token } });
     
      navigate('/dashboard/mysession');
       toast.success('Draft saved');
    } catch (err) {
      console.error(err);
      toast.error('Error saving draft');
    }
  };

  // Handle Publish
  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(`${baseURL}/session/my-sessions/publish`, { ...session,_id: id }, { withCredentials: true, headers: { Authorization: token } });
      toast.success("Session published");
      navigate('/dashboard/mysession'); 
    } catch (err) {
      console.error(err);
      toast.error('Error publishing session');
    }
  };

  return (
    <div className="p-20 max-w-xl mx-auto bg-white shadow rounded min-h-screen">
      <h1 className="text-xl font-bold mb-4">Edit Session</h1>

      <label className="block mb-2">
        Title:
        <input
          type="text"
          value={session.title}
          onChange={(e) => setSession({ ...session, title: e.target.value })}
          className="w-full border px-2 py-1 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Tags (comma separated):
        <input
          type="text"
          value={session.tags.join(', ')}
          onChange={(e) => setSession({ ...session, tags: e.target.value.split(',').map(t => t.trim()) })}
          className="w-full border px-2 py-1 rounded mt-1"
        />
      </label>

      <label className="block mb-4">
        JSON File URL:
        <input
          type="text"
          value={session.json_file_url}
          onChange={(e) => setSession({ ...session, json_file_url: e.target.value })}
          className="w-full border px-2 py-1 rounded mt-1"
        />
      </label>

      <div className="flex gap-4">
        <button onClick={handleSaveDraft} className="px-4 py-2 bg-yellow-500 text-white rounded">Save Draft</button>
        <button onClick={handlePublish} className="px-4 py-2 bg-green-600 text-white rounded">Publish</button>
      </div>
      {!token && <p className='text-center bg-red-500 text-white p-2 mt-2 font-bold rounded shadow'>Please login</p>}
    </div>
  );
};

export default Sessioneditors;
