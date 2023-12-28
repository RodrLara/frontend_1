
const Alerta = ({alerta}) => {
    return (
        <div className={`${alerta.error ? 'bg-black' : 'bg-black'}
		 bg-black text-center p-3 py-6 rounded  my-5 uppercase
		 text-red-500 border-red-600 border-2 shadow drop-shadow-lg font-bold text-sm mb-10`} >
            {alerta.msg}
        </div>
    )
};

export default Alerta; 