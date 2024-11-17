import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="painel-page">
      <Header />
      <main className="painel-container">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
