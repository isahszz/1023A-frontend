import { useEffect, useState } from "react"
import './Pagina.css'
interface ProdutosState {
    id: number,
    nome: string,
    preco: number,
    categoria: string
}

function Pagina() {
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [categoria, setCategoria] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [produtos, setProdutos] = useState<ProdutosState[]>([])
    useEffect(() => {
        const buscaDados = async () => {
            try {
                const resultado = await fetch("http://localhost:8000/produtos")
                if (resultado.status === 200) {
                    const dados = await resultado.json()
                    setProdutos(dados)
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
    }, [])// [] => significa as dependências do useEffects
    async function TrataCadastro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //Criar um novo produto
        const novoProduto: ProdutosState = {
            id: parseInt(id),
            nome: nome,
            preco: parseFloat(preco),
            categoria: categoria
        }
        try {
            const resposta = await fetch("http://localhost:8000/produtos", {
                method: "POST",
                headers: {
                    "Contenty-Type": "application/json"
                },
                body: JSON.stringify(novoProduto)
            })

            if (resposta.status === 200) {
                const dados = await resposta.json()
                setProdutos([...produtos, novoProduto])

            }
            if (resposta.status === 400) {
                const erro = await resposta.json()
                setMensagem(erro.mensagem)
                //console.log(erro.mensagem)
            }
        
        }
        catch (error) { }
    //Adicionar esse novo produto no vetor/Array de produtos

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
function trataCategoria(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoria(event.target.value)
}
return (
    <>
        <header>
            <div>
                <h1>Salão de Beleza</h1>
            </div>
          
            <nav>
                <ul>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">Home</a>
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            {mensagem &&
                <div className="mensagem">
                    <p>{mensagem}</p>
                </div>
            }

            <div className="container-listagem">
                {produtos.map(produto => {
                    return (
                        <div className="produto-container">
                            <div className="produto-nome">
                                {produto.nome}
                            </div>
                            <div className="produto-preco">
                                {produto.preco}
                            </div>
                            <div className="produto-categoria">
                                {produto.categoria}
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </main>
        <footer></footer>
    </>
)
}

export default Pagina