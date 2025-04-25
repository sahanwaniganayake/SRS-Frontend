import React, {useState} from "react";
import { addStudent } from "./api";


function Registration(){

    const [name,setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            await addStudent({
              name,
              email,
              age: Number(age),
            });
            setMessage('Student added!');
            setName('');
            setEmail('');
            setAge('');
          } catch (error) {
            setMessage('Error adding student.');
          }
        };

    return(
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
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    />
                </div>
                <button type="submit">Submit</button>

            </form>
            {message && (
                <p className={message.includes('Error') ? 'error' : 'success'}>
                    {message}
                </p>
            )}
        </div>
        </>
    )
}

export default Registration;