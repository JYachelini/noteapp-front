export interface DatabaseNoteInterface {
	title: string
	content: string
	category?: string[]
	archived?: boolean
	_id: string
}