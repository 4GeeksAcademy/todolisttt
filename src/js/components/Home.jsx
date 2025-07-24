import React, { useState, useEffect } from "react";
import ListaTarea from "./ListaTarea";

const API_URL = `https://playground.4geeks.com/todo/todos/alberto`;

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);


  const crearLaTarea = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      if (!response.ok) {
        console.log("No se pudo crear la tarea");
      } else {
        console.log("Tarea creada");
      }
    } catch (error) {
      console.log("Error creando tarea:", error.message);
    }
  };


  useEffect(() => {
    const cargarTareas = async () => {
      try {

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([]),
        });

        if (response.status === 404) {
          console.log("Usuario no existe, creando...");
          await crearLaTarea();
          setTareas([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const lista = data.todos.map((t) => t.label);
        setTareas(lista);
      } catch (error) {
        console.log("Error cargando tareas:", error.message);
      }
    };

    cargarTareas();
  }, []);


  const guardarTareas = async (lista) => {
    setTareas(lista);

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          lista.map((label) => ({
            label,
            done: false,
          }))
        ),
      });

      if (!response.ok) {
        console.log("Error guardando tareas");
      } else {
        console.log("Tareas guardadas correctamente");
      }
    } catch (error) {
      console.log("Error en guardar tareas:", error.message);
    }
  };


  const handleKeyUp = (e) => {
    if (e.key === "Enter" && tarea.trim() !== "") {
      const nuevasTareas = [...tareas, tarea.trim()];
      guardarTareas(nuevasTareas);
      setTarea("");
    }
  };


  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    guardarTareas(nuevasTareas);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4"> 🖇️ Lista de Tareas</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Siguiente tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyUp={handleKeyUp}
      />

      <ListaTarea tareas={tareas} eliminarTarea={eliminarTarea} />
    </div>
  );
};

export default Home;
