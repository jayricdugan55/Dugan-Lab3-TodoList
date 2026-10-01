export interface TodoItem {
    id: number
    text: string
}
export interface TodoSection {
    id: number
    heading: string
    items: TodoItem[]
}