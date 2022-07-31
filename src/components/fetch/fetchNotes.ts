import axios, { AxiosResponse } from 'axios'
import { DatabaseNoteInterface } from '../../interfaces/NoteInterface'
import { setNotesType } from '../../types/Types'

export const fetchNotes = (setNotes: setNotesType, archivedNotes: boolean) => {
	axios.get(`https://ensolvers-noteapp.herokuapp.com${archivedNotes ? '/notes/archive' : '/notes'}`, { withCredentials: true }).then((res: AxiosResponse) => {
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
