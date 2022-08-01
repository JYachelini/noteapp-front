import { useContext } from 'react'
import { NoteContext } from './Context/NotesContext'
import { INITIAL_STATE, ModalContext } from './Context/ModalContext'

function Header() {
	const { archivedNotes } = useContext(NoteContext)
	const { handleCreate,setNoteToEdit } = useContext(ModalContext)

	return (
		<header className='relative flex justify-between gap-10 py-10 px-3 border-b border-[#dfe1e4]'>
			<div>
				<h1 className='text-2xl p-1 font-bold'>{archivedNotes ? 'My archived notes' : 'My active notes'}</h1>
			</div>
			<div className='flex gap-4 '>
				<button className='mt-auto p-2 rounded-md hover:bg-slate-200 transition-colors' onClick={()=>{
					handleCreate()
					setNoteToEdit(INITIAL_STATE)
				}}>
					<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'>
						<path d='M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z'></path>
					</svg>
				</button>
			</div>
		</header>
	)
}

export default Header
