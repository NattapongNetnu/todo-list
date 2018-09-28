import React from 'react'

export const ListItem = (props) => {
    // console.log(props)
    return (
        <a className="panel-block"  
            id={props.todo._id} 
            onClick={props.onClick}
        >
            {props.todo.check ? props.todo.text : <del id={props.todo._id}>{props.todo.text}</del>}
        </a>
    );
}