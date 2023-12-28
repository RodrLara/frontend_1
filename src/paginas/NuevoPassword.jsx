import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
	const [password, setPassword] = useState('')
	const [alerta, setAlerta] = useState({})
	const [tokenValido, setTokenValido] = useState(false)
	const [passwordModificado, setPasswordModificado] = useState(false)

	const params = useParams()
	const { token } = params

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/usuarios/olvide-password/${token}`)
				setAlerta({
					msg: 'Coloca tu nuevo password'
				})
				setTokenValido(true)
			} catch (error) {
				console.log(error.response)
				setAlerta({
					msg: 'Hubo error en el enlace',
					error: true
				})
			}
		}
		comprobarToken()
	},[token])


	const handleSumit = async (e) => {
		e.preventDefault()

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe ser de al menos 6 caracteres',
				error: true
			})
			return
		}

		try {
			const url = `/usuarios/olvide-password/${token}`
			const { data } = await clienteAxios.post(url, { password })
			setAlerta({
				msg: data.msg
			})
			setPasswordModificado(true)
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
			<div>
				{msg && <Alerta alerta={alerta}/>}
				<h1 className="text-sky-800 font-black text-6xl" >
					Reestabler Password {" "}
					<span className="text-black"> Administrativo</span>
				</h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				
				
				{tokenValido && (
					<>
						<form onSubmit={handleSumit}>
							<div className="my-5">
								<label
									className="uppercase text-white text-xl font-bold"
								>
									Nuevo Password
								</label>
								<input
									type="password"
									placeholder="Nuevo Password"
									className="border w-full p-3 py-3 mt-3 bg-gray-50 rounded"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								value="Reestablecer Password"
								className="bg-slate-800 w-full rounded py-3 px-10  text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-slate-600 md:w-auto"
							/>
						</form>
						<Link
							className='block text-center my-5 text-white'
							to="/" > </Link>
					</>
				)}
				{passwordModificado && 
					<Link
						className='block text-center my-5 text-white'
						to="/" >Inicia Sesión </Link>
				}
			</div>
		</>
	)
}

export default NuevoPassword
