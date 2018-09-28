import React from 'react'

export const ListButton = ({todo, onClick}) => {
    return (
        <a className="panel-block" id={todo._id} onClick={onClick}>X</a>
    )
}