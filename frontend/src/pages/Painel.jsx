import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Painel() {
  const navigate = useNavigate();

  return (
    <div className="painel-page">
      <main className="painel-container">
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
          <a href="#" className="logout">
            Sair
          </a>
        </div>
        <h2>PAINEL INICIAL</h2>
        <div className="button-grid">
          <button
            className="menu-button"
            onClick={() => navigate("/alunos")}
          >
            Alunos
          </button>
          <button className="menu-button">Professores</button>
          <button className="menu-button">Turmas</button>
        </div>
      </main>
    </div>
  );
}

export default Painel;
