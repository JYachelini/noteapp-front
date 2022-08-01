import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { DatabaseNoteInterface } from '../../interfaces/NoteInterface'
import { setNotesType } from '../../types/Types'

export const fetchNotes = (setNotes: setNotesType, archivedNotes: boolean) => {
	axios.get('http://localhost:8080/notes', { withCredentials: true }).then((res: AxiosResponse) => {
		const filteredNotes: DatabaseNoteInterface[] = []
		res.data.forEach((note: DatabaseNoteInterface) => {
			const noteInformation = {
				title: note.title,
				content: note.content,
				category: note.category,
				_id: note._id,
				archived: note.archived,
			}
			filteredNotes.push(noteInformation)
		})
		setNotes(filteredNotes)
	})
}

export const AddNote = (title: string, content: string, category: string[], setNotes: setNotesType, notes: DatabaseNoteInterface[], archivedNotes: boolean) => {
	try {
		return new Promise((resolve, reject) => {
			if (title && content) {
				axios.post(`http://localhost:8080/notes`, { note: { title, content, category } }, { withCredentials: true }).then((result) => {
					if (!archivedNotes) {
						setNotes([result.data, ...notes])
						resolve(true)
					} else resolve(true)
				})
			} else reject('Title and content are necesary')
		})
	} catch (error) {
		throw error
	}
}

export const EditNote = (title: string, content: string, category: string[], _id: string, archived: boolean, setNotes: setNotesType) => {
	try {
		return new Promise((resolve, reject) => {
			if (_id) {
				const newValues: DatabaseNoteInterface = {
					title,
					content,
					category,
					_id,
					archived,
				}
				axios
					.post('http://localhost:8080/notes/edit', { _id, newValues }, { withCredentials: true })
					.then(() => {
						setNotes((notes) => notes.map((note) => (note._id === _id ? newValues : note)))
					})
					.then(() => resolve(true))
			} else reject(false)
		})
	} catch (error) {
		throw error
	}
}

export const DeleteNote = (_id: string, setNotes: setNotesType) => {
	try {
		return new Promise((resolve, reject) => {
			if (_id) {
				axios
					.post('http://localhost:8080/notes/delete', { _id }, { withCredentials: true })
					.then(() => {
						setNotes((notes) => notes.filter((note) => note._id !== _id))
					})
					.then(() => resolve(true))
			} else reject(false)
		})
	} catch (error) {
		throw error
	}
}

export const ArchiveNote = (_id: string, setNotes: setNotesType, archived: boolean) => {
	try {
		return new Promise((resolve, reject) => {
			console.log(_id)
			if (_id) {
				axios
					.post('http://localhost:8080/notes/archive', { _id, archived }, { withCredentials: true })
					.then(() => {
						setNotes((notes) => notes.filter((note) => note._id !== _id))
					})
					.then(() => resolve(true))
			} else reject('This note is already active')
		})
	} catch (error) {
		throw error
	}
}

export const SearchByCategory = (category: string[], handleFilter: (note: DatabaseNoteInterface[]) => void) => {
	try {
		return new Promise((resolve, reject) => {
			if (category.length != 0) {
				axios
					.post('http://localhost:8080/notes/category', { category }, { withCredentials: true })
					.then((result: AxiosResponse) => {
						const filteredNotes: DatabaseNoteInterface[] = []
						result.data.forEach((note: DatabaseNoteInterface) => {
							const noteInformation = {
								title: note.title,
								content: note.content,
								category: note.category,
								_id: note._id,
								archived: note.archived,
							}
							filteredNotes.push(noteInformation)
						})
						handleFilter(filteredNotes)
					})
					.then(() => resolve(true))
			} else {
				handleFilter([])
			}
		})
	} catch (error) {
		throw error
	}
}

type setType = (value: React.SetStateAction<DatabaseNoteInterface>) => void

import { INITIAL_STATE } from '../Context/ModalContext'

export const searchNote = (_id: string, notes: DatabaseNoteInterface[], set: setType) => {
	let searchNote: DatabaseNoteInterface | undefined
	if (_id) {
		searchNote = notes.find((e) => e._id == _id)
	}
	if (searchNote) set(searchNote)
	else set(INITIAL_STATE)
}
