import React, { useState, useEffect } from 'react'
import './Pagina.tsx'
import './Pagina.css'

interface ClientesState {
    id: number,
    clientes: string,
    profissional: string,
    datahora: string
}

function Agenda() {
    const [id, setId] = useState("")
    const [clientes, setClientes] = useState("")
    const [profissional, setProfissional] = useState("")
    const [datahora, setDatahora] = useState("")
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch("http://localhost:8000/agendamento")
                if (resultado.status === 400) {
                    const erro = await resultado.json()
                    setMensagem(erro.mensagem)
                }
            } catch (erro) {
                setMensagem("Fetch não funciona")
            }
        }
        buscaDados()
    }, [])

    async function TrataAgenda(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const novoAgendamento: ClientesState = {
            id: id ? parseInt(id) : 0,
            clientes: clientes,
            profissional: profissional,
            datahora: datahora
        }

        try {
            const resposta = await fetch("http://localhost:8000/agendamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoAgendamento)
            })

            if (resposta.ok) {
                setMensagem("Agendamento realizado com sucesso!")
                setId("")
                setClientes("")
                setProfissional("")
                setDatahora("")
            } else if (resposta.status === 400) {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            setMensagem("Erro ao tentar conectar com o servidor.")
        }
    }

    function trataId(event: React.ChangeEvent<HTMLInputElement>) {
        setId(event.target.value)
    }
    function trataClientes(event: React.ChangeEvent<HTMLInputElement>) {
        setClientes(event.target.value)
    }
    function trataProfissional(event: React.ChangeEvent<HTMLInputElement>) {
        setProfissional(event.target.value)
    }
    function trataDatahora(event: React.ChangeEvent<HTMLInputElement>) {
        setDatahora(event.target.value)
    }

    return (
        <>
            <main>
                {mensagem &&
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                }
                <div className="container-agenda">
                    <h2>Agende seu momento de luxo.</h2>
                    <form onSubmit={TrataAgenda}>
                        <input type="text" name="id" id="id" value={id} onChange={trataId} placeholder="Id" />
                        <input type="text" name="clientes" id="clientes" value={clientes} onChange={trataClientes} placeholder="Clientes" />
                        <input type="text" name="profissional" id="profissional" value={profissional} onChange={trataProfissional} placeholder="Profissional" />
                        <input type="datetime-local" name="datahora" id="datahora" value={datahora} onChange={trataDatahora} placeholder="Data e hora" />
                        <input type="submit" value="Agendar" />
                    </form>
                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Agenda
