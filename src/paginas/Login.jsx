import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth"
import clienteAxios from '../config/axios';

const Login = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alerta, setAlerta] = useState({})

	const { setAuth } = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if ([email, password].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true
			})
			return
		}
		
		try {
			const { data } = await clienteAxios.post('/usuarios/login', { email, password })
			localStorage.setItem('token', data.token)
			setAuth(data)
			navigate('/admin')
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
				<div className="text-white text-6xl mb-20 w-full">
					<h1 className="text-white text-center font-black text-6xl p-5">
						Ingreso de Usuario
					</h1>
				</div>
				<div className="w-full max-w-xl px-10 py-10 m-auto">


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
							</div>

							<div className="my-5 p-5">
								<label
									className="uppercase text-white block text-xl font-bold"
								>
									Password
								</label>
								<input
									type="password"
									placeholder="Tu Password"
									className=" w-full p-5 mt-3 bg-gray-50 rounded"
									value={password}
									onChange={e => setPassword(e.target.value)}

								/>

								<input
									type="submit"
									value="Iniciar Sesión"
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
									className="block text-center mx-4 my-5 text-grey-600 text-white"
									to="/registrar">Regístrate si no tienes una cuenta</Link >

								<Link
									className="block text-center mx-4 my-5 text-white"
									to="/olvide-password">Olvide mi Password </Link >
							</nav>
						</form>
					</div>
					{msg && <Alerta alerta={alerta} />}
				</div>
			</div>

		</>
	)
}

export default Login