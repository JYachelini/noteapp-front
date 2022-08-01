import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { NoteContext } from './Context/NotesContext'

function Navbar() {
	const { setArchivedNotes, searchByCategory } = useContext(NoteContext)

	const [categories, setCategories] = useState<string[]>([])
	const [newCat, setNewCat] = useState<string>('')

	const input: MutableRefObject<HTMLInputElement | null> = useRef(null)

	useEffect(() => {
		input.current!.value = ''
	}, [categories])

	const handleKewDown = (e: any) => {
		if (e.key !== 'Enter') return
		const value: string = e.target.value
		if (!value.trim()) return
		setCategories([...categories, value])
	}

	const handleNewCat = () => {
		setCategories([...categories, newCat])
	}

	const remove = (index: number) => {
		setCategories(categories.filter((el, i) => i !== index))
	}

	useEffect(() => {
		searchByCategory(categories)
	}, [categories])
	return (
		<nav className='h-full border-r border-[#dfe1e4] pt-10 bg-slate-200 w-[35%] gap-3 flex flex-col'>
			<h1 className='px-2 text-xl font-bold p-1'>Views</h1>
			<div className='views-nav flex flex-col gap-3'>
				<button
					className='transition-colors'
					onClick={() => {
						setArchivedNotes(false)
					}}
				>
					<span className='font-medium'>Notes</span>
					<svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6'>
						<path d='M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8l8-8V5a2 2 0 0 0-2-2zm-7 16v-7h7l-7 7z'></path>
					</svg>
				</button>
				<button
					className='transition-colors'
					onClick={() => {
						setArchivedNotes(true)
					}}
				>
					<span className='font-medium'>Archived</span>
					<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'>
						<path d='m21.704 5.29-2.997-2.997A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.296 5.29A.994.994 0 0 0 2 5.999V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.999a.994.994 0 0 0-.296-.709zM6.414 4h11.172l1 1H5.414l1-1zM17 13v1H7v-4h2v2h6v-2h2v3z'></path>
					</svg>
				</button>
				<div className='search-by-category'>
					<span className='font-medium'>Search by category</span>
					<div className='search-by-category_box border border-[#dfe1e4] bg-slate-100'>
						<input onKeyDown={handleKewDown} onChange={(e) => setNewCat(e.target.value)} ref={input} type='text' className='input-category bg-slate-100' placeholder='Type...' />
					</div>
					<div className='add-category flex justify-center'>
						<button className='text-sm font-medium transition-colors rounded-md hover:bg-black hover:text-white' onClick={handleNewCat}>
							Add
						</button>
					</div>
					{categories
						? categories.map((category, index) => (
								<div
									key={index}
									className='categories bg-slate-100 cursor-pointer hover:bg-black hover:text-white transition-colors '
									onClick={() => {
										remove(index)
									}}
								>
									<span className='category'>{category}</span>
									<span className='rounded-full  items-center text-center flex justify-center text-sm h-[20px] w-[20px]'>x</span>
								</div>
						  ))
						: null}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
