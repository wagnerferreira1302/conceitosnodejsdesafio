import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";


function App() {

  const [projects, setProject] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setProject(response.data)
    });
  }, [])

  async function handleAddRepository() {
     const response = await api.post('repositories', {
          url: 'https://rocketseat.com.br/desafiojs',
          title: 'Desafio ReactJS',
          techs: ['Java', 'React JS']
     });

     setProject([...projects, response.data])
     
  }

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`)
    const project = projects.filter(project => project.id !== id)
    setProject(project)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
                Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
