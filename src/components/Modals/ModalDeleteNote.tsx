import React, { useContext } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NoteContext } from '../Context/NotesContext'
import Modal from './Modal'

const ModalDeleteNote: React.FC = () => {
	const { handleModalDelete,isModalDeleteVisible, noteToDelete } = useContext(ModalContext)
	const { deleteNote } = useContext(NoteContext)

	if (!isModalDeleteVisible) return null
	else
		return (
			<Modal onBackdropClick={handleModalDelete}>
				<div className='flex flex-col p-10 gap-6'>
					<div>
						<span className='text-2xl'>Are you sure you want to delete this note?</span>
					</div>
					<div className='flex justify-around'>
						<button className='border border-slate-700 rounded-md py-2 px-6' onClick={handleModalDelete}>
							No
						</button>
						<button
							className='border border-slate-700 rounded-md py-2 px-6'
							onClick={async (e) => {
								await deleteNote(noteToDelete._id!).then(() => {
									handleModalDelete()
								})
							}}
						>
							Yes
						</button>
					</div>
				</div>
			</Modal>
		)
}

export default ModalDeleteNote
