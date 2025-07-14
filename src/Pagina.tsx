import { NavLink } from "react-router"
import './Pagina.css'
function Pagina() {

    return (
        <>
            <header>
                <div>
                    <h2> </h2>
                    <h1>SEJA BEM VINDO AO NOSSO SALÃO DE BELEZA</h1>
                    <h2>Mais que um salão, uma experiência de transformação</h2>
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