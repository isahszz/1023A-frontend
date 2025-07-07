//Hooks -> iniciam com "use"
// só pode usar ele no começo do componente
import { useState } from "react"
interface ContainerProps{
  nome:string
} 

function Container(props:ContainerProps){
    const [texto,setTexto] = useState("")

  function trataInput(event:React.ChangeEvent<HTMLInputElement>){
    console.log(event.currentTarget.value)
    setTexto(event.currentTarget.value)
  }
  return(
    <>
      <h1>{props.nome}</h1>
      Texto:{texto}
      <input type="text" 
              placeholder="Mostrar Texto" 
              onChange={trataInput}/>
    </>
  )
}
export default Container