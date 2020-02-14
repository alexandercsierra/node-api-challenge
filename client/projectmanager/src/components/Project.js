import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

export default function Project(props) {
    const history = useHistory();
    const {project, setRefresh, refresh, setProjectID} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [newProject, setNewProject] = useState({
        id: project.id,
        name: project.name,
        description: project.description
    })


    const handleChange = e => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // console.log(e.target.id)
        axios.put(`http://localhost:5000/api/projects/${newProject.id}`, newProject)
            .then(res=>{
                setRefresh(!refresh);
                setIsEditing(!isEditing);
            })
            .catch(err=>console.log(err))
    }

    const deleteProject = () => {
        axios.delete(`http://localhost:5000/api/projects/${newProject.id}`)
            .then(res=>setRefresh(!refresh))
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <button id={project.id} onClick={()=>setIsEditing(!isEditing)}>Edit</button>
                <button onClick={deleteProject}>Delete</button>
                <button onClick={()=>{
                    history.push('/actions');
                    setProjectID(project.id);
                }}>See Actions</button>
            </div>
            {isEditing && <form onSubmit={onSubmit}>
                <input name='name' placeholder='name' value={newProject.name} onChange={handleChange}/>
                <input name='description' placeholder='description' value={newProject.description} onChange={handleChange}/>
                <button>Submit</button>
            </form>}
        </div>
    )
}
