import { useContext } from 'react'
import { NoteInterface } from '../interfaces/NoteInterface'
import { ModalContext } from './Context/ModalContext'

const Note = ({ title, content, _id }: NoteInterface) => {
	const { handleModalEdit,handleCreateFalse } = useContext(ModalContext)
	return (
		<article id={_id} className='flex justify-between w-full h-[9rem] p-3 hover:bg-slate-100 transition-colors border-y'>
			<div
				className='w-full overflow-hidden cursor-pointer'
				onClick={() => {
					handleModalEdit(_id)
					handleCreateFalse()
				}}
			>
				<h2 className='text-lg font-bold overflow-hidden'>{title}</h2>
				<div className='mb-auto'>
					<span className='break-words'>{content}</span>
				</div>
			</div>
		</article>
	)
}

export default Note
