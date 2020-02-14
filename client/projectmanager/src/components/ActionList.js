import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Action from './Action'

export default function ActionList() {
    const [actions, setActions] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/actions')
            .then(res=>setActions(res.data))
            .catch(err=>console.log(err))
    },[])


    return (
        <div>
            {actions && actions.map(action => {
                return <Action key={action.id} action={action}/>
            })}
        </div>
    )
}