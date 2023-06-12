import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './App/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchStudent } from './features/studentSlice/studentSlice';
import { fetchCourse } from './features/courseSlice/courseSlice';
import { fetchCategories } from './features/courseCategory/courseCategorySlice';
const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(fetchStudent());
store.dispatch(fetchCourse());
store.dispatch(fetchCategories());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

