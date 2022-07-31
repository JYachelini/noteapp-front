import React, { useContext, useState } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NoteContext } from '../Context/NotesContext'
import Modal from './Modal'

const ModalCreateNote: React.FC = () => {
	const { isModalCreateVisible, handleModalCreate } = useContext(ModalContext)
	const { addNote, handleCategory, removeCategory } = useContext(NoteContext)

	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState<string>('')
	const [categories, setCategories] = useState<string[]>([])
	const [error, setError] = useState('')

	const handleKewDown = (e: any) => {
		if (e.key !== 'Enter') return
		const value: string = e.target.value
		if (!value.trim()) return
		handleCategory(setCategories, categories, value)
		e.target.value = ''
	}

	const remove = (index: number) => {
		removeCategory(index, setCategories, categories)
	}

	if (!isModalCreateVisible) return null
	else
		return (
			<Modal onBackdropClick={()=>{
				setCategories([])
				handleModalCreate()
			}}>
				<div className='create-note absolute w-[600px] left-[50%] ml-[-300px] border border-zinc-500 p-3 bg-red-600 rounded-md'>
					<h2 className='text-3xl mb-6'>Create note</h2>
					<form className='flex flex-col justify-center gap-3'>
						{error}
						<span>
							Title <input type='text' placeholder='Title' className='m-auto' onChange={(e) => setTitle(e.target.value)} />
						</span>
						<span>
							Content <textarea name='content' id='' onChange={(e) => setContent(e.target.value)}></textarea>
						</span>
						<div className='flex gap-3'>
							<span>Categories</span>
							<div className='border border-slate-800 rounded-sm flex gap-1 p-3 flex-wrap'>
								{categories
									? categories.map((category, index) => (
											<div key={index} className='flex justify-center gap-1 bg-slate-400 rounded-2xl items-center p-1'>
												<span>{category}</span>
												<span onClick={() => remove(index)} className='rounded-full border border-gray-500 cursor-pointer items-center flex justify-center h-[20px] w-[20px] text-sm bg-neutral-900 text-white'>
													X
												</span>
											</div>
									  ))
									: null}
								<input onKeyDown={handleKewDown} type='text' className='input-category' placeholder='Add a category' />
							</div>
						</div>
						<span
							onClick={async () => {
								addNote(title, content, categories).then(
									() => {
										setError('')
										setTitle('')
										setContent('')
										setCategories([])
										handleModalCreate()
									},
									(res) => {
										setError(res)
									}
								)
							}}
							className='border border-slate-700 rounded-md m-auto p-1 cursor-pointer'
						>
							Add Note
						</span>
					</form>
				</div>
			</Modal>
		)
}

export default ModalCreateNote
