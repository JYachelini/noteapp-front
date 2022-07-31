import React, { useContext, useState } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { UserContext } from '../Context/UserContext'
import Modal from './Modal'

export const ModalLogin: React.FC = () => {
	const { isModalLoginVisible, handleModalLogin } = useContext(ModalContext)
	const { login } = useContext(UserContext)

	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	if (!isModalLoginVisible) return null
	else
		return (
			<Modal onBackdropClick={handleModalLogin}>
				<div className='flex flex-col p-10 gap-5'>
					<input type='text' placeholder='Username' className='border border-slate-700 rounded-md p-2' onChange={(e) => setUsername(e.target.value)} />
					<input type='text' placeholder='Password' className='border border-slate-700 rounded-md p-2' onChange={(e) => setPassword(e.target.value)} />
					<button
						className='border border-slate-700 rounded-md p-1 m-auto'
						onClick={() => {
							login(username, password)
						}}
					>
						Log In
					</button>
					<span
						className='text-center cursor-pointer m-auto hover:font-bold transition-all'
						onClick={() => {
							handleModalLogin()
						}}
					>
						Create new account
					</span>
				</div>
			</Modal>
		)
}
