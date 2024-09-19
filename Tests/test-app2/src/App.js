import './App.css';
import FetchData from './Component/FetchData';
import Reducer from './Component/Reducer';
import TodoList from './TodoList/TodoList';

import ParentComponent from './HOC/ParentComponent';
import ChildComponent from './HOC/ChildComponent';


function App() {
  return (
    <div className="App">
      <ParentComponent
        childComponent={<ChildComponent />}
      />
    </div>
  );
}

export default App;
