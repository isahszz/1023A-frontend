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
    const [agendamento, setAgendamento] = useState<ClientesState[]>([])
    const [mensagem, setMensagem] = useState("")

    const buscaDados = async () => {
        try {
            const resultado = await fetch("http://localhost:8000/agendamento")
            if (resultado.status === 200) {
                const dados = await resultado.json()
                setAgendamento(dados)
            } else if (resultado.status === 400) {
                const erro = await resultado.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            setMensagem("Erro ao buscar agendamentos.")
        }
    }

    // UseEffect inicial
    useEffect(() => {
        buscaDados()
    }, [])

    async function TrataAgendamento(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const novoAgendamento: ClientesState = {
            id: id ? parseInt(id) : 0,
            clientes: clientes,
            profissional: profissional,
            datahora: datahora,
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
            } else if (resposta.status === 400) {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
            }
        } catch (erro) {
            setMensagem("Erro ao tentar conectar com o servidor.")
        }
    }

    return (
        <>
            <main>
                {mensagem && (
                    <div className="mensagem">
                        <p>{mensagem}</p>
                    </div>
                )}

                <div className="container-listagem">
                    <h2>Agendamentos Realizados</h2>

                    {agendamento.map(item => (
                        <div className="agendamento-container" key={item.id}>
                            <div><strong>ID:</strong> {item.id}</div>
                            <div><strong>Cliente:</strong> {item.clientes}</div>
                            <div><strong>Profissional:</strong> {item.profissional}</div>
                            <div><strong>Data e Hora:</strong> {item.datahora}</div>
                        </div>
                    ))}
                </div>

                <div className="container-agendamento">
                    <h2>Agende seu momento de luxo.</h2>
                    <form onSubmit={TrataAgendamento}>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                        <input type="text" value={clientes} onChange={(e) => setClientes(e.target.value)} placeholder="Cliente" />
                        <input type="text" value={profissional} onChange={(e) => setProfissional(e.target.value)} placeholder="Profissional" />
                        <input type="datetime-local" value={datahora} onChange={(e) => setDatahora(e.target.value)} placeholder="Data e Hora" />
                        <input type="submit" value="Agendar" />
                    </form>
                </div>
            </main>
            <footer></footer>
        </>
    )
}

export default Agenda
