import { useContext, useEffect, useRef } from 'react'
import Note from './Note'
import { DatabaseNoteInterface } from '../../interfaces/NoteInterface'
import { NoteContext } from '../Context/NotesContext'

function ListNotes() {
	const { notes, filter, archivedNotes } = useContext(NoteContext)
	const topRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		topRef.current?.scrollTo({ top: 0 })
	}, [notes])

	return (
		<>
			<div ref={topRef} className='flex flex-col overflow-y-auto h-[80%] border-b border-[#dfe1e4]'>
				{filter.length
					? filter.map((note: DatabaseNoteInterface, index: number) => {
							return <Note key={index} title={note.title} content={note.content} _id={note._id} archived={note.archived}></Note>
					  })
					: notes.map((note: DatabaseNoteInterface, index: number) => {
							if (note.archived === archivedNotes) {
								return <Note key={index} title={note.title} content={note.content} _id={note._id} archived={note.archived} />
							}
					  })}
			</div>
		</>
	)
}

export default ListNotes
