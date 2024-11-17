
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/painel"); // Redireciona para o painel
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <h1>Escola Quilombola da Chapada</h1>
        <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="USUÁRIO"
            className="input-field"
          />
          <input
            type="password"
            placeholder="SENHA"
            className="input-field"
          />
          <button type="submit" className="login-button">
            ENTRAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
