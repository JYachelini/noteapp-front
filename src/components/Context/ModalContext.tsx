import { createContext, useContext, useState } from 'react'
import { DatabaseNoteInterface } from '../../interfaces/NoteInterface'
import { searchNote } from '../Functions/NoteFunctions'
import { NoteContext } from './NotesContext'

interface ModalContext {
	isModalCreateVisible: boolean
	handleModalCreate: () => void
	handleCreate: () => void
	handleCreateFalse: () => void

	isModalEditVisible: boolean
	handleModalEdit: (_id?: string) => void
	noteToEdit: DatabaseNoteInterface
	setNoteToEdit: React.Dispatch<React.SetStateAction<DatabaseNoteInterface>>

	isModalDeleteVisible: boolean
	handleModalDelete: (e?: any) => void
	noteToDelete: DatabaseNoteInterface

	isModalArchiveVisible: boolean
	handleModalArchive: (e?: any) => void
	noteToArchive: DatabaseNoteInterface

	isModalAdvancedSearchVisible: boolean
	handleModalAdvancedSearch: (e?: any) => void

	isModalLoginVisible: boolean
	handleModalLogin: (e?: any) => void
}

export const INITIAL_STATE: DatabaseNoteInterface = {
	title: '',
	content: '',
	category: [],
	_id: '',
}

export const ModalContext = createContext<ModalContext>({} as ModalContext)

export const ModalProvider = ({ children }: any) => {
	const { notes } = useContext(NoteContext)

	// Modals

	// Creating note
	const [isModalCreateVisible, setIsModalCreateVisible] = useState(false)

	const handleModalCreate = () => {
		setIsModalCreateVisible(!isModalCreateVisible)
	}
	const handleCreate = () => {
		setIsModalCreateVisible(true)
	}
	const handleCreateFalse = () => {
		setIsModalCreateVisible(false)
	}

	// Editing note
	const [isModalEditVisible, setIsModalEditVisible] = useState(false)
	const [noteToEdit, setNoteToEdit] = useState<DatabaseNoteInterface>(INITIAL_STATE)

	const handleModalEdit = (_id?: string) => {
		if (_id) {
			searchNote(_id, notes, setNoteToEdit)
			setIsModalEditVisible(true)
		} else {
			setIsModalEditVisible(false)
		}
	}

	// Deleting note
	const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
	const [noteToDelete, setNoteToDelete] = useState<DatabaseNoteInterface>(INITIAL_STATE)

	const handleModalDelete = (_id: string) => {
		searchNote(_id, notes, setNoteToDelete)
		setIsModalDeleteVisible(!isModalDeleteVisible)
	}

	// Archiving note
	const [isModalArchiveVisible, setIsModalArchiveVisible] = useState(false)
	const [noteToArchive, setNoteToArchive] = useState<DatabaseNoteInterface>(INITIAL_STATE)

	const handleModalArchive = (_id: string) => {
		searchNote(_id, notes, setNoteToArchive)
		setIsModalArchiveVisible(!isModalArchiveVisible)
	}

	// Advanced search
	const [isModalAdvancedSearchVisible, setIsModalAdvancedSearchVisible] = useState(false)

	const handleModalAdvancedSearch = (e: any) => {
		setIsModalAdvancedSearchVisible(!isModalAdvancedSearchVisible)
	}

	// Login
	const [isModalLoginVisible, setIsModalLoginVisible] = useState(false)

	const handleModalLogin = (e: any) => {
		setIsModalLoginVisible(!isModalLoginVisible)
	}
	return (
		<ModalContext.Provider
			value={{
				isModalCreateVisible,
				handleModalCreate,
				handleCreate,
				handleCreateFalse,
				isModalEditVisible,
				handleModalEdit,
				noteToEdit,
				setNoteToEdit,
				isModalDeleteVisible,
				handleModalDelete,
				noteToDelete,
				isModalArchiveVisible,
				handleModalArchive,
				noteToArchive,
				isModalAdvancedSearchVisible,
				handleModalAdvancedSearch,
				isModalLoginVisible,
				handleModalLogin,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
