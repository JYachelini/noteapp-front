import React, { createContext, useEffect, useState } from 'react'
import { DatabaseNoteInterface } from '../../interfaces/NoteInterface'
import { fetchNotes } from '../Functions/NoteFunctions'
import { AddNote, ArchiveNote, DeleteNote, EditNote, SearchByCategory } from '../Functions/NoteFunctions'

interface NoteContext {
	archivedNotes: boolean
	setArchivedNotes: React.Dispatch<React.SetStateAction<boolean>>
	handleArchived: () => void

	filter: DatabaseNoteInterface[]
	setFilter: React.Dispatch<React.SetStateAction<DatabaseNoteInterface[]>>
	removeFilter: (category: string) => void

	notes: DatabaseNoteInterface[]
	addNote: (title: string, content: string, category: string[]) => Promise<unknown>
	editNote: (title: string, content: string, category: string[], _id: string, archived: boolean) => Promise<unknown>
	handleCategory: (setCategories: React.Dispatch<React.SetStateAction<string[]>>, categories: string[], value: string) => void
	removeCategory: (index: number, setCategories: setCategory, categories: string[]) => void
	deleteNote: (_id: string) => Promise<unknown>
	archiveNote: (_id: string, archive: boolean) => Promise<unknown>
	searchByCategory: (category: string[]) => Promise<unknown>
}

type setCategory = React.Dispatch<React.SetStateAction<string[]>>

export const NoteContext = createContext<NoteContext>({} as NoteContext)

export const NoteProvider = ({ children }: any): JSX.Element => {
	// View of archived or unarchived notes
	const [archivedNotes, setArchivedNotes] = useState<boolean>(false)

	const handleArchived = () => {
		setArchivedNotes(!archivedNotes)
	}

	// Notes to view
	const [notes, setNotes] = useState<DatabaseNoteInterface[]>([])
	useEffect(() => {
		fetchNotes(setNotes, archivedNotes)
	}, [archivedNotes])

	// Apply filter
	const [filter, setFilter] = useState<DatabaseNoteInterface[]>([])

	const removeFilter = (category: string) => {
		console.log(
			filter.filter((note) => {
				note.category!.some((cat) => category !== cat)
			})
		)
	}

	// Note functions
	const addNote = async (title: string, content: string, category: string[]) => {
		return await AddNote(title, content, category, setNotes, notes, archivedNotes)
	}

	const editNote = async (title: string, content: string, category: string[], _id: string, archived: boolean) => {
		return await EditNote(title, content, category, _id, archived, setNotes)
	}

	const handleCategory = (setCategories: setCategory, categories: string[], value: string) => {
		setCategories([...categories!, value])
	}

	const removeCategory = (index: number, setCategories: setCategory, categories: string[]) => {
		setCategories(categories.filter((el, i) => i !== index))
	}

	const deleteNote = async (_id: string) => {
		return await DeleteNote(_id, setNotes)
	}

	const archiveNote = async (_id: string, archive: boolean) => {
		return await ArchiveNote(_id, setNotes, archive)
	}

	const searchByCategory = async (category: string[]) => {
		return await SearchByCategory(category, setFilter)
	}

	return (
		<NoteContext.Provider value={{ notes, archivedNotes, setArchivedNotes, filter, setFilter, removeFilter, addNote, editNote, handleArchived, handleCategory, removeCategory, deleteNote, archiveNote, searchByCategory }}>
			{children}
		</NoteContext.Provider>
	)
}
