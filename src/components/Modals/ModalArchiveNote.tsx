import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NoteContext } from '../Context/NotesContext'
import Modal from './Modal'

const ModalArchiveNote: React.FC = () => {
	const { isModalArchiveVisible, noteToArchive, handleModalArchive } = useContext(ModalContext)
	const { archiveNote, archivedNotes } = useContext(NoteContext)

	const [archive, setArchive] = useState(!archivedNotes)
	const [error, setError] = useState('')

	useEffect(() => {
		setArchive(!archivedNotes)
	}, [archivedNotes])
	if (!isModalArchiveVisible) return null
	else
		return (
			<Modal onBackdropClick={handleModalArchive}>
				<div className='flex flex-col p-10 gap-6'>
					<div>
						<span className='text-2xl'>Are you sure you want to {archivedNotes ? 'unarchive' : 'archive'} this note?</span>
					</div>
					{error}

					<div className='flex justify-around'>
						<button className='border border-slate-700 rounded-md py-2 px-6' onClick={handleModalArchive}>
							No
						</button>
						<button
							className='border border-slate-700 rounded-md py-2 px-6'
							onClick={async () => {
								await archiveNote(noteToArchive._id!, archive).then(
									() => {
										handleModalArchive()
									},
									(res) => {
										setError(res)
									}
								)
							}}
						>
							Yes
						</button>
					</div>
				</div>
			</Modal>
		)
}

export default ModalArchiveNote
