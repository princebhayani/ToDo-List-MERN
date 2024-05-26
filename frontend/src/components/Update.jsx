import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";

function Update() {
    const getFormattedDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        task: "",
        description: "",
        dueDate: getFormattedDate(new Date()),
        todoStatus: "pending",
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchTodo = async () => {
            const todoId = params.id;
            const res = await fetch(`/tasks/get/${todoId}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData({
                ...data,
                dueDate: getFormattedDate(data.dueDate),
            });
        };
        fetchTodo();
    }, [params.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/tasks/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
        } catch (error) {
            console.log(error.message);
        }
        setFormData({
            task: "",
            description: "",
            dueDate: getFormattedDate(new Date()),
            todoStatus: "pending",
        });
        navigate("/");
    };

    return (
        <Form title={`Update ToDo`} handleSubmit={updateTodo} formData={formData} handleChange={handleChange} />
    );
}

export default Update;
