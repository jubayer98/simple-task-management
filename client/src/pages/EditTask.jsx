import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditTask = () => {
    const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "" // Ensuring category has a default value
        }
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const axiosPublic = axios.create({ baseURL: "https://simple-task-management-server-delta.vercel.app" });

    useEffect(() => {
        axiosPublic.get(`/tasks/${id}`)
            .then(response => {
                const { title, description, category } = response.data;
                reset({ title, description });
                setValue("category", category); // Ensures category is updated
            })
            .catch(error => {
                console.error("Error fetching task:", error);
            });
    }, [id, reset, setValue]);

    const onSubmit = data => {
        const updatedData = {
            ...data,
            timestamp: new Date().toISOString()
        };

        axiosPublic.patch(`/tasks/${id}`, updatedData)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
            })
            .catch(error => {
                console.error('Update error:', error);
                Swal.fire({
                    position: "top-end",
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Update failed! Please try again.',
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
                        <select
                            className="select select-bordered w-full max-w-xs"
                            {...register("category", { required: true })}
                        >
                            <option value="">Select a category</option>
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-red-600 text-white" disabled={isSubmitting}>
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
