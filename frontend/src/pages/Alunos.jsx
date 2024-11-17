import React, { useState, useEffect } from "react";
import axios from "axios";

function Alunos() {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar alunos
  const [editingAluno, setEditingAluno] = useState(null);


  // Função para buscar alunos da API
  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:5120/alunos");
      setAlunos(response.data); // Atualiza o estado com os dados retornados
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchAlunos(); // Busca alunos ao montar o componente
  }, []);

  const startEditAluno = (aluno) => {
    setEditingAluno(aluno);
  };

  const deleteAluno = async (id) => {
    try {
      await axios.delete(`http://localhost:5120/alunos/${id}`);
      fetchAlunos(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };
  

  return (
    <div>
      <h2>Lista de Alunos</h2>
      {editingAluno ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.put(`http://localhost:5120/alunos/${editingAluno.id}`, editingAluno);
              setEditingAluno(null); // Fecha o formulário
              fetchAlunos(); // Atualiza a tabela
            } catch (error) {
              console.error("Erro ao editar aluno:", error);
            }
          }}
        >
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={editingAluno.nome}
              onChange={(e) =>
                setEditingAluno({ ...editingAluno, nome: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={new Date(editingAluno.dataDeNascimento)
                .toISOString()
                .split("T")[0]}
              onChange={(e) =>
                setEditingAluno({
                  ...editingAluno,
                  dataDeNascimento: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>RG:</label>
            <input
              type="text"
              value={editingAluno.rg}
              onChange={(e) =>
                setEditingAluno({ ...editingAluno, rg: e.target.value })
              }
            />
          </div>
          <button type="submit" className="menu-button salvar">
            Salvar
          </button>
          <button
            type="button"
            className="menu-button cancelar"
            onClick={() => setEditingAluno(null)}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <table className="aluno-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>RG</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{new Date(aluno.dataDeNascimento).toLocaleDateString()}</td>
                <td>{aluno.rg}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => startEditAluno(aluno)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteAluno(aluno.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
}

export default Alunos;
