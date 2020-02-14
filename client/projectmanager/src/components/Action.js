import React, {useState} from 'react'
import axios from 'axios'

export default function Project(props) {
    const {action, refresh, setRefresh} = props;
    const [isEditing, setIsEditing] = useState(false);

    const [newAction, setNewAction] = useState({
        id: action.id,
        project_id: action.project_id,
        description: action.description,
        notes: action.notes,
        completed: action.completed
    })

    const handleChange = e => {
        setNewAction({
            ...newAction,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // console.log(e.target.id)
        axios.put(`http://localhost:5000/api/actions/${action.id}`, newAction)
            .then(res=>{
                setRefresh(!refresh);
                setIsEditing(!isEditing);
            })
            .catch(err=>console.log(err))
    }

    const deleteAction = () => {
        axios.delete(`http://localhost:5000/api/actions/${action.id}`)
            .then(res=>setRefresh(!refresh))
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <div>
                <h3>#{action.id}: {action.description}</h3>
                <p>{action.notes}</p>
                <button id={action.id} onClick={()=>setIsEditing(!isEditing)}>Edit</button>
                <button onClick={deleteAction}>Delete</button>
            </div>
                {isEditing && <form onSubmit={onSubmit}>
                    <input name='notes' placeholder='notes' value={newAction.notes} onChange={handleChange}/>
                    <input name='description' placeholder='description' value={newAction.description} onChange={handleChange}/>
                    <button>Submit</button>
                </form>}
        </div>
    )
}

        