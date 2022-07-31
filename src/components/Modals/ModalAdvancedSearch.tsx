import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NoteContext } from '../Context/NotesContext'
import Modal from './Modal'

const ModalAdvancedSearch: React.FC = () => {
	const { isModalAdvancedSearchVisible, handleModalAdvancedSearch } = useContext(ModalContext)
	const { searchByCategory, setFilter, removeFilter } = useContext(NoteContext)

	const [categories, setCategories] = useState<string[]>([])
	const [error, setError] = useState<string>('')

	const handleKewDown = (e: any) => {
		if (e.key !== 'Enter') return
		const value: string = e.target.value
		if (!value.trim()) return
		setCategories([...categories, value])
		e.target.value = ''
	}

	const remove = (index: number) => {
		setCategories(categories.filter((el, i) => i !== index))
	}

	if (!isModalAdvancedSearchVisible) return null
	else
		return (
			<Modal
				onBackdropClick={() => {
					setCategories([])
					handleModalAdvancedSearch()
				}}
			>
				<div className='create-note absolute w-[600px] left-[50%] ml-[-300px] border border-zinc-500 p-3 bg-red-600 rounded-md'>
					<h2 className='text-3xl mb-6'>Filter by Category</h2>
					<div className='flex flex-col justify-center gap-3'>
						{error}
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
								searchByCategory(categories).then(
									() => {
										setCategories([])
										handleModalAdvancedSearch()
									},
									(res) => {
										setError(res)
									}
								)
							}}
							className='border border-slate-700 rounded-md m-auto p-1 cursor-pointer'
						>
							Show notes
						</span>
					</div>
				</div>
			</Modal>
		)
}

export default ModalAdvancedSearch
