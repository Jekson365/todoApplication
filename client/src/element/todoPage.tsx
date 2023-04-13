import React, { useState } from 'react'
import axios from 'axios'

export const TodoPage = () => {
    const [user,setUser] = useState<string>(window.location.href.split("/")[4])
    return (
        <>
            <h1>{user}</h1>
        </>
    )
}
