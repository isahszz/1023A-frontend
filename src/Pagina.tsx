import { NavLink } from "react-router"
import './Pagina.css'
function Pagina() {

    return (
        <>
            <header>
                <div>
                    <h1>Salão de Beleza</h1>
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