import { ModalProvider } from './components/Context/ModalContext'
import { NoteProvider } from './components/Context/NotesContext'
import ListNotes from './components/Notes/ListNotes'
import ModalArchiveNote from './components/Modals/ModalArchiveNote'
import ModalDeleteNote from './components/Modals/ModalDeleteNote'
import ShowNote from './components/Notes/ShowNote'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {
	return (
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
					<ModalArchiveNote />
					<ModalDeleteNote />
				</div>
			</ModalProvider>
		</NoteProvider>
	)
}

export default App
