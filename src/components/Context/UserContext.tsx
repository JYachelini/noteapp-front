import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

interface UserInterface {
	username: string
	login: (username: string, password: string) => void
}

export const UserContext = createContext<UserInterface>({} as UserInterface)

export const UserProvider = ({ children }: any) => {
	const [username, setUsername] = useState<string>('')

	useEffect(() => {
		axios.get(`https://ensolvers-noteapp.herokuapp.com/user`, { withCredentials: true }).then((res) => {
			if (res.data) setUsername(res.data.username)
		})
	}, [])

	const login = (username: string, password: string) => {
		axios.post(`https://ensolvers-noteapp.herokuapp.com/ogin`, { username, password }, { withCredentials: true }).then((res) => {
			return res.data
		})
	}
	return <UserContext.Provider value={{ username, login }}>{children}</UserContext.Provider>
}
