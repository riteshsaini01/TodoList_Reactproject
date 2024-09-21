"use client"
// Import necessary dependencies
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';



// Define Page component
const Page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  // Define SearchBar component
  const SearchBar = ({ searchQuery, handleSearchInputChange }) => {
    return (
      <div className="max-w-xl flex mx-auto p-2 text-xl">
        <input
          type="text"
          className="w-2/3 text-xl border-zinc-800 border-2 m-2 p-2"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}/>
        <button className="bg-slate-500 rounded p-2 m-2">🔍</button>
        <FontAwesomeIcon icon={faCircleHalfStroke} onClick={toggleTheme} className="bg-slate-500 text-3xl rounded p-2 m-2" />
      </div>
    );
  }
  

  // Function to toggle dark/light theme
  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
    
  }

  const themeClass = darkTheme ? "dark" : "light";

  // Function to handle task status
  const statusHandler = (i) => {
    let copytask = [...mainTask];
    copytask[i].completed = true;
    setMainTask(copytask);
  }

  // Function to handle task submission
  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc, completed: false }]);
    settitle("");
    setdesc("");
  }

  // Function to handle task deletion
  const deleteHandler = (i) => {
    let copytask = [...mainTask];
    copytask.splice(i, 1);
    setMainTask(copytask);
  }

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on search query
  const filteredTasks = mainTask.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const renderTask = filteredTasks.length > 0 ? (
    filteredTasks.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between mb-8">
          <div className=' mb-5 w-2/3'>
            <h5 className='text-xl font-bold'>{t.title}</h5>
            <h6 className='text-xxxxl font-semibold' >{t.desc}</h6>
          </div>
          <button
            onClick={() => { statusHandler(i) }}
            className={`bg-blue-400 m-2 text-white px-4 py-2 rounded font-bold ${
              t.completed ? 'hidden' : ''
            }`}>
            Complete
          </button>
          <span
            className={`text-green-500 font-bold ${
              t.completed ? '' : 'hidden'
            }`}>
            Completed
          </span>
          <button
            onClick={() => {
              deleteHandler(i)
            }}
            className="bg-blue-400 text-white px-4 py-2 rounded font-bold">
            Delete
          </button>
        </li>
      );
    })
  ): <h2>No tasks found</h2>;

  return (
    <>
      <div className={`bg-slate-300 flex justify-center items-center h-screen ${themeClass}`}>
        <div className="text-center" style={{ background: 'var(--bg-color)', color: 'var(--text-color)' }}>
          <h1 className='bg-slate-500 text-white p-3 text-5xl font-bold text-center' >Todo List</h1>
          <SearchBar searchQuery={searchQuery} handleSearchInputChange={handleSearchInputChange} />
          
          

          <form onSubmit={submitHandler}>
            <input type="text" className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Enter Task Here' value={title} onChange={(e) => settitle(e.target.value)} />
            <input type="text" className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Enter Description Here' value={desc} onChange={(e) => setdesc(e.target.value)} />
            <button className="bg-slate-500 text-white px-4 py-3 text-2xl font-bold rounded m-5">Add Task</button>
          </form>
          <hr />
          <div className="p-8 bg-slate-200">
            <ul>
              {renderTask}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
