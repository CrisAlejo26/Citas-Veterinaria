import { useEffect, useState } from "react"
import { Errores } from "./Errores"

export const Formulario = ({setPacientes, pacientes, mostrarListado, setMostrarListado, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [error, setError] = useState(false)

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        return random + fecha;
    }

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validacion del Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true);
            return;
        } 

        setError(false)

        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if (paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(pcs => pcs.id === paciente.id ? objetoPaciente : pcs)
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else {
            // Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([
                ...pacientes,
                objetoPaciente
            ])
        }

        // Reiniciar Formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

        if (mostrarListado === false) {
            setMostrarListado(true)
        }
    }

    return (
    <div className="w-1/2 lg:w-2/5">
        <h1 className="font-black text-3xl text-center">Seguimiento Pacientes</h1>
        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {' '}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>
        <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {error && (
                    <Errores
                        mensaje ="Todos los campos son obligatorios"
                    />
                )}
            <div className="mb-5">
                <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input 
                    name="name"
                    id="mascota"
                    type="text" 
                    placeholder="Nombre de la Mascota" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="Propietario" className="block text-gray-700 uppercase font-bold">Propietario</label>
                <input 
                    name="propie"
                    id="Propietario"
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={(e) => setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                <input 
                    name="correo"
                    id="email"
                    type="Email" 
                    placeholder="Email contacto" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">Alta</label>
                <input 
                    name="alta"
                    id="Alta"
                    type="date" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="sintomas" 
                    className="block text-gray-700 uppercase font-bold">Síntomas</label>
                <textarea  
                    name="sin"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                    id="sintomas" 
                    placeholder="Describe los íntomas"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                />
            </div>

            
            <input type="submit" value={paciente.id ? "Editar Paciente" : "Agregar Paciente"} className="bg-indigo-600 w-full p-3 text-white uppercase-font-bold hover:bg-indigo-700 cursor-pointer transition-all" />
        </form>
    </div>
    )
}
