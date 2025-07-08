import { NavLink } from "react-router"
import './Pagina.css'
function Pagina() {

    return (
        <>
            <header>
                <div>
                    <h2> </h2>
                    <h1>SEJA BEM VINDO</h1>
                    <h2>Salão de Beleza Das Isas</h2>
                </div>


            </header>
            <main>
                <NavLink to="/Cadastrar" end>Cadastro</NavLink>
                <NavLink to="/Serviços" end>Catalogo</NavLink>
                <NavLink to="/Agendar" end>Agenda</NavLink>
            </main>
            <footer>
                <p>Informações:</p>
                <p>Rua: Nagasaki</p>
                <p>Avenida: Dourados</p>
                <p>Numero: 150</p>

            </footer>
        </>
    )
}

export default Pagina