import React, { useContext } from 'react'
import { NoteInterface } from '../interfaces/NoteInterface'
import noteSVG from '../assets/note.svg'
import editSVG from '../assets/pencil.svg'
import deleteSVG from '../assets/trash.svg'
import archiveSVG from '../assets/archive.svg'
import unarchiveSVG from '../assets/unarchive.svg'
import { ModalContext } from './Context/ModalContext'

const Note = ({ title, content, _id, archived }: NoteInterface) => {
	const { handleModalEdit, handleModalDelete, handleModalArchive } = useContext(ModalContext)
	return (
		<article id={_id} className='flex justify-between border border-zinc-600 w-96 h-36 p-3 pl-0'>
			<img
				src={noteSVG}
				alt='note'
				className='w-36 cursor-pointer'
				onClick={() => {
					handleModalEdit(_id)
				}}
			/>
			<div
				className='w-full overflow-hidden cursor-pointer'
				onClick={() => {
					handleModalEdit(_id)
				}}
			>
				<h2 className='text-lg font-bold overflow-hidden max-h-8'>{title}</h2>
				<div className='mb-auto'>
					<span className='break-words'>{content}</span>
				</div>
			</div>
			<div className='min-w-[15%] h-full flex flex-col'>
				<div className='flex mb-auto h-[50%]'>
					<button
						onClick={() => {
							handleModalEdit(_id)
						}}
						className='min-w-[50%] mb-auto'
					>
						<img src={editSVG} alt='edit' className='' />
					</button>
					<button
						onClick={() => {
							handleModalDelete(_id)
						}}
						className='min-w-[50%] mb-auto'
					>
						<img src={deleteSVG} alt='delete' className='' />
					</button>
				</div>
				<div>
					<button
						className='w-full h-full'
						onClick={() => {
							handleModalArchive(_id)
						}}
					>
						{!archived ? <img src={unarchiveSVG} alt='Unarchive note' className='w-full h-full' /> : <img src={archiveSVG} alt='Archive note' className='w-full h-full' />}
					</button>
				</div>
			</div>
		</article>
	)
}

export default Note
