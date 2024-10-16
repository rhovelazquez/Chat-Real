import io from 'socket.io-client'
import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


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

    return (
      <div className="d-flex container-xxl justify-content-center align-items-center vh-100 bg-dark" style={{ }}>
    <div className="p-4 bg-secondary text-light rounded" style={{ maxWidth: '600px', width: '100%' }}>
      <form className="d-flex mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control me-2 bg-light text-dark border-0"
          placeholder="Escribe tu mensaje"
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button className="btn btn-success">Enviar</button>
      </form>

      <ul className="list-group">
        {mensajes.map((mensaje, i) => (
          <li key={i} className="list-group-item bg-light text-dark border-0 mb-2">
            <strong>{mensaje.from}:</strong> {mensaje.data}
          </li>
        ))}
      </ul>
    </div>
  </div>
    );
  };
  

export default App;
