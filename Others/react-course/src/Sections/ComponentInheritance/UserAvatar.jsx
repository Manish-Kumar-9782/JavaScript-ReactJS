import React from 'react'

const UserAvatar = (props) => {
    return (
        <div className='user-avatar' style={{ '--factor': props.pos.toString() }}>
            <img src={props.src} alt='user avatar' />
        </div>
    )
}

export default UserAvatar
