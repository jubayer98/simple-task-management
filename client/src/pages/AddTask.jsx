import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();
    const axiosPublic = axios.create({ baseURL: "https://simple-task-management-server-delta.vercel.app" });

    const onSubmit = data => {
        const completeData = {
            ...data,
            timestamp: new Date().toISOString()
        };

        axiosPublic.post('/tasks', completeData)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task added. Redirecting...",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate("/");
            })
            .catch(error => {
                console.error('Submission error:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Request failed! Please try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your Task Title"
                            className="input input-bordered"
                            {...register("title", { required: true })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Your Task Description"
                            {...register("description", { required: true })}
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Category</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" {...register("category", { required: true })}>
                            <option value="" disabled selected>Select Task Category</option>
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-red-600 text-white">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
