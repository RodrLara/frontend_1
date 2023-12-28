import useRegistrados from "../hooks/useRegistrados";

const Listado = () => {
	const { registrados, eliminarRegistrado } = useRegistrados();

	const imprimir = () => {
		window.print();
	}

	const formatearFechaHora = (fechaHora) => {
		const fecha = new Date(fechaHora);
		return {
			fecha: fecha.toLocaleDateString(),
			hora: fecha.toLocaleTimeString()
		};
	};

	return (
		<>
			{registrados.length ? (
				<>
					<h1 className="bg-black text-6xl px-5 py-4 mx-10 my-6 rounded-md text-white text-center shadow-lg">Registros de sensores</h1>
					<div className="mx-10 my-10 bg-white shadow-lg rounded-md overflow-hidden">
						<div className="overflow-y-auto" style={{ maxHeight: '600px' }}>

							<table className="min-w-full leading-normal">
								<thead className="sticky top-0 z-10">
									<tr>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Fecha
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50  text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Hora
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Luminosidad
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Temperatura
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Humedad
										</th>
										<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
											Acciones
										</th>
									</tr>
								</thead>
								<tbody>
									{registrados.map(registrado => {
										const { fecha, hora } = formatearFechaHora(registrado.createdAt);
										return (
											<tr key={registrado._id}>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-900">
													{fecha}
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-900">
													{hora}
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-900">
													{registrado.LUMINOSIDAD}
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-900">
													{registrado.TEMPERATURA}
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-900">
													{registrado.HUMEDAD}
												</td>
												<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
													<button
														type="button"
														className="text-red-500 hover:text-red-700"
														onClick={() => eliminarRegistrado(registrado._id)}
													>
														Eliminar
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>

						</div>
						<div className="flex justify-center my-6">
							<button
								type="button"
								className="
								bg-black p-3 rounded 
								text-lime-400 uppercase font-bold 
								hover:bg-lime-300 
								hover:text-black 
								cursor-pointer transition-colors duration-300"
								onClick={imprimir}
							>
								Imprimir
							</button>
						</div>
					</div>
				</>
			) : (
				<h2 className="bg-black text-3xl py-4 mx-10 rounded-md text-yellow-400 text-center shadow-lg">No hay registros</h2>
			)}
		</>
	);
}

export default Listado;







