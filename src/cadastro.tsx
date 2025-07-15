import React, { useState, useEffect } from 'react'
import './Pagina.css';

interface ClientesState {
  id: number,
  nome: string,
  telefone: string,  // ALTERADO para string
}

function Cadastro() {
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
        console.log("Clientes carregados:", dados)
        setClientes(dados)
      } else {
        const erro = await resultado.json()
        setMensagem(erro.mensagem)
      }
    } catch (erro) {
      setMensagem("Fetch não funcionou")
    }
  }

  async function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const novoCliente = {
      nome: nome,
      telefone: telefone  // envia como string direto, sem parseFloat
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
        setNome("")
        setTelefone("")
        buscaDados()
      } else {
        const erro = await resposta.json()
        setMensagem(erro.mensagem)
      }

    } catch (erro) {
      setMensagem("Erro ao cadastrar cliente")
    }
  }

  const excluirCliente = async (id: number) => {
    console.log("Tentando excluir cliente com id:", id)
    try {
      const resposta = await fetch(`http://localhost:8000/clientes/${id}`, {
        method: "DELETE"
      })

      if (resposta.ok) {
        setMensagem("Cliente excluído com sucesso!")
        buscaDados()
      } else {
        const erro = await resposta.json()
        setMensagem(erro.mensagem)
      }
    } catch (erro) {
      console.log(erro)
      setMensagem("Erro ao excluir cliente")
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
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              placeholder="Nome"
              required
            />
            <input
              type="text"
              name="telefone"
              id="telefone"
              onChange={(e) => setTelefone(e.target.value)}
              value={telefone}
              placeholder="Telefone"
              required
            />
            <input type="submit" value="Cadastrar" />
          </form>
        </div>

        <div className="container-listagem">
          <h2>Clientes Cadastrados</h2>

          {clientes.map(cliente => (
            <div className="procedimento-container" key={cliente.id}>
              <div className="produto-nome">{cliente.nome}</div>
              <div className="produto-preco">Telefone: {cliente.telefone}</div>
              <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </main>
      <footer></footer>
    </>
  )
}

export default Cadastro
