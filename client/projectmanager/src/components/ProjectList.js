import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Project from './Project'

export default function ProjectList(props) {
    const {setProjectID} = props;
    const [projects, setProjects] = useState([])
    const [isAdding, setIsAdding] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: ''
    })

    useEffect(()=>{
        axios.get('http://localhost:5000/api/projects')
            .then(res=>setProjects(res.data))
            .catch(err=>console.log(err))
    },[refresh])

    const handleChange = e => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/projects/${e.target.id}`, newProject)
            .then(res=>{
                console.log(res);
                setRefresh(!refresh);
            })
            .catch(err=>console.log(err))
    }

    


    return (
        <div>
            <button onClick={()=>setIsAdding(!isAdding)}>Add a project</button>
            {isAdding && <form onSubmit={onSubmit}>
                <input name='name' placeholder='name' value={newProject.name} onChange={handleChange}/>
                <input name='description' placeholder='description' value={newProject.description} onChange={handleChange}/>
                <button>Submit</button>
            </form>}
            <div>
                {projects && projects.map(project => {
                    return <Project key={project.id} project={project} setRefresh={setRefresh} refresh={refresh} setProjectID={setProjectID}/>
                })}
            </div>
        </div>
    )
}
