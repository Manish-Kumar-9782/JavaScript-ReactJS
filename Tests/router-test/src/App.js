import './App.css';
import { Route, Routes } from 'react-router-dom';
import StudentForm from './Component/StudentForm';
import BookForm from './Component/BookForm';
import Books from './Component/Books';
import Layout from './Component/Layout';
import Students from './Component/Students';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <Routes>

      {/* Here Route first renders the content from <Layout /> component and after that
        <Layout/> component starts to render on of the active children component using <Outlet />
        placeholder component.
        
        for example: if current url is /Books/add then it will render the <BookForm /> element after rendering the 
        <Layout /> Component. The <Layout /> Component will render <BookForm /> component using the 
        <Outlet /> Component. 
      */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Books/Book/:id" element={<Books />} />
        {/* here use BookView Component */}
        <Route path="/Books/add" element={<BookForm />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/Students/add" element={<StudentForm />} />
        <Route path="/Students/Student/:id" element={<StudentForm />} />
        {/* here use StudentView Component */}
      </Route>
    </Routes>
  );
}

export default App;
