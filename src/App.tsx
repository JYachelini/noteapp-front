import { useContext } from 'react'
import { ModalProvider } from './components/Context/ModalContext'
import { NoteProvider } from './components/Context/NotesContext'
import { UserContext, UserProvider } from './components/Context/UserContext'
import ListNotes from './components/ListNotes'
import ModalAdvancedSearch from './components/Modals/ModalAdvancedSearch'
import ModalArchiveNote from './components/Modals/ModalArchiveNote'
import ModalCreateNote from './components/Modals/ModalCreateNote'
import ModalDeleteNote from './components/Modals/ModalDeleteNote'
import ShowNote from './components/ShowNote'
import { ModalLogin } from './components/Modals/ModalLogin'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {
	// const { username } = useContext(UserContext)
	return (
		// <UserProvider>
		<NoteProvider>
			<ModalProvider>
				<div className='App bg-white'>
					<div className='left-notes overflow-hidden'>
						<Navbar />
						<div className='border-r border-[#dfe1e4] w-[65%]'>
							<Header />
							<ListNotes />
						</div>
					</div>
					<div className='rigth-notes'>
						<ShowNote />
					</div>
					{/* <ModalCreateNote /> */}
					<ModalLogin />
					<ModalArchiveNote />
					<ModalDeleteNote />
				</div>
			</ModalProvider>
		</NoteProvider>
		// </UserProvider>
	)
}

export default App
