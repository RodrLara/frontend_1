import { useState } from 'react'
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth';

const CambiarPassword = () => {

	const { guardarPassword } = useAuth()
	const [alerta, setAlerta] = useState({})
	const [password, setPassword] = useState({
		pwd_actual: '',
		pwd_nuevo: ''
	})

	const handleSubmit = async e => {
		e.preventDefault();
		if (Object.values(password).some(campo => campo === '')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}

		if (password.pwd_nuevo.length < 6) {
			setAlerta({
				msg: 'El Password debe tener mínimo 6 caracteres',
				error: true
			})
			return
		}
		const respuesta = await guardarPassword(password)
		setAlerta(respuesta)
	
	}

	const { msg } = alerta

	return (
		<>
			<div className="flex justify-center">
				<div className="w-full md:w-1/2 bg-gray-300 bg-opacity-50 shadow rounded p-5">
					<form
						onSubmit={handleSubmit}
					>
						<div>
							<label className="uppercase font-bold text-gray-600">Password Actual</label>
							<input
								type="password"
								className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
								name="pwd_actual"
								placeholder="Escribe tu password actual"
								onChange={e => setPassword({
									...password,
									[e.target.name]: e.target.value
								})}
							/>

							<label className="uppercase font-bold text-gray-600">Nuevo Password</label>
							<input
								type="password"
								className="border bg-gray-50 w-full p-2 mt-2 mb-5 rounded"
								name="pwd_nuevo"
								placeholder="Escribe tu Nuevo Password"
								onChange={e => setPassword({
									...password,
									[e.target.name]: e.target.value
								})}
							/>
						</div>

						<div className="flex justify-center">
							<input
								type="submit"
								value="Actualizar Password"
								className="
								bg-black p-3 rounded 
								text-lime-400 uppercase font-bold 
								hover:bg-lime-300 
								hover:text-black cursor-pointer transition-colors duration-300"
							/>
						</div>
					</form>
					{msg && <Alerta alerta={alerta} />}
				</div>
			</div>
		</>
	)
}

export default CambiarPassword