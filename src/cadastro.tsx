import React, { useState, useEffect } from 'react'
import './Pagina.css';

interface ClientesState {
    id: number,
    nome: string,
    telefone: number,
}

function Cadastro() {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [clientes, setClientes] = useState<ClientesState[]>([])
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        buscaDados()
    }, [])

    const buscaDados = async () => {
        try {
            const resultado = await fetch("http://localhost:8000/clientes")
            if (resultado.status === 200) {
                const dados = await resultado.json()
                setClientes(dados)
            }
            if (resultado.status === 400) {
                const erro = await resultado.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            setMensagem("Fetch não funcionou")
        }
    }

    async function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const novoCliente: ClientesState = {
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
                body: JSON.stringify(novoCliente)
            })

            if (resposta.ok) {
                setMensagem("Cadastro realizado com sucesso!")
                setId("")
                setNome("")
                setTelefone("")
                buscaDados()
            }

            if (resposta.status === 400) {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
            }

        } catch (erro) {
            setMensagem("Fetch não funcionou")
        }
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
                        <input type="text" name="id" id="id" onChange={(e) => setId(e.target.value)} value={id} placeholder="Id" />
                        <input type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} value={nome} placeholder="Nome" />
                        <input type="text" name="telefone" id="telefone" onChange={(e) => setTelefone(e.target.value)} value={telefone} placeholder="Telefone" />
                        <input type="submit" value="Cadastrar" />
                    </form>
                </div>

                <div className="container-listagem">
                    <h2>Clientes Cadastrados</h2>

                    {clientes.map(cliente => (
                        <div className="procedimento-container" key={cliente.id}>
                            <div className="produto-nome">
                                {cliente.nome}
                            </div>
                            <div className="produto-preco">
                                Telefone: {cliente.telefone}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Cadastro
