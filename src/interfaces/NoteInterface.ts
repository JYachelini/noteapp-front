export interface NoteInterface {
	title: string
	content: string
	category?: string[]
	archived?: boolean
	_id: string
}

export interface DatabaseNoteInterface {
	title: string
	content: string
	category: string[]
	archived?: boolean
	_id: string
}

export interface NoteState {
	modalCreate: boolean
}
