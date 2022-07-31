import { useContext } from 'react'
import { NoteContext } from './Context/NotesContext'
import { ModalContext } from './Context/ModalContext'

function Navbar() {
	const { archivedNotes, handleArchived } = useContext(NoteContext)
	const { handleModalCreate, handleModalAdvancedSearch, handleModalLogin } = useContext(ModalContext)

	return (
		<header className='relative'>
			<nav className='flex flex-col items-center gap-10 mb-10'>
				<div>
					<h1 className='text-7xl'>{archivedNotes ? 'My archived notes' : 'My active notes'}</h1>
				</div>
				<div className='flex gap-4'>
					<button className='mt-auto border border-zinc-500 p-2 rounded-md' onClick={handleModalCreate}>
						Create new note
					</button>
					<button className='mt-auto border border-zinc-500 p-2 rounded-md min-w-[8rem]' onClick={handleArchived}>
						{archivedNotes ? 'Active notes' : 'Archived notes'}
					</button>
					<button onClick={handleModalAdvancedSearch} className='mt-auto border border-zinc-500 p-2 rounded-md'>
						Advanced search
					</button>
				</div>
			</nav>
			{/* <div className='flex gap-3 absolute top-0 right-0 '>
				<button onClick={handleModalLogin} className='p-1 border border-slate-700 rounded-md'>Log In</button>
				<button className='p-1 border border-slate-700 rounded-md'>Register</button>
			</div> */}
		</header>
	)
}

export default Navbar
