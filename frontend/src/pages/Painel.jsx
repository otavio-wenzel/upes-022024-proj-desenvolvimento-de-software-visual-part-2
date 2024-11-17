import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Painel() {
  const navigate = useNavigate();

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
        <h2>PAINEL INICIAL</h2>
        <div className="button-grid-painel">
          <button
            className="painel-button"
            onClick={() => navigate("/alunos")}
          >
            Alunos
          </button>
          <button className="painel-button">Professores</button>
          <button className="painel-button">Turmas</button>
          <button className="painel-button">Disciplinas</button>
        </div>
      </>
  );
}

export default Painel;
