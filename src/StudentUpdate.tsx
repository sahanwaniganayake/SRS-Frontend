import { useState } from "react";
import { updateStudent } from "./api";
import axios from "axios";
import "./StudentUpdate.css";


interface StudentUpdateProps{
    onStudentUpdated?: () =>void;
}

function StudentUpdate({onStudentUpdated}:StudentUpdateProps){
    const[id, setId] = useState('');
    const[name, setName] =useState('');
    const[age, setAge] = useState('');
    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');


        const studentData : {name?:string; age?:number; email?:string;} = {};
        if(name) studentData.name=name;
        if(email) studentData.email=email;
        if(age) studentData.age=Number(age);

        if(!id || isNaN(Number(id))){
            setMessage('Please enter a valid student ID');
            return;
        }

        console.log('Sending update request:',{id: Number(id), ...studentData});
        try{
            const response = await updateStudent(Number(id), studentData);
            console.log('Response:', response.data);
            setMessage(response.data);
            setId('');
            setName('');
            setAge('');
            setEmail('');

            if(onStudentUpdated){
                onStudentUpdated();
            }
        }catch (error){
            if(axios.isAxiosError(error) && error.response){
                console.error('Error details:', error.response.data, error.response.status);
                setMessage(error.response.data || 'Error updating student');
            }else{
                console.log('Error:', error);
                setMessage('An unexpected error occurs')
            }
        }
    
    };



    return(
        <div className="update-student-form">
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    type="number"
                    placeholder="Student ID"
                    value={id}
                    onChange={(e)=> setId(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
            {message && (<p>{message}</p>)}

        </div>
    );
}


export  default StudentUpdate;