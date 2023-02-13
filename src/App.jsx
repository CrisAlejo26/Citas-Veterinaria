import { Formulario } from "./components/Formulario"
import { Header } from "./components/Header"
import { ListadoPacientes } from "./components/ListadoPacientes"
import { useEffect, useState } from "react"


function App() {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(window.localStorage.getItem('pacientes'))
      if (Object.keys(pacientesLS).length !== 0) {
        // El objeto tiene datos
        setPacientes(pacientesLS)
        return;
      } else {
        // El objeto no tiene datos
        setPaciente([])
        return;
      }
    }
    obtenerLS();
  }, []);

  useEffect(() => {
    window.localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(pacie =>
      pacie.id !== id)
      setPacientes(pacientesActualizados)
    }
  return(
    <div className="container mx-auto mt-20">
      <Header

      />
      <div className="mt-12 md:flex">
        <Formulario
          setPacientes = {setPacientes}
          pacientes = {pacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
        <ListadoPacientes
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
