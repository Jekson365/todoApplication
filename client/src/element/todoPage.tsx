import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../style/todopage.scss'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

export const TodoPage = () => {
    const [user, setUser] = useState<string>(window.location.href.split("/")[4])
    const [userData, setUserData] = useState<[]>([])
    const [userObject, setUserObject] = useState<any>({})

    async function getTodo(currentUser: string) {
        const res = await axios.get(`http://localhost:8080/todo/${currentUser}`)
            .then((res) => {
                if (res.status == 200) {
                    setUserObject(res.data)
                    setUserData(res.data.todo)
                }
            })

            .catch((err) => {
                throw err
            })
    }

    useEffect(() => {
        getTodo(user)
        console.log(userData)
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
            <div className="bar mw-400">
                <Link className='links' to={'/login'} >გასვლა</Link>
                <div className="user">
                    {userObject.username}
                    <div className="ic">
                        <FaUserAlt />
                    </div>
                </div>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit(submitTodo)} className='todo-form'>
                    <input type="text" placeholder='todo'
                        {...register("todo", { minLength: 4 })}
                    />
                    <button type="submit">დამატება</button>
                </form>
                {userData.map((each: string) => {
                    return (
                        <>
                            <div className='todo'>
                                <p>{each}</p>
                                <div className='delete-btn'><MdDelete /></div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>

    )
}
