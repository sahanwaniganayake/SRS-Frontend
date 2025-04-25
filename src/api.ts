import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/student',
});

export const addStudent = (student: { name: string; email: string; age: number }) => {
  return api.post('/students', student);
};