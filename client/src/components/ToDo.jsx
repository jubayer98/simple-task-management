import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineAvTimer, MdOutlineDeleteOutline } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { GiPointyHat } from "react-icons/gi";

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = axios.create({ baseURL: "https://simple-task-management-server-delta.vercel.app" });

    // Fetch tasks function
    const fetchTasks = async () => {
        try {
            const response = await axiosPublic.get("/tasks?category=To-Do");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Delete task function
    const handleDelete = async (taskId) => {
        try {
            await axiosPublic.delete(`/tasks/${taskId}`);
            setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); // Remove task from UI
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks on mount

        // Polling every 2 seconds for real-time updates
        const interval = setInterval(() => {
            fetchTasks();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2 className="border-b-2 font-bold text-xl border-red-600">To-Do</h2>
            <div className="mt-4 mx-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task._id} className="border-b mt-4">
                            <div className="flex justify-between">
                                <div className="text-left">
                                    <p className="font-bold flex items-center">
                                        <span className="text-red-600"><GiPointyHat /></span>
                                        {task.title}
                                    </p>
                                    <p className="text-xs flex items-center text-gray-500">
                                        <span className="text-red-600"><MdOutlineAvTimer /></span>
                                        {new Date(task.timestamp).toISOString().split('T')[0]} | {new Date(task.timestamp).toISOString().split('T')[1].split('.')[0]}
                                    </p>
                                    <p className="text-sm text-slate-800">{task.description}</p>
                                </div>
                                <div className="flex flex-col text-xs space-y-2">
                                    <p className="flex items-center cursor-pointer" onClick={() => navigate(`/edit-task/${task._id}`)}>
                                        <span className="text-sky-600"><TiEdit /></span>Edit
                                    </p>
                                    <p className="flex items-center cursor-pointer text-red-600" onClick={() => handleDelete(task._id)}>
                                        <MdOutlineDeleteOutline /> Delete
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks in to-do</p>
                )}
            </div>
        </div>
    );
};

export default ToDo;