import React, { useState, useEffect } from "react";
import api from "./services/api.js";
import Title from "./Title.js";

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then((resp) => {
      setRepos(resp.data);
    });
  }, []);

  async function handleAddRepository() {
     try{
        const resp = await api.post('repositories',{
         "title": `repositório novo ${Date.now()}`,
         "url": `http://github.com/novo${Date.now()}`,
         "techs": ["NodeJs", "ReactJs"]
        })
        setRepos([...repos, resp.data])

     } catch (e){
        console.error(e)
     }

     
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepos(repos.filter(repo=> repo.id !== id))
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Title title="Lista de Repositórios" />
      <div>
        <ul data-testid="repository-list">
          {repos.map((repo) => {
            return (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
        <hr />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
