import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function MatricularAluno() {
  const { id } = useParams(); // Captura o ID da URL, se existir
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    dataDeNascimento: "",
    rg: "",
  });

  // Carrega os dados do aluno para edição
  useEffect(() => {
    if (id) {
      const fetchAluno = async () => {
        try {
          const response = await axios.get(`http://localhost:5120/alunos/${id}`);
          setFormData(response.data); // Preenche o formulário com os dados do aluno
        } catch (error) {
          console.error("Erro ao buscar aluno:", error);
        }
      };
      fetchAluno();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Atualizar aluno existente
        await axios.put(`http://localhost:5120/alunos/${id}`, formData);
      } else {
        // Criar novo aluno
        await axios.post("http://localhost:5120/alunos", formData);
      }
      navigate("/alunos"); // Redireciona para a lista de alunos
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Aluno" : "Matricular Aluno"}</h2>
      <form className="matricula-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="input-field"
            placeholder="Nome do aluno"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataDeNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataDeNascimento"
            name="dataDeNascimento"
            className="input-field"
            value={
              formData.dataDeNascimento
                ? new Date(formData.dataDeNascimento).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rg">RG:</label>
          <input
            type="text"
            id="rg"
            name="rg"
            className="input-field"
            placeholder="Número do RG"
            value={formData.rg}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-grid">
          <button type="submit" className="menu-button salvar">
            {id ? "Atualizar" : "Salvar"}
          </button>
          <button
            type="button"
            className="menu-button cancelar"
            onClick={() => navigate("/alunos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default MatricularAluno;
