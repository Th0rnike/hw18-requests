import React, { useState } from 'react'

const TaskList = ({onFormSubmit}) => {
    const [name, setName] = useState()
    const [isCompleted, setIsCompleted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        onFormSubmit(name, isCompleted)
    }
        
    return (
        <div className='FormContainer'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='Add new task' onChange={e => setName(e.target.value)} />
                <button>Add</button>
            </form>
        </div>

    )
}

export default TaskList