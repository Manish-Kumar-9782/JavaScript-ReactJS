import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import Layout from './Component/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Students from './features/studentSlice/Students';
import AddStudentForm from './features/studentSlice/AddStudentForm';
import StudentAsideLayout from './Component/StudentAsideLayout';
// Now here we will implement all the Routes
import CoursePanel from './features/courseSlice/CoursePanel';
import AddCourseForm from './features/courseSlice/AddCourseForm';
import CourseAsideLayout from './Component/CourseAsideLayout';
import AddCourseCategory from './features/courseSlice/AddCourseCategory';
import CourseProfile from './features/courseSlice/CourseProfile';
import StudentProfile from './features/studentSlice/StudentProfile';
import StudentProfileSections from './features/studentSlice/StudentProfile/StudentProfileSections';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Now we need to show all the student cards by default */}\

        <Route index element={<Dashboard />} />

        <Route path='students' element={<StudentAsideLayout />}>
          <Route index element={<Students />} />
          <Route path='addStudent' element={<AddStudentForm />} />
          <Route path='dropStudent' element={<Students />} />
          <Route path=":student_id" element={<StudentProfile />} />
          <Route path=':student_id/course/:course_id' element={<StudentProfileSections />} />
        </Route>

        <Route path="courses" element={<CourseAsideLayout />}>
          <Route index element={<CoursePanel />} />
          <Route path='addCourse' element={<AddCourseForm />} />
          <Route path='addCourseCategory' element={<AddCourseCategory />} />
          <Route path=':id' element={<CourseProfile />} />

        </Route>

      </Route>
    </Routes>
  );
}

export default App;
