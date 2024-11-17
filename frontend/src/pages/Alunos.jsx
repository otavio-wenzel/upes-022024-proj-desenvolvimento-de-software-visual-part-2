import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Alunos() {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar os alunos
  const navigate = useNavigate();

  // Função para buscar os alunos da API
  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:5120/alunos");
      setAlunos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  // Função para excluir um aluno
  const deleteAluno = async (id) => {
    try {
      await axios.delete(`http://localhost:5120/alunos/${id}`);
      fetchAlunos(); // Atualiza a tabela após exclusão
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  // Efeito para carregar os alunos ao montar o componente
  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <button
        className="menu-button"
        onClick={() => navigate("/matricular-aluno")}
      >
        Matricular Aluno
      </button>
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
                  onClick={() => navigate(`/matricular-aluno/${aluno.id}`)}
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
    </div>
  );
}

export default Alunos;
