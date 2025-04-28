import {useState ,useEffect} from "react";
import { getAllStudents } from "./api";


interface Student{
    id:number;
    name:string;
    age:number;
    email:string;
}

function StudentList() {
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
                </thead>
                <tbody>
                    {students.map((student) =>(
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.email}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </div>

);

}
export default StudentList;