import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPaciente from "./components/ListadoPacientes"


function App() {  

  const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes, setPacientes] = useState(pacientesLS);
  const [paciente, setPaciente] = useState({});
  
  useEffect(() => {
    // console.log('Componente listo o cambió pacientes');
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  
  }, [pacientes]);
  

  const eliminarPaciente = (id) => {
    // console.log('Eliminando Paciente:' + id);
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id );

    // console.log(pacientesActualizados);
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
        <div className="mt-12 md:flex">
          <Formulario 
            pacientes = {pacientes}
            setPacientes = {setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          />
          <ListadoPaciente
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        </div>
    </div>
  )
}

export default App
