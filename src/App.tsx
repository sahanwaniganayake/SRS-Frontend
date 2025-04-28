import Registration from "./RegistrationForm"
import StudentList from "./StudentList"
import StudentUpdate from "./StudentUpdate"




function App() {
  

  return (
   <> 
   <div className="header">
    <h1>Student Registration System</h1>
   </div>
    <div className="Section">
      <Registration/>
      <StudentList/>
      <StudentUpdate/>
    </div>
    </>
    
  )
}


export default App
