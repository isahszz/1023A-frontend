import React, { useState, useEffect } from 'react'
import './Pagina.css'

interface AgendamentoState {
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
    const [agendamentos, setAgendamentos] = useState<AgendamentoState[]>([])
    const [mensagem, setMensagem] = useState("")

    useEffect(() => {
        buscaDados()
    }, [])

    const buscaDados = async () => {
        try {
            const resultado = await fetch("http://localhost:8000/agendamento")
            if (resultado.status === 200) {
                const dados = await resultado.json()
                console.log("Agendamentos carregados:", dados)
                setAgendamentos(dados)
            } else {
                const erro = await resultado.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            setMensagem("Erro ao buscar agendamentos.")
        }
    }

    async function TrataAgendamento(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const novoAgendamento = {
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
                buscaDados()
            } else {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
            }

        } catch (erro) {
            setMensagem("Erro ao tentar conectar com o servidor.")
        }
    }

    const excluirAgendamento = async (id: number) => {
        console.log("Tentando excluir agendamento com id:", id)
        try {
            const resposta = await fetch(`http://localhost:8000/agendamento/${id}`, {
                method: "DELETE"
            })

            if (resposta.ok) {
                setMensagem("Agendamento excluído com sucesso!")
                buscaDados()
            } else {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            console.log(erro)
            setMensagem("Erro ao excluir agendamento.")
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

                <div className="container-agendamento">
                    <h2>Agende seu momento de luxo</h2>
                    <form onSubmit={TrataAgendamento}>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            onChange={(e) => setId(e.target.value)}
                            value={id}
                            placeholder="ID"
                            required
                        />
                        <input
                            type="text"
                            name="clientes"
                            id="clientes"
                            onChange={(e) => setClientes(e.target.value)}
                            value={clientes}
                            placeholder="Cliente"
                            required
                        />
                        <input
                            type="text"
                            name="profissional"
                            id="profissional"
                            onChange={(e) => setProfissional(e.target.value)}
                            value={profissional}
                            placeholder="Profissional"
                            required
                        />
                        <input
                            type="datetime-local"
                            name="datahora"
                            id="datahora"
                            onChange={(e) => setDatahora(e.target.value)}
                            value={datahora}
                            required
                        />
                        <input type="submit" value="Agendar" />
                    </form>
                </div>

                <div className="container-listagem">
                    <h2>Agendamentos Realizados</h2>

                    {agendamentos.map(agendamento => (
                        <div className="agendamento-container" key={agendamento.id}>
                            <div><strong>ID:</strong> {agendamento.id}</div>
                            <div><strong>Cliente:</strong> {agendamento.clientes}</div>
                            <div><strong>Profissional:</strong> {agendamento.profissional}</div>
                            <div><strong>Data e Hora:</strong> {agendamento.datahora}</div>
                            <button onClick={() => excluirAgendamento(agendamento.id)}>Excluir</button>
                        </div>
                    ))}
                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Agenda
