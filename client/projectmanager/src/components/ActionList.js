import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Action from './Action'

export default function ActionList(props) {
    const {projectID} = props;
    const [actions, setActions] = useState([])
    const [refresh, setRefresh] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newAction, setNewAction] = useState({
        project_id: projectID,
        description: '',
        notes: '',
        completed: ''
    })

    const handleChange = e => {
        setNewAction({
            ...newAction,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/actions')
            .then(res=>{
                // setActions(res.data)
                const filteredActions = res.data.filter(action => action.project_id === projectID);
                setActions(filteredActions);
            })
            .catch(err=>console.log(err))
    },[refresh])

    const onSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/actions/${projectID}`, newAction)
            .then(res=>{
                console.log(res);
                setRefresh(!refresh);
            })
            .catch(err=>console.log(err))
    }




    return (
        <div>
            <button onClick={()=>setIsAdding(!isAdding)}>Add an Action</button>
            {isAdding && <form onSubmit={onSubmit}>
                <input name='notes' placeholder='notes' value={newAction.notes} onChange={handleChange}/>
                <input name='description' placeholder='description' value={newAction.description} onChange={handleChange}/>
                <button>Submit</button>
            </form>}
            <div>
                {actions && actions.map(action => {
                    return <Action key={action.id} action={action} setRefresh={setRefresh} refresh={refresh}/>
                })}
            </div>
        </div>
    )
}