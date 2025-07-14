import React, { useState, useEffect } from 'react'
import './Pagina.css';
import './Pagina.tsx'
interface ProcedimentoState {
    id: number,
    nome: string,
    preco: number
}

function Catalogo() {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
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
    async function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //Criar um novo produto
        const novoProduto: ProcedimentoState = {
            id: parseInt(id),
            nome: nome,
            preco: parseFloat(preco)
        }
        try {
            const resposta = await fetch("http://localhost:8000/procedimento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            })
            if (resposta.ok) {
                setMensagem("Catalogo!");
                setId("");
                setNome("");
                setPreco("")
            }
            if (resposta.status === 400) {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
                //console.log(erro.mensagem)
            }

        }
        catch (erro) {
            setMensagem("Fetch não functiona")
        }

    }
    function trataId(event: React.ChangeEvent<HTMLInputElement>) {
        setId(event.target.value)
    }
    function trataNome(event: React.ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value)
    }
    function trataPreco(event: React.ChangeEvent<HTMLInputElement>) {
        setPreco(event.target.value)
    }
    return (
        <>
            <main>
                {mensagem &&
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                }
                <div className="container-cadastro">
                    <h2>Ver Catalogo Disponivel</h2>
                    <form onSubmit={TrataCadastro}>
                        <input type="text" name="id" id="id" onChange={trataId} placeholder="Id" />
                        <input type="text" name="nome" id="nome" onChange={trataNome} placeholder="Nome" />
                        <input type="text" name="preco" id="preco" onChange={trataPreco} placeholder="Preco" />
                        <input type="submit" value="Catalogo" />
                    </form>

                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Catalogo