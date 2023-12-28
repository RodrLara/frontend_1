import { useState } from 'react';
import useRegistrados from "../hooks/useRegistrados"; // Asegúrate que la ruta es correcta

function calcularPromedios(registrados) {
    let sumaLuminosidad = 0;
    let sumaTemperatura = 0;
    let sumaHumedad = 0;

    registrados.forEach(registrado => {
        sumaLuminosidad += registrado.LUMINOSIDAD;
        sumaTemperatura += registrado.TEMPERATURA;
        sumaHumedad += registrado.HUMEDAD;
    });

    const numRegistros = registrados.length;

    return {
        promedioLuminosidad: numRegistros ? (sumaLuminosidad / numRegistros).toFixed(2) : "No disponible",
        promedioTemperatura: numRegistros ? (sumaTemperatura / numRegistros).toFixed(2) : "No disponible",
        promedioHumedad: numRegistros ? (sumaHumedad / numRegistros).toFixed(2) : "No disponible"
    };
}

const Listado = () => {
    const { registrados } = useRegistrados(); // Asumiendo que esto devuelve la lista de registrados
    const [mostrarPromedios, setMostrarPromedios] = useState(true);

    const promedios = calcularPromedios(registrados);

    return (
        <>
            <div className="container mt-15 mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Promedios</h2>
                        <button 
                            onClick={() => setMostrarPromedios(!mostrarPromedios)}
							className="
								bg-black p-3 rounded 
								text-lime-400 uppercase font-bold 
								hover:bg-lime-300 
								hover:text-black 
								cursor-pointer transition-colors duration-300"

                        >
                            {mostrarPromedios ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>

                    {mostrarPromedios && (
                        <div className="text-gray-800 ">
                            <p className=" text-xl"> Luminosidad Promedio: <span className="font-semibold">{promedios.promedioLuminosidad}</span></p>
						
                            <p className=" text-xl">  Temperatura Promedio: <span className="font-semibold">{promedios.promedioTemperatura}</span> ℃</p>

                            <p className=" text-xl"> Humedad Promedio: <span className="font-semibold">{promedios.promedioHumedad}</span></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Listado;




