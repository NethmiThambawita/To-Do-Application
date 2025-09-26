import axios from "axios";
import TaskForm from './TaskForm';
import Task from './Task';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from "../App";
import loadingImg from "../assets/loading.png";



const TaskList = () => {
 // const [toggle, setToggle] = useState(false); // Or any initial value

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [toggle, setToggle] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    completed: false,
  });

  const { name, completed } = formData; // Destructure completed

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch tasks from the server
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api`);
      setTasks(data);
    } catch (error) {
      toast.error("Error fetching tasks: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Input field cannot be empty");
      return;
    }
    try {
      const { data } = await axios.post(`${URL}/api`, formData);
      setTasks(prevTasks => [...prevTasks, data]); // Update state directly
      toast.success("Task added successfully");
      setFormData({ name: '', completed: false });
    } catch (error) {
      toast.error("Error creating task: " + error.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id)); // Update state directly
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task: " + error.message);
    }
  //   const deleteToast = (props) => {
  //     console.log(props);  // Check if props are defined here
      
  // };
  
  };

  

  // Fetch a single task for editing
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEditing(true);
  };
  


  
  // Update a task
  const updateTask = async (e) => {
    e.preventDefault();
   if (name === "") {
    return toast.error("Input field cannot be empty");
   
   }

    const updatedData = {
      ...formData,
      completed: completed // Ensure completed state is sent
    };

    try {
      await axios.put(`${URL}/api/${taskID}`, updatedData);
      setTasks(prevTasks => prevTasks.map(task => (task._id === taskID ? { ...task, ...updatedData } : task))); // Update state directly
      toast.success("Task updated successfully");
      setFormData({ name: '', completed: false });
      setIsEditing(false);
      setTaskID("");
   } catch (error) {
      toast.error("Error updating task: " + error.message);
   }
  };

  

  // Set task to complete
  const setToComplete = async (task) => {
    const updatedTask = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(`${URL}/api/${task._id}`, updatedTask);
      setTasks(prevTasks => prevTasks.map(t => (t._id === task._id ? { ...t, completed: true } : t))); // Update state directly
      toast.success("Task marked as complete");
    } catch (error) {
      toast.error("Error completing task: " + error.message);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>

      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={isEditing ? updateTask : createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p><b>Total Tasks:</b> {tasks.length}</p>
          <p><b>Completed Tasks:</b> {tasks.filter(task => task.completed).length}</p>
        </div>
      )}

      <hr />

      {isLoading ? (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      ) : tasks.length === 0 ? (
        <p className="--py">No tasks added. Please add a task.</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={task._id}
            task={task}
            index={index}
            deleteTask={deleteTask}
            getSingleTask={getSingleTask}
            setToComplete={setToComplete}
          />
        ))
      )}

      <ToastContainer />
    </div>
  );
};

export default TaskList;
