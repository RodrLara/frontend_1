import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const ConfirmarCuenta = () => {

		const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
		const [cargando, setCargando] = useState(true)
		const [alerta, setAlerta] = useState({})

		const params  = useParams()
		const { id } = params

		useEffect(() => {
			const confirmarCuenta = async () => {
				try {
					const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${id}`
					const { data } = await clienteAxios(url)
					setCuentaConfirmada(true)
					setAlerta({
						msg: data.msg
					})
				} catch (error) {
					setAlerta({
						msg: error.response.data.msg,
						error: true
					})
					
				}
				setCargando(false)
			}
			confirmarCuenta()
		}, [id])


	return (
		<>
			<div>
                <h1 className="text-white text-center from-black font-bold text-6xl">
                    Confirmación de Cuenta Administrativa
                    
                </h1>
            </div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded bg-slate-500 opacity-[94%]">
				{!cargando && <Alerta 
				alerta={alerta} 
				/>}
				{cuentaConfirmada && (
                    <Link
                    className='block text-center my-5 text-white'
                    to="/"
                    > Iniciar Sesión
                    </Link>
                )}
			</div>
		</>
	)
}

export default ConfirmarCuenta