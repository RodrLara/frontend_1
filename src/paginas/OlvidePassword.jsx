import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault()

        if (email === '' || email.length < 6) {
            setAlerta({ msg: 'El Email es obligatorio', error: true })
            return
        }

        try {
            const { data } = await clienteAxios.post('usuarios/olvide-password', { email })
            setAlerta({ msg: data.msg })
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
                <div className="w-full max-w-xl px-10 py-10 m-auto">
                    <div className="text-white text-6xl mb-20">
                        <h1 className="text-white text-center font-black text-4xl">
                            Recibe instrucciones de recuperación

                        </h1>
                    </div>

                    <div className=" bg-gray-100-transparent hover:border bg-fixed hover:border-white mt-20 md:mt-5 shadow-lg px-2 py-10 rounded ">


                        <form onSubmit={handleSubmit}>

                            <div className='p-5'>
                                <label
                                    className="uppercase text-white text-xl font-bold"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email de usuario"
                                    className=" w-full p-5 mt-3 bg-gray-50 rounded"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            
                                <input
                                type="submit"
                                value="Enviar Intrucciones"
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
                                    to="/">¿Ya tienes una cuenta? Inicia Seción</Link>
                                <Link
                                    className="block text-center mx-4 my-5 text-white"
                                    to="/registrar">¿No tienes cuenta? Regístrate</Link>
                            </nav>
                        </form>
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                </div>
            </div>
        </>
    );
};

export default OlvidePassword;