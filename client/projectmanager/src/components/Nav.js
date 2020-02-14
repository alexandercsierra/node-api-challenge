import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

export default function Nav() {
    return (
        <nav style={{marginBottom: "4%"}}>
            <TheLink to='/'>Home</TheLink>
            <TheLink to='/projects'>Projects</TheLink>
            
        </nav>
    )
}

const TheLink = styled(NavLink)`
    margin: 4%;
`;
