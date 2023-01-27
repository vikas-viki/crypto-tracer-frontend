import React, { useState } from 'react'
import userContext from './user_context'
const UserState = (props) => {
    const [username, setUsername] = useState(null);
    const [useremail, setUseremail] = useState(null);
    const [userpic, setUserpic] = useState(null);
    return (
        <userContext.Provider value={{setUsername, setUseremail, setUserpic, username, useremail, userpic}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState