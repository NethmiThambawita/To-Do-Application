import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';

// Accessing the server URL from environment variables
export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        {/* TaskList component renders here */}
        <TaskList />
      </div>
      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
