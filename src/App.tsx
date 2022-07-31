import { useContext } from 'react'
import { ModalProvider } from './components/Context/ModalContext'
import { NoteProvider } from './components/Context/NotesContext'
import { UserContext, UserProvider } from './components/Context/UserContext'
import ListNotes from './components/ListNotes'
import ModalAdvancedSearch from './components/Modals/ModalAdvancedSearch'
import ModalArchiveNote from './components/Modals/ModalArchiveNote'
import ModalCreateNote from './components/Modals/ModalCreateNote'
import ModalDeleteNote from './components/Modals/ModalDeleteNote'
import ModalEditNote from './components/Modals/ModalEditNote'
import { ModalLogin } from './components/Modals/ModalLogin'
import Navbar from './components/Navbar'

function App() {
	// const { username } = useContext(UserContext)
	return (
		// <UserProvider>
		<NoteProvider>
			<ModalProvider>
				<div className='App relative overflow-hidden'>
					<Navbar />
					<ListNotes />
					<ModalLogin />
					<ModalEditNote />
					<ModalArchiveNote />
					<ModalDeleteNote />
					<ModalCreateNote />
					<ModalAdvancedSearch />
				</div>
			</ModalProvider>
		</NoteProvider>
		// </UserProvider>
	)
}

export default App
