import React, { useState } from 'react';
import { addStudent } from './api';
import axios from 'axios';

function Registration() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const studentData = { name, email, age: Number(age) };
    console.log('Sending request:', studentData);
    try {
      const response = await addStudent(studentData);
      console.log('Response:', response.data);

/*
      const successMessage = response.data.replace(
        /Student\{id=(\d+), name='([^']+)', age=(\d+), email='([^']+)'\}/,
        'Student registered successfully: Name: $2, Age: $3, Email: $4 (ID: $1)'
      );
      
      */


      setMessage('Student added!');
      setName('');
      setEmail('');
      setAge('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error details:', error.response.data, error.response.status);
        setMessage(error.response.data || 'Error adding student.');
      } else {
        console.error('Error:', error);
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <div className="form">
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && (
          <p className={message.includes('Error') || message.includes('already registered') ? 'error' : 'success'}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default Registration;