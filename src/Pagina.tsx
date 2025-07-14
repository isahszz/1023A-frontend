import { NavLink } from "react-router"
import './Pagina.css'
function Pagina() {

    return (
        <>
            <header>
                <div>
                    <h2> </h2>
                    <h1>SEJA BEM VINDO</h1>
                    <h2>Salão de Beleza</h2>
                    <h3>Mais que um salão, uma experiência de transformação.</h3>
                </div>


            </header>
            <main>
                <NavLink to="/Cadastrar" end>Cadastro</NavLink>
                <NavLink to="/Serviços" end>Catalogo</NavLink>
                <NavLink to="/Agendar" end>Agenda</NavLink>
            </main>
            <footer>
    
            </footer>
        </>
    )
}

export default Pagina