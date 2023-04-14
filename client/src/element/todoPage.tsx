import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../style/todopage.scss'
import { Link } from 'react-router-dom'

export const TodoPage = () => {
    const [user, setUser] = useState<string>(window.location.href.split("/")[4])
    const [userData, setUserData] = useState<[]>([])

    async function getTodo(currentUser: string) {
        const res = await axios.get(`http://localhost:8080/todo/${currentUser}`)
            .then((res) => {
                if (res.status == 200) {
                    setUserData(res.data.todo)
                }
            })

            .catch((err) => {
                throw err
            })
    }

    useEffect(() => {
        getTodo(user)

    }, [])

    const { register, handleSubmit } = useForm()


    const submitTodo = async (data: any) => {
        await axios.post(`http://localhost:8080/todo/newtodo/${user}`, data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                throw err
            })

        location.reload()
    }

    return (
        <>
            <div className="container">
                <Link to={'/login'}>Log out</Link>
                <form onSubmit={handleSubmit(submitTodo)}>
                    <input type="text" placeholder='todo'
                        {...register("todo", { minLength: 4 })}
                    />
                    <input type="submit" />
                </form>
                {userData.map((each: string) => {
                    return (
                        <>
                            <div className='todo'>
                                <p>{each}</p>
                                <div className='delete-btn'>delete</div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>

    )
}
