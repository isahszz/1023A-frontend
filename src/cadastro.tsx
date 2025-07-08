import React, { useState, useEffect } from 'react'
import './Pagina.css';
import './Pagina.tsx'
interface ClientesState {
    id: number,
    nome: string,
    telefone: number
}

function Cadastro() {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch("http://localhost:8000/clientes")
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
            telefone: parseFloat(telefone)
        }
        try {
            const resposta = await fetch("http://localhost:8000/clientes", {
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
                setTelefone("")
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
    function trataTelefone(event: React.ChangeEvent<HTMLInputElement>) {
        setTelefone(event.target.value)
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
                    <h2>Cadastrar Cliente</h2>
                    <form onSubmit={TrataCadastro}>
                        <input type="text" name="id" id="id" onChange={trataId} placeholder="Id" />
                        <input type="text" name="nome" id="nome" onChange={trataNome} placeholder="Nome" />
                        <input type="text" name="telefone" id="telefone" onChange={trataTelefone} placeholder="Telefone" />
                        <input type="submit" value="Cadastrar" />
                    </form>

                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Cadastro