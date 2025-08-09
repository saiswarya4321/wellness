import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateNew = () => {
  const token = localStorage.getItem("token");
    const autoSaveTimer = useRef(null);
    const [savedSessionId, setSavedSessionId] = useState(null);
      
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [session, setSession] = useState({
    title: '',
    tags: [],
    json_file_url: '',
  });
const [formErrors, setFormErrors] = useState({ title: "", tags: "" })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSession({ ...session, [name]: value });
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setSession({ ...session, tags: tagsArray });
  };
  const validateForm = () => {
  let errors = {};
  let isValid = true;

  if (!session.title.trim()) { // check string directly
    errors.title = 'Please enter a title!';
    isValid = false;
  }
  if (session.tags.length === 0 || session.tags.join('').trim() === '') { 
    errors.tags = 'Please enter tags!';
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};

  const handlePublish = async () => {
    try {
      
    if (!validateForm()) {
            return;
        }
      const res = await axios.post(
        `${baseURL}/session/my-sessions/publish`,
        {
          title: session.title,
          tags: session.tags,
          json_file_url: session.json_file_url,
        },
        {
          withCredentials: true,
          headers: { Authorization: token }
        }
      );

      toast.success('Session published successfully');
      navigate('/dashboard/mysessions');
    } catch (err) {
      console.error(err);
      toast.error('Error publishing session');
    }
  };

  const autoSaveDraft = async () => {
    if (!session.title && !session.json_file_url) return; // Don't save empty
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseURL}/session/my-sessions/save-draft`,
        {
          ...session,
          _id: savedSessionId, // send _id if exists, to update
        },
        {
          withCredentials: true,
          headers: { Authorization: token }
        }
      );
      toast.success("Auto-saved draft");
      setSavedSessionId(res.data._id); // Save the returned ID for updates
    } catch (err) {
      toast.error("Auto-save draft failed", err);
      console.log("Auto-save draft failed", err);
      
    }
  };

  // 🕔 Debounced auto-save effect
  useEffect(() => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(() => {
      autoSaveDraft();
    }, 5000); // 5 sec after last input

    return () => clearTimeout(autoSaveTimer.current);
  }, [session]);


  return (
    <div className="max-w-xl mx-auto mt-8 p-20 bg-white shadow rounded min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Create New Session</h2>

      <label className="block mb-3">
        Title:
        <input
          type="text"
          name="title"
          value={session.title}
          onChange={handleChange}
          placeholder="Enter session title"
          className="w-full mt-1 border px-3 py-2 rounded"
        />
      </label>
       {formErrors.title && <p className='text-red-500 text-xs '>{formErrors.title}</p>}

      <label className="block mb-3">
        Tags (comma separated):
        <input
          type="text"
          name="tags"
          value={session.tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="eg: yoga, evening"
          className="w-full mt-1 border px-3 py-2 rounded"
        />
      </label>
       {formErrors.tags && <p className='text-red-500 text-xs '>{formErrors.tags}</p>}

      <label className="block mb-4">
        JSON File URL:
        <input
          type="text"
          name="json_file_url"
          value={session.json_file_url}
          onChange={handleChange}
          placeholder="https://example.com/session456.json"
          className="w-full mt-1 border px-3 py-2 rounded"
        />
      </label>

      <button
        onClick={handlePublish}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Publish
      </button>
      {!token && <p className='text-center bg-red-500 text-white p-2 mt-5 font-bold rounded shadow'>Please login</p>}
    </div>
  );
};

export default CreateNew;
