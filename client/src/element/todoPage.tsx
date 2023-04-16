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
    const [error, setError] = useState<string>()
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
        // console.log(userData)
    }, [userObject])

    const { register, handleSubmit, formState: { errors }, watch } = useForm()


    const submitTodo = async (data: any) => {
        if (data.todo.length > 4) {

            await axios.post(`http://localhost:8080/todo/newtodo/${user}`, data)
                .then((res) => {
                    // location.reload()
                })
                .catch((err) => {
                    throw err
                })
        }
        else {
            setError("მინიმუმ 4 სიმბოლო ველში")
            setTimeout(() => {
                setError("")
            }, 1000)
        }

    }

    const deleteTodo = async (name: string) => {
        await axios.post(`http://localhost:8080/todo/delete/${user}`, { todo: name })
            .then((res) => {
                // location.reload()
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
                                minLength: { value: 4, message: "მინიმუმ 4 სიმბოლო" },
                                required: "ველის შევსება აუცილებელია"
                            })}
                    />
                    <button type="submit">დამატება</button>
                </form>
                <div className="error">dasdksa</div>
                {userData.map((each: string) => {
                    return (
                        <>
                            <div className='todo'>
                                <p>{each}</p>
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
