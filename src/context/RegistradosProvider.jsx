import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const RegistradosContext = createContext()

export const RegistradosProvider = ({ children }) => {

	const [registrados, setRegistrados] = useState([])
	const [registrado, setRegistrado] = useState({})
	const { auth } = useAuth()


	useEffect(() => {
		const obtenerRegistrados = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) return
				const config = {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					}
				}
				const { data } = await clienteAxios('/registrados', config)
				setRegistrados(data)
			} catch (error) {
				console.log(error)
			}
		}
		obtenerRegistrados()
	}, [auth])

	const guardarRegistrado = async (registrado) => {
		
		const token = localStorage.getItem('token')
		const config = {
			headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
		}

		if (registrado.id) {
			try {
				const { data } = await clienteAxios.put(`/registrados/${registrado.id}`, registrado, config)

				const registradosActualizado = registrados.map( registradoState => registradoState._id === data._id ? data : registradoState)
				setRegistrados(registradosActualizado)
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				const { data } = await clienteAxios.post('/registrados', registrado, config)
				const {  ...registradoAlmacenado } = data
				setRegistrados([registradoAlmacenado, ...registrados])
			} catch (error) {
				console.log(error.response.data.msg)
			}
		}
	}

	const setEdicion = (registrado) => {
		setRegistrado(registrado)
	}

	const eliminarRegistrado = async id => {
		
		try {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			}
			const { data } = await clienteAxios.delete(`/registrados/${id}`, config)
			console.log(data)
			const registradosActualizados = registrados.filter(
			registradoState => registradoState._id !== id)
			setRegistrados(registradosActualizados)
		} catch (error) {
			console.log(error)
		}
		
	}

	return (
		<RegistradosContext.Provider
			value={{
				registrados,
				guardarRegistrado,
				setEdicion,
				registrado,
				eliminarRegistrado
			}}
		>
			{children}
		</RegistradosContext.Provider>

	)
}

export default RegistradosContext