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
    // Exibe a mensagem de confirmação
    const confirmar = window.confirm("Você tem certeza que deseja excluir este aluno?");
    
    if (confirmar) {
      try {
        await axios.delete(`http://localhost:5120/alunos/${id}`);
        fetchAlunos(); // Atualiza a tabela após exclusão
        alert("Aluno excluído com sucesso!"); // Mensagem de sucesso
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        alert("Ocorreu um erro ao tentar excluir o aluno.");
      }
    }
  };

  // Efeito para carregar os alunos ao montar o componente
  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <>
    <div className="user-info">
          <p>
            Margarida de Oliveira Maduro
            <br />
            Secretária
            <br />
            NRU 6472114
            <br />
            Escola Quilombola da Chapada
          </p>
          <a href="#" className="logout"
             onClick={(e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            navigate("/"); // Redireciona para a página de login
          }}>
            Sair
          </a>
    </div>
    <div className="case">
      <h2>LISTA DE ALUNOS</h2>
      <div className="button-grid">
        <button
          className="menu-button"
          onClick={() => navigate("/matricular-aluno")}>
          Matricular Aluno
        </button>
        <button
          className="menu-button"
          onClick={() => navigate("/painel")} // Botão para voltar ao painel
          >
          Voltar
        </button>
      </div>
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
                  className="action-button edit-button"
                  onClick={() => navigate(`/matricular-aluno/${aluno.id}`)}
                >
                  Editar
                </button>
                <button
                  className="action button delete-button"
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
    </>
  );
}

export default Alunos;
