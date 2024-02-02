
import { useState } from 'react';

import './App.css';

function App() {

  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setsort] = useState([]);
  const [searchInfo, setSearchinfo] = useState([])



  //>>>>>>>>>>>>> ADD HENDEL  >>>>>>>>>>>>>
  
  const add = () => {

    if (task == '') {
      alert("ENTER TASK ");
    }
    else {
      if (edit !== false) {
        const updated = [...todo];
        setSearchinfo([...todo])

        updated[edit] = { task: task, checked: false };
        setTodo(updated);
        setsort(updated);
        setEdit(false);
        setTask("");
      }
      else {
        setTodo([...todo, { task: task, checked: false }]);
        setSearchinfo([...todo])
        setsort([...todo, { task: task, checked: false }]);
        setTask("");
      }
    }
  }


  // >>>>>>>>>> DELETE >>>>>>>>>>>>>
  
  const del = (index) => {
    console.log("index = " + index)
    let data = todo.filter((val, id) => {
      console.log("id =", id)
      return id !== index;
    })
    setTodo(data);
    setsort(data);
  }


  // >>>>>>>>> EDIT >>>>>>>>>>>>>

  const update = (index) => {
    setEdit(index);
    setTask(todo[index].task);
  };

  // >>>>>>>>> CHECK >>>>>>>>>>>>>


  const handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
    setsort(check);
  }

  // >>>>>>>>> SERRCH >>>>>>>>>>>>>


  const searchhanlder = () => {

    let info = sort.filter((val, id) => {
      return val.task === search;
    })
    console.log('info', info)
    setTodo(info);
  }

  // >>>>>>>>> COMPLETE >>>>>>>>>>>>>

  const completed = () => {
    let com = sort.filter((val, id) => {
      return val.checked === true ? val : false
    });
    setTodo(com);
  }

  // >>>>>>>>> UNCOMPLETE >>>>>>>>>>>>>

  const uncompleted = () => {
    let uncom = sort.filter((val, id) => {
      return val.checked === false ? val : false
    });
    setTodo(uncom);
  }

  // >>>>>>>>> ALL >>>>>>>>>>>>>

  const all = () => {
    var data = [...sort];
    setTodo(data);
  }

  return (
    <div>
        <h1>TODO LIST</h1>
      <div className="ms-4">
        <div className='form' >
          <input type="text" className='me-3' value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
          <input type='button' className='' value={"Add Task"} onClick={() => { add() }} /><br />
          <input type='text' className='my-3 me-3' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type='button' className='me-3' value={"Search"} onClick={() => { searchhanlder() }} />        <br></br>
          <input type='button' className='me-3' value={"Completed"} onClick={() => { completed() }} style={{ marginRight: "10px" }} />
          <input type='button' className='me-3' value={"Uncompleted"} onClick={() => { uncompleted() }} style={{ marginRight: "10px" }} />
         
         
          
          
          
          <input type='button' className='me-3' value={"All"} onClick={() => { all() }} style={{ marginRight: "10px" }} />

        </div>

        <table  border={0} >
          {
            todo.map((ele, index) => {
              return (
                <tr className='list' key={index} >

                  <td><input type='checkbox' className='me-3 tt' checked={ele.checked} onChange={() => handlecheck(index)} /></td>
                  <td><input className="m-2 ww" style={{ textDecoration: ele.checked ? "line-through" : "" }} value={ele.task}></input></td>
                  <td><input type='button' value={"Delete"} className='del me-3' onClick={() => { del(index) }} /></td>
                  <td><input type='button' value={"Edit"} onClick={() => { update(index) }} /></td>

                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
}

export default App;