import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
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

                if (res.status == 200) {
                    navigate(`/${res.data.username}`)
                }
            })
            .then((err) => {
                throw err
            })
    }

    return (
        <>
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
