import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';

const API_KEY = "_3mduh0q5d4WvQZMOXdoc_zHRg1X46QxQsumg-re8qJ5ttrphA"
function App() {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    fetch("/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
    })
    .then(res => {
      if(!res.ok){
        throw new Error("Something Went Wrong")
      }return res.json()
    })
    .then(data => setTaskList(data.items.map(user => {
      return {
        name: user.name,
        isCompleted: user.isCompleted,
        id: user._uuid
      }
    })))
    // .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [])

  const getUsers = () => {
    fetch("/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
    })
    .then(res => {
      if(!res.ok){
        throw new Error("Something Went Wrong")
      }return res.json()
    })
    .then(data => setTaskList(data.items.map(user => {
      return {
        name: user.name,
        isCompleted: user.isCompleted,
        id: user._uuid
      }
    })))
    // .then(data => console.log(data.items))
    .catch(err => console.log(err))
  }

  const onFormSubmit = (name, isCompleted) => {
    fetch("/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{ name, isCompleted }]) // Removed array brackets
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something Went Wrong");
        }
        return res.json();
      })
      .then(data => {
        setTaskList(prev => [
          {
            name: data.items[0].name,
            isCompleted: data.items[0].isCompleted, // Corrected index to ".isCompleted"
            id: data.items[0]._uuid
          },...prev]);
        // console.log(data.items[0].isCompleted);
      })
      // .catch(err => console.log(err));
  };
  
  // const res = useEffect(() => {
  //   console.log(taskList.map(task => task.isCompleted));
  // }, [taskList]);

  return (
    <div className="App">
      <div className="TaskList">
        <TaskList onFormSubmit={onFormSubmit} />
      </div>
      <div className='ButtonGroup'>
        <button onClick={getUsers} className="ButtonGroup">
          Get Tasks
        </button>
        <button onClick={() => setTaskList([])} className="ButtonGroup">
          Clear tasks
        </button>
      </div>
      {taskList.map(task => (
        <div key={task.id} className="TaskItem">
          <h3>Name: {task.name}</h3>
          <h3>Is Completed: {task.isCompleted ? 'true' : 'false'}</h3>
          <p>id-{task.id}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
