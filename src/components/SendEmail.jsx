import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SendEmail.css';

const SendEmail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token'); 
    const email = localStorage.getItem('email');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('to', to.split(','));
    formData.append('subject', subject);
    formData.append('body', body);
    for (const file of files) {
      formData.append('attachments', file);
    }

    try {
      const response = await axios.post(
        'https://gmail-clone-backend-4.onrender.com/api/send-email',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      setMessage(response.data.message);
      alert("Email sent successfully");
      navigate('/dashboard');
    } catch (err) {
      console.error('Error sending email:', err);
      setError(err.response?.data?.message || 'Failed to send email');
    }
  };

  return (
    <div className="send-email-container">
      <h1>Send Email</h1>
      <form onSubmit={handleSendEmail}>
        <div className="form-group">
          <label>To:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter recipient emails separated by commas"
            required
          />
        </div>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Attachments:</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SendEmail;
























