import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const getTodos = async () => {
            const res = await fetch(`/api/get`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setTodos(data);
        };
        getTodos();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/delete/` + id, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setTodos((prev) => prev.filter((todos) => todos._id !== id));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
<div className="container mx-auto p-6 text-center max-w-lg">
    <h1 className="text-3xl font-extrabold mb-6">ToDo List</h1>
    <div className="flex flex-col max-w-lg mx-auto">
        {todos.length === 0 ? (
            <h3 className="text-2xl text-gray-500">No ToDos</h3>
        ) : (
            todos.map((todo, i) => (
                <div key={i} className="border rounded-lg p-6 mb-6 shadow-lg bg-white text-center">
                    <div className="mb-4">
                        <p className="text-xl font-bold mb-2">{todo.task}</p>
                        {todo.description && <p>Description:</p>}
                        <div className="text-gray-700 overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ maxHeight: '6em', lineHeight: '1.5em', wordWrap: 'break-word' }}>
                            {todo.description}
                        </div>
                        <div className="flex justify-between text-sm mt-4">
                            <p className={`${todo.todoStatus === "completed" ? "text-green-500" : "text-red-500"}`}>
                                {todo.todoStatus}
                            </p>
                            <p className="text-gray-400">Due Date:{todo.dueDate.toString().split('T')[0]}</p>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-6 mt-4">
                        <span
                            onClick={() => handleDelete(todo._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                        >
                            Delete
                        </span>
                        <Link to={`/update/${todo._id}`} className="text-blue-500 hover:text-blue-700">
                            Edit
                        </Link>
                    </div>
                </div>
            ))
        )}
    </div>
</div>


    

    );
}

export default Home;
