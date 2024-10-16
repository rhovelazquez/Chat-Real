import io from 'socket.io-client'
import { useState,useEffect } from 'react'

const socket= io("/")

function App() {

  const [mensaje,setMensaje]=useState('')
  const [mensajes,setMensajes]=useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
    const nuevoMensaje={
      data:mensaje,
      from:'Yo'
    }
    setMensajes([...mensajes,nuevoMensaje])
    socket.emit('mensaje',mensaje)
  }

  useEffect(()=>{
      socket.on('mensaje',mensajesRecibido)
      return ()=>{
        socket.off('mensaje',mensajesRecibido)
      };
    },[])

  const mensajesRecibido= (mensaje)=> setMensajes((state)=>[...state,mensaje] )//no reinicia cada vez que se envie el msj

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Escribe tu mensaje' onChange={(e)=>setMensaje(e.target.value)}></input>
        <button>Enviar</button>
      </form>


      <ul>
        {
          mensajes.map((mensaje,i)=>(
            <li key={i}>{mensaje.from}:{mensaje.data}</li>
          ))
        }
      </ul>
    </div>
  )
}
export default App
