import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NoteContext } from '../Context/NotesContext'

const ShowNote: React.FC = () => {
	const { removeCategory, handleCategory, editNote, addNote } = useContext(NoteContext)
	const { isModalEditVisible, noteToEdit, handleModalEdit, handleModalDelete, handleModalArchive, isNoteCreate,handleCreateFalse } = useContext(ModalContext)

	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState<string>('')
	const [categories, setCategories] = useState<string[]>([])
	const [error, setError] = useState('')

	useEffect(() => {
		setTitle(noteToEdit.title)
		setContent(noteToEdit.content)
		setCategories(noteToEdit.category)
	}, [noteToEdit])

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

	if (!isModalEditVisible && !isNoteCreate) return null
	else
		return (
			<div className='h-full bg-white'>
				<span
					className='absolute right-0 m-6 mt-2 rounded-full hover:bg-black flex justify-center items-center cursor-pointer'
					onClick={() => {
						if(isNoteCreate)handleCreateFalse()
						if(isModalEditVisible)handleModalEdit()
						
					}}
				>
					<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' className='hover:fill-slate-100'>
						<path d='M9.172 16.242 12 13.414l2.828 2.828 1.414-1.414L13.414 12l2.828-2.828-1.414-1.414L12 10.586 9.172 7.758 7.758 9.172 10.586 12l-2.828 2.828z'></path>
						<path d='M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm0-18c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z'></path>
					</svg>
				</span>
				<div className='create-note rounded-md h-full pt-10'>
					<form className='flex flex-col gap-3 h-full'>
						<input className='font-medium text-3xl p-2 px-6 focus-visible:outline-none bg-slate-100 hover:bg-slate-200 transition-colors' type='text' maxLength={40} value={title} onChange={(e) => setTitle(e.target.value)} />
						<textarea className='resize-none h-[70%] p-6 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:outline-none' name='' id='' value={content} onChange={(e) => setContent(e.target.value)} />
						<div className='flex gap-3 px-6 h-[10%]'>
							<span className='text-xl pt-3'>Categories:</span>

							<div className='rounded-md flex gap-1 p-3 flex-wrap w-full bg-slate-100 hover:bg-slate-200 transition-colors overflow-y-auto'>
								{categories
									? categories.map((category, index) => (
											<div key={index} className='categories bg-slate-300 cursor-pointer hover:bg-black hover:text-slate-200 transition-colors h-min ' onClick={() => remove(index)}>
												<span>{category}</span>
												<span className='rounded-full  items-center text-center flex justify-center text-sm h-[20px] w-[20px]'>X</span>
											</div>
									  ))
									: null}
								<input onKeyDown={handleKewDown} type='text' className='input-category h-min' placeholder='Add a category' />
							</div>
						</div>
						{error}
						<div className='flex mt-auto mb-auto justify-around'>
							{isNoteCreate ? (
								<span
									onClick={(e) => {
										e.preventDefault()
										addNote(title, content, categories).then(
											() => {
												setError('')
												setTitle('')
												setContent('')
												setCategories([])
											},
											(res) => {
												setError(res)
											}
										)
									}}
									className='rounded-md p-2 cursor-pointer text-center m-auto bg-slate-200 hover:bg-black hover:text-slate-200 transition-colors'
								>
									Create note
								</span>
							) : (
								<>
									<span
										onClick={async (e) => {
											e.preventDefault()
											await editNote(title!, content!, categories, noteToEdit._id!, noteToEdit.archived!).then(
												() => {
													setError('')
												},
												(res) => setError(res)
											)
										}}
										className='rounded-md p-2 cursor-pointer text-center m-auto bg-slate-200 hover:bg-black hover:text-slate-200 transition-colors'
									>
										Save Note
									</span>
									<span
										className='rounded-md p-2 cursor-pointer text-center m-auto bg-slate-200 hover:bg-black hover:text-slate-200 transition-colors'
										onClick={(e) => {
											e.preventDefault()
											handleModalArchive(noteToEdit._id)
										}}
									>
										Archive note
									</span>
									<span
										className='rounded-md p-2 cursor-pointer text-center m-auto bg-slate-200 hover:bg-black hover:text-slate-200 transition-colors'
										onClick={(e) => {
											e.preventDefault()
											handleModalDelete(noteToEdit._id)
										}}
									>
										Delete note
									</span>
								</>
							)}
						</div>
					</form>
				</div>
			</div>
		)
}

export default ShowNote
