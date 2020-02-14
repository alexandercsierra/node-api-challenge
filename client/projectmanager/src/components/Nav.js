import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

export default function Nav() {
    return (
        <nav>
            <TheLink to='/projects'>Projects</TheLink>
            <TheLink to='/actions'>Actions</TheLink>
        </nav>
    )
}

const TheLink = styled(NavLink)`

`;
