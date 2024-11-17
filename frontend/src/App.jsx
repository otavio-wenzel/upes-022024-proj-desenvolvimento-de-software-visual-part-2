
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Painel from "./pages/Painel";
import Alunos from "./pages/Alunos";
import MatricularAluno from "./pages/MatricularAluno";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Painel />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/matricular-aluno" element={<MatricularAluno />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

