import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        const getTodos = async () => {
            const res = await fetch(`/tasks/get`);
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
            const res = await fetch(`/tasks/delete/` + id, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto p-6 text-center max-w-lg">
            <h1 className="text-3xl font-extrabold mb-6">ToDo List</h1>
            <hr className="my-6 border-t-2 border-gray-300" />
            <Link className="text-2xl font-semibold mb-6 p-3 border border-gray-500 rounded-md bg-white text-gray-800 hover:bg-gray-200" to={`/create`}>Add New ToDo</Link>
            <hr className="my-6 border-t-2 border-gray-300" />
            <div className="flex flex-col max-w-lg mx-auto">
                {todos.length === 0 ? (
                    <h3 className="text-2xl text-gray-500">No ToDos</h3>
                ) : (
                    todos.map((todo, i) => (
                        <div key={i} className="border rounded-lg p-6 mb-6 shadow-lg bg-white text-center">
                            <div className="mb-4">
                                <p className="text-xl font-bold mb-2">{todo.task}</p>
                                {todo.description && <p className="font-semibold text-gray-700">Description:</p>}
                                <div className="text-gray-700 overflow-y-auto overflow-x-hidden custom-scrollbar" style={{ maxHeight: '6em', lineHeight: '1.5em', wordWrap: 'break-word' }}>
                                    {todo.description}
                                </div>
                                <div className="flex justify-between text-sm mt-4">
                                    <p className={`${todo.todoStatus === "completed" ? "text-green-500" : "text-red-500"} font-bold`}>
                                        {todo.todoStatus}
                                    </p>
                                    <p className="text-gray-700 font-bold">Due Date: {new Date(todo.dueDate).toLocaleDateString('en-GB')}</p>
                                </div>
                            </div>
                            <div className="flex justify-center space-x-6 mt-4">
                                <span
                                    onClick={() => handleDelete(todo._id)}
                                    className="text-white bg-red-500 px-3 py-1 rounded-md cursor-pointer hover:bg-red-700 font-bold"
                                >
                                    Delete
                                </span>
                                <Link to={`/update/${todo._id}`} className="text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-700 font-bold">
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
