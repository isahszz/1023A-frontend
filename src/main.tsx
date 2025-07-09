import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Pagina from "./Pagina.tsx"
import Cadastro from './Cadastro.tsx'
import Catalogo from './Catalogo.tsx'
import Agenda from './Agenda.tsx'
import Informacao from './Informacao.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Pagina/>
  },
  {
    path:"/Cadastrar",
    element:<Cadastro/>
  },
   {
    path:"/Serviços",
    element:<Catalogo/>
  },
  {
    path:"/Agendar",
    element:<Agenda/>
  },
  {
    path:"/Informar",
    element:<Informacao/>
  },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)