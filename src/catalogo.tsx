import React, { useState, useEffect } from 'react'
import './Pagina.tsx'
interface ClientesState {
    id: number,
    nome: string,
    preco: number
}

function Catalogo() {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch("http://localhost:8000/procedimento")
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
    }, [])// [] => significa as dependências do useEffects
    async function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //Criar um novo produto
        const novoProduto: ClientesState = {
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
                setMensagem("Cadastro realizado com sucesso!");
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
                    <form onSubmit={TrataCadastro}>
                        <input type="text" name="id" id="id" onChange={trataId} placeholder="Id" />
                        <input type="text" name="nome" id="nome" onChange={trataNome} placeholder="Nome" />
                        <input type="number" name="preco" id="preco" onChange={trataPreco} placeholder="Preco" />
                        <input type="submit" value="Cadastrar" />
                    </form>

                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Catalogo