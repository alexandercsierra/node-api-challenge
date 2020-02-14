import React from 'react'

export default function Project(props) {
    const {action} = props;
    return (
        <div key={action.id}>
            <h3>#{action.id}: {action.description}</h3>
            <p>{action.notes}</p>
        </div>
    )
}