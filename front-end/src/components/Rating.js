import React from 'react'

function Rating(props) {
    if (!props.value) {
        return (
            <div></div>
        )
    }
    return (
        <div clasName='rating'>
            <span>
                <i className="material-icons">{props.value >=1? star: props.value}</i>
            </span>
        </div>
    )



}

export default Rating
