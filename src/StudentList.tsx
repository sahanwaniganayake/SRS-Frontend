import {useState ,useEffect} from "react";
import { deleteStudent, getAllStudents } from "./api";
import axios from "axios";
import "./StudentList.css";


interface Student{
    id:number;
    name:string;
    age:number;
    email:string;
}

interface StudentListProps{
    OnStudentDeleted?: () => void;
}

function StudentList({OnStudentDeleted}:StudentListProps) {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState<string>('');
  
    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const response = await getAllStudents();
          console.log('Fetched students:', response.data);
          setStudents(response.data);
          setError('');
        } catch (err) {
          console.error('Error fetching students:', err);
          setError('Failed to load students. Please try again.');
        }
      };
      fetchStudents();
    }, []);

    const handleDelete = async(id: number) => {
        if(!window.confirm(`Are you sure do you want to delete student with student id: ${id}`)){
            return;
        }

        try {
            const response = await deleteStudent(id);
            console.log('Delete response:', response.data);
            setStudents(students.filter((student) => student.id !== id)); 
            setError('');
            if (OnStudentDeleted) {
              OnStudentDeleted;
            }
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              console.error('Error deleting student:', error.response.data, error.response.status);
              setError(error.response.data || 'Error deleting student.');
            } else {
              console.error('Error:', error);
              setError('An unexpected error occurred.');
            }
          }
    }

return(
    <div className="student-list">
        <h2>All students</h2>
        {students.length===0 && !error ?(
            <p>No student found.</p>
        ):(
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {students.map((student) =>(
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleDelete(student.id)}> - </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>

);

}
export default StudentList;