import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../style/todopage.scss'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import { ADDRESS, PORT } from '../main'
import { BsCheckLg } from 'react-icons/bs'

export const TodoPage = () => {
    const [user, setUser] = useState<string>(window.location.href.split("/")[4])
    const [userData, setUserData] = useState<[]>([])
    const [userObject, setUserObject] = useState<any>({})
    const [error, setError] = useState<string>()
    async function getTodo(currentUser: string) {

        const res = await axios.get(`http://${ADDRESS}:${PORT}/todo/${currentUser}`)
            .then((res) => {
                if (res.status == 200) {
                    setUserObject(res.data)
                    setUserData(res.data.todoObj)
                }
            })

            .catch((err) => {
                throw err
            })

    }

    useEffect(() => {
        getTodo(user)
        // console.log(userData)
    }, [userObject])

    const { register, handleSubmit, formState: { errors }, watch } = useForm()


    const submitTodo = async (data: any) => {

        if (data.todo.length <= 4) {
            setError("მინიმუმ 4 სიმბოლო ველში")
            setTimeout(() => {
                setError("")
            }, 1000)

        }
        else {

            await axios.post(`http://${ADDRESS}:${PORT}/todo/newtodo/${user}`, data)
                .then((res) => {
                    // location.reload()
                })
                .catch((err) => {
                    throw err
                })
        }

    }

    const deleteTodo = async (each: Object) => {
        console.log(each)
        await axios.post(`http://${ADDRESS}:${PORT}/todo/delete/${user}`, each)
            .then((res) => {
                // location.reload()
            })
            .catch((err) => {
                throw err
            })

    }
    const completeTodo = async (id: any) => {

        var ss = userObject.todoObj
        var ss2 = id.todoId

        const index = ss.findIndex((item: { todoId: any }) => item.todoId == ss2)


        await axios.post(`http://${ADDRESS}:${PORT}/todo/mark`, { id: id.todoId })

            .then((res) => {
            })
            .catch((err) => {
                throw err
            })
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
                <div className={`error ${error ? "active-error" : ""}`}>{error}</div>
                <form onSubmit={handleSubmit(submitTodo)} className='todo-form'>
                    <input type="text" placeholder='todo'
                        {...register("todo",
                            {
                                required: "ველის შევსება აუცილებელია"
                            })}
                    />
                    <button type="submit">დამატება</button>
                </form>
                <div className="error">dasdksa</div>
                {userData.map((each: any) => {
                    const { todoValue, _id, complete } = each
                    return (
                        <>
                            <div className={`todo ${complete ? "completed-todo" : ""}`}>
                                <p>{todoValue}</p>
                                <div className='check-btn'
                                    onClick={() => completeTodo(each)}
                                ><BsCheckLg /></div>
                                <div className='delete-btn'
                                    onClick={() => deleteTodo(each)}
                                ><MdDelete /></div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>

    )
}
