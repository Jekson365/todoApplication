import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    type User = {
        username: string,
        password: string,
    }
    const { register, handleSubmit } = useForm<User>()

    const handleLogin = (data: User) => {
        const { username, password } = data

        axios.post("http://localhost:8080/users/login",
            { username: username, password: password })
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    navigate(`/todo/${res.data.username}`)
                }
            })
            .catch((err) => {
                setError("no user found")
                setTimeout(()=> {
                    setError("")
                },2000)
                throw err
            })
    }

    return (
        <>
            {error}
            <form action="post" onSubmit={handleSubmit(handleLogin)}>
                <input type="text"
                    placeholder='username'
                    {...register("username")}
                />
                <input type="password"
                    placeholder='password'
                    {...register("password")}
                />
                <input type="submit" />
            </form>
        </>
    )
}
