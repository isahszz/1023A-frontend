import  { useState, useEffect } from 'react'
import './Pagina.css';
import './Pagina.tsx'
interface ProcedimentoState {
    id: number,
    nome: string,
    preco: number,
    imagem: string
}

function Catalogo() {
    const [mensagem, setMensagem] = useState("")
    const [procedimento, setProcedimento] = useState<ProcedimentoState[]>([])



    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch("http://localhost:8000/procedimento")
                if (resultado.status === 200) {
                    const dados = await resultado.json()
                    setProcedimento(dados)
                }
                if (resultado.status === 400) {
                    const erro = await resultado.json()
                    setMensagem(erro.mensagem)
                    //console.log(erro.mensagem)
                }
            }
            catch (erro) {
                setMensagem("Fetch não functiona")
            }
        }
        buscaDados()
    }, [])

    return (
        <>
            <main>
                {mensagem &&
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                }

                <div className="container-listagem">
                    <h2>Ver Catalogo Disponivel</h2>

                    {procedimento.map(procedimento => {
                        return (
                            <div className="procedimento-container" key={procedimento.id}>
                                <div className="produto-nome">
                                    {procedimento.nome}
                                </div>
                                <div className="produto-preco">
                                    {procedimento.preco}
                                </div>
                                <img src={procedimento.imagem} alt="Imagem do procedimento" />
                            </div>

                        )
                    })}
                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Catalogo