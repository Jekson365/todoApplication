import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
                setError("სახელი ან პაროლი არასწორია")
                setTimeout(() => {
                    setError("")
                }, 2000)
                throw err
            })
    }

    return (
        <>
            <form action="post" className='list-form' onSubmit={handleSubmit(handleLogin)}>
                <h2 className={`title`}>ავტორიზაცია</h2>
                <div className={`error ${error ? "active-error" : ""}`}>
                    {error}
                </div>
                <input type="text"
                    placeholder='სახელი'
                    {...register("username")}
                />
                <input type="password"
                    placeholder='პაროლი'
                    {...register("password")}
                />
                <button type="submit" >შესვლა</button>
                <Link className='links' to={'/registration'}>რეგისტრაცია</Link>
            </form>
        </>
    )
}
