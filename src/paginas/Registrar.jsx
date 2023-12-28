import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")

    const [alerta, setAlerta] = useState({})

    const handlesubmit = async e => {
        e.preventDefault()

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacios', error: true })
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true })
            return
        }

        if (password.length < 6) {
            setAlerta({ msg: 'El Password es muy corto, minimo 6 caracteres', error: true })
            return
        }

        setAlerta({})
        try {
            await clienteAxios.post('/usuarios', {
                nombre,
                email,
                password
            })
            setAlerta({
                msg: 'Usuario creado correctamente',
                error: false
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-xl px-1 py-10 m-auto">
                    <div className="text-white text-6xl mb-20">
                        <h1 className="text-white text-center font-black text-4xl">
                            Registro de nuevo usuario

                        </h1>
                    </div>

                    <div className=" bg-gray-100-transparent hover:border bg-fixed hover:border-white mt-20 md:mt-5 shadow-lg px-2 py-10 rounded ">
                        <form
                            onSubmit={handlesubmit}
                        >
                            <div className="p-5 my-5">
                                <label
                                    className="uppercase text-white text-xl font-bold"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="border w-full p-5 mt-3 bg-gray-50 rounded"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}

                                />
                            </div>
                            <div className="p-5 my-5">
                                <label
                                    className="uppercase text-white text-xl font-bold"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email de usuario"
                                    className="border w-full p-5 mt-3 bg-gray-50 rounded"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="p-5 my-5">
                                <label
                                    className="uppercase text-white text-xl font-bold"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="border w-full p-5 mt-3 bg-gray-50 rounded"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="p-5 my-5">
                                <label
                                    className="uppercase text-white text-xl font-bold"
                                >
                                    Repetir Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Repetir password"
                                    className="border w-full p-5 mt-3 bg-gray-50 rounded"
                                    value={repetirPassword}
                                    onChange={e => setRepetirPassword(e.target.value)}
                                />
                           

                            <input
                                type="submit"
                                value="Enviar Registro"
                                className="
								cursor-pointer 
								transition-colors duration-300
								w-full flex-auto items-center rounded py-5 px-10 mt-20 p-3 hover:cursor-pointer uppercase font-bold
								hover:outline  
								hover:border-lime-400
								hover:text-lime-300  
								bg-lime-400 
								hover:bg-black
								text-black 
								"/>
                             </div>

                            <nav className="mt-10 lg:flex lg:justify-between">
                                <Link
                                    className="block text-center mx-4 my-5 text-white"
                                    to="/">¿Ya tienes una cuenta? Inicia Sección</Link>
                                <Link
                                    className="block text-center mx-4 my-5 text-white"
                                    to="/olvide-password">Olvide mi Password</Link>
                            </nav>
                        </form>
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                </div>
            </div>

        </>
    )
}

export default Registrar