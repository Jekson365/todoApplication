import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { useNavigate, Link } from 'react-router-dom';


export const Registration = () => {
    const [message, setMessage] = useState<string>()
    const navigate = useNavigate()
    type formValues = {
        username: string,
        password: string,
        passwordr: string,
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<formValues>()


    const submitData = async (data: formValues, event?: any) => {

        // event.preventDefault()   
        const { username, password, passwordr } = data
        if (password == passwordr) {
            if (username.length >= 4 && password.length >= 4 && password == passwordr) {
                await axios.post("http://localhost:8080/users/register",
                    { username: username, password: password }
                )
                    .then((res) => {
                        if (res.status == 200) {
                            setMessage("მომხარებელი დამატებულია")
                            reset()
                            setTimeout(() => {
                                setMessage("")
                            }, 1000)
                            navigate("/login")
                        }
                        if (res.status == 409) {
                            setMessage("მომხმარებელი უკვე რეგისტრირებულია")
                        }
                    })
                    .catch((err: any) => {
                        // if (err.response.status == 409) {

                        //     setTimeout(() => {
                        //         setMessage("")
                        //     }, 1000)
                        // }
                        throw err
                    })
            }
            else {
                setMessage("მინიმუმ 4 სიმბოლო")
                setTimeout(() => {
                    setMessage("")
                }, 1000)
            }
        }
        else {
            setMessage("პაროლი არ ემთხვევა ერთმანეთს")
            setTimeout(() => {
                setMessage("")
            }, 1000)
        }
    }

    return (
        <>
            <form method='post' className='list-form' onSubmit={handleSubmit(submitData)}>
            <h3 className='title'>რეგისტრაცია</h3>
                <div className={`error ${message ? "active-error" : ""}`}>
                    {message}
                </div>
                <input type="text" placeholder='სახელი'
                    {...register("username", {
                        minLength: 4,
                    })}
                />
                <input type="password" placeholder='პაროლი'
                    {...register("password", {
                        minLength: 4
                    })}
                />
                <input type="password" placeholder='გაიმეორეთ პაროლი'
                    {...register("passwordr", {
                        minLength: 4
                    })}
                />

                <button type="submit" >რეგისტრაცია</button>
                <Link className='links' to={'/login'}>შესვლა</Link>
            </form>
        </>
    )
}
