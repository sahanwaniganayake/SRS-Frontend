import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/student',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addStudent = (student: { name: string; email: string; age: number }) => {
  return api.post('/register', student);
};

export const getAllStudents = () =>{
    return api.get('/');
}