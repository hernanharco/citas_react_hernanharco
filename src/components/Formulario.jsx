import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
      // console.log(Object.keys(paciente).length > 0);
      if(Object.keys(paciente).length > 0) {
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
      }
  }, [paciente])
  
  
  const handleSubmit = (e)  => {
    e.preventDefault();

    //Validación del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacio');

      setError(true);
      return;
    }

    setError(false);

    //Para que saque el id unico
    const generarId = () => {
      const random = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);

      return random + fecha;
    }

    // Objeto de Paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,      
    }

    if(paciente.id) {
      // Editando el Registro
      objetoPaciente.id = paciente.id;
      // console.log(objetoPaciente);
      // console.log(paciente);

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

      setPacientes(pacientesActualizados);
      // setPacientes({});

    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);

    } 

    // Reiniciar el form
    // setNombre('');
    // setPropietario('');
    // setEmail('');
    // setFecha('');
    // setSintomas('');
  };


  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimineto Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' action="">
          
          {error && <Error><p>Todos los Campos son Obligatorios</p></Error> }

          <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="mascota">Nombre Mascota {nombre}</label>

            <input
                  id='mascota' 
                  type="text" 
                  placeholder='Nombre de la Mascota'
                  className='border-2 w-full p-2 m-2 placeholder-gray-400 rounder-md'
                  value={nombre}
                  onChange= {(e)=> setNombre(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre Propietario</label>

            <input
                  id='propietario' 
                  type="text" 
                  placeholder='Nombre del Propietario'
                  className='border-2 w-full p-2 m-2 placeholder-gray-400 rounder-md'
                  value={propietario}
                  onChange= {(e)=> setPropietario(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="email">Email</label>

            <input
                  id='email' 
                  type="email" 
                  placeholder='Email Contacto Propietario'
                  className='border-2 w-full p-2 m-2 placeholder-gray-400 rounder-md'
                  value={email}
                  onChange= {(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">Alta</label>

            <input
                  id='alta' 
                  type="date"                  
                  className='border-2 w-full p-2 m-2 placeholder-gray-400 rounder-md'
                  value={fecha}
                  onChange= {(e)=> setFecha(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">Sintomas</label> 
            <textarea
                    id='sintomas'
                    className='border-2 w-full p-2 m-2 placeholder-gray-400 rounder-md'
                    placeholder='Describre los Sintomas'
                    value={sintomas}
                    onChange= {(e)=> setSintomas(e.target.value)}
                    rows="" cols=""></textarea>
                            
          </div>

          <input 
              type="submit" 
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
              value= {paciente.id  ? 'Editar Paciente' : 'Agregar Paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario;
