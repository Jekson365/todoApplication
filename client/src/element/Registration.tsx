import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { useNavigate,Link } from 'react-router-dom';


export const Registration = () => {
    const [message, setMessage] = useState<string>()
    const navigate = useNavigate()
    type formValues = {
        username: string,
        password: string,
        passwordr: string,
    }

    const { register, handleSubmit, reset } = useForm<formValues>()

    const submitData = async (data: formValues, event?: any) => {
        // event.preventDefault()

        const { username, password, passwordr } = data
        if (password == passwordr) {
            if (username.length >= 4) {
                await axios.post("http://localhost:8080/users/register",
                    { username: username, password: password }
                )
                    .then((res) => {
                        if (res.status == 200) {
                            setMessage("user added!")
                            reset()
                            setTimeout(() => {
                                setMessage("")
                            }, 1000)
                            navigate("/login")
                        }
                    })
                    .catch((err) => {
                        setMessage("something went wrong!")
                        setTimeout(() => {
                            setMessage("")
                        }, 1000)
                        throw err
                    })
            }
        }
    }

    return (
        <>
            {message}
            <form method='post' className='list-form' onSubmit={handleSubmit(submitData)}>
                <input type="text" placeholder='username'
                    {...register("username", {
                        minLength: 4,
                    })}
                />
                <input type="password" placeholder='password'
                    {...register("password", {
                        minLength: 4
                    })}
                />
                <input type="password" placeholder='repeat password'
                    {...register("passwordr", {
                        minLength: 4
                    })}
                />

                <button type="submit" >submit</button>
            <Link to={'/login'}>login</Link>
            </form>
        </>
    )
}
