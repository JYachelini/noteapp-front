import { useContext } from 'react'
import Note from './Note'
import { DatabaseNoteInterface } from '../interfaces/NoteInterface'
import { NoteContext } from './Context/NotesContext'

function ListNotes() {
	const { notes, filter, removeFilter } = useContext(NoteContext)

	return (
		<>
			{filter.length ? (
				<div className='mb-5 flex gap-2 items-center'>
					<span className='text-xl'>Filter by:</span>
					{filter.map((note, index) => (
						<span key={index} className='border border-slate-600 rounded-md px-1 py-[.1rem] text-sm'>
							{note.category}
							<span
								className='rounded-full border border-gray-500 cursor-pointer items-center inline-flex justify-center h-[20px] w-[20px] text-sm bg-neutral-900 text-white ml-2'
								onClick={() => {
									removeFilter(index)
								}}
							>
								X
							</span>
						</span>
					))}
				</div>
			) : null}
			<div className='flex flex-wrap gap-6'>
				{filter.length
					? filter.map((note: DatabaseNoteInterface, index: number) => {
							return <Note key={index} title={note.title} content={note.content} _id={note._id} archived={note.archived}></Note>
					  })
					: notes.map((note: DatabaseNoteInterface, index: number) => {
							return <Note key={index} title={note.title} content={note.content} _id={note._id} archived={note.archived} />
					  })}
			</div>
		</>
	)
}

export default ListNotes
