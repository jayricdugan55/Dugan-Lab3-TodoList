import { useState } from 'react'
import type { TodoSection } from './types'
import './App.css'

export default function App() {
  const [sections, setSections] = useState<TodoSection[]>([])
  const [newHeading, setNewHeading] = useState('')
  const [newItemInputs, setNewItemInputs] = useState<Record<number, string>>({})

  const addHeading = () => {
    if (!newHeading.trim()) return
    setSections(prev => [...prev, {
      id: Date.now(),
      heading: newHeading.trim(),
      items: []
    }])
    setNewHeading('')
  }

  const deleteHeading = (sectionId: number) => {
    setSections(prev => prev.filter(s => s.id !== sectionId))
  }

  const addItem = (sectionId: number) => {
    const text = newItemInputs[sectionId]
    if (!text?.trim()) return
    setSections(prev => prev.map(s =>
      s.id === sectionId
        ? { ...s, items: [...s.items, { id: Date.now(), text: text.trim() }] }
        : s
    ))
    setNewItemInputs(prev => ({ ...prev, [sectionId]: '' }))
  }

  const deleteItem = (sectionId: number, itemId: number) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.filter(i => i.id !== itemId) }
        : s
    ))
  }

  return (
    <div className="app">
      <h1 className="main-title">My Todo List</h1>

      <div className="add-heading-bar">
        <input
          type="text"
          placeholder="Enter heading"
          value={newHeading}
          onChange={(e) => setNewHeading(e.target.value)}
          className="input-heading"
        />
        <button className="btn add-heading-btn" onClick={addHeading}>
          Add Heading
        </button>
        </div>

        <div className="sections-container">
        {sections.map(section => (
        <div key={section.id} className="section-card">
        <div className="section-top">
              <h2 className="section-heading">{section.heading}</h2>
              <button
                className="btn delete-heading-btn"
                onClick={() => deleteHeading(section.id)}
              >
                Delete Heading
            </button>
            </div>

                 <ul className="items-list">
                  {section.items.map(item => (
                  <li key={item.id} className="item-row">
                  <span>{item.text}</span>
                  <button
                    className="delete-x-btn"
                    onClick={() => deleteItem(section.id, item.id)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>

            <div className="add-item-bar">
              <input
                type="text"
                placeholder="Add list"
                value={newItemInputs[section.id] || ''}
                onChange={(e) => setNewItemInputs(prev => ({
                  ...prev,
                  [section.id]: e.target.value
                }))}
                className="input-item"
              />
              <button
                className="btn add-item-btn"
                onClick={() => addItem(section.id)}
              >
                Add List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}