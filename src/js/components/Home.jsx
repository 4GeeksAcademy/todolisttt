import React, { useState, useEffect } from "react";
import ListaTarea from "./ListaTarea";

// const API_BASE = `https://playground.4geeks.com/todo/users/`;
// const USER = "alberto"

const Home = () => {
  const [tarea, setTarea] = useState([]);
  const [inputValue, setinputValue] = useState([])//recibir del usuario//////

  //guardo usuario//
  const crearUsuario = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/alberto", {
      method: "POST",
    })
  }


  //pedir tarea////
  const getTodos = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/alberto")

    if (!response.ok) {
      console.log("crea la tarea");
      crearUsuario();


    }

    const data = await response.json()
    setTarea(data.todos);
    console.log(data.todos);


  }
  //crear tarea //
  const creainputValue = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/todos/alberto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: inputValue,
        is_done: false
      })
    }

    )

    const data = await response.json()
    console.log(data);
    getTodos()
    setinputValue("")
  }

  // getinputValue()
  useEffect(() => {
    getTodos()
  }, [])




  const handleKeyUp = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      creainputValue();

    }
  };


  const eliminarTarea = async (id) => {
    const responsive = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    })
    getTodos()
  }



  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4"> 🖇️ Lista de inputValue</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Siguiente tarea"
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />

      <ListaTarea tarea={tarea} eliminarTarea={eliminarTarea} />
    </div>
  );
};

export default Home;

