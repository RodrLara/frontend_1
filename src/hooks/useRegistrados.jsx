import { useContext } from "react"
import RegistradosContext from "../context/RegistradosProvider"

const useRegistrados = () => {
	return useContext(RegistradosContext)
}

export default useRegistrados