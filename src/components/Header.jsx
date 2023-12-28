import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const { cerrarSesion} = useAuth()
    return (
        <header className="py-5 bg-black">
            <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row">
                <h1 className=" text-2xl text-lime-400 text-center">Administrador de Datos de{''}
                    <span className="text-yellow-50"> Sensores</span>
                </h1>
                
                <nav className="flex flex-col-reverse justify-start items-center lg:flex-row gap-5 font-normal mt-6 lg:mt-0">

                    <Link 
                    to="https://youtu.be/mY9O19iNbRg" 
                    className="text-sm text-lime-400 inline-flex items-center justify-center rounded-md p-2 hover:bg-lime-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                    > Video Tutorial
                    </Link>

                    <Link 
                    to="/admin" 
                    className="text-sm text-lime-400 inline-flex items-center justify-center rounded-md p-2 hover:bg-lime-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                    > Registros
                    </Link>

                    <Link 
                    to="/admin/perfil" 
                    className="text-sm text-lime-400 inline-flex items-center justify-center rounded-md p-2 hover:bg-lime-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                    > Perfil
                    </Link>

                    <Link 
                    to="/admin/cambiar-password" 
                    className="text-sm text-lime-400 inline-flex items-center justify-center rounded-md p-2 hover:bg-lime-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                    > Cambiar Password
                    </Link>
                    
                    <button
                        type="button"
                        className="text-sm text-lime-400 inline-flex items-center justify-center rounded-md p-2 hover:bg-red-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white uppercase font-bold transition-colors duration-300"
                        onClick={cerrarSesion}
                    >Cerrar sesión
					</button>
                </nav>
            </div>
        </header>
    )
}
export default Header