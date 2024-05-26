import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

function Create() {
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    task: "",
    description: "",
    dueDate: getFormattedDate(),
    todoStatus: "pending",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/tasks/add`, {
        method: "POST",
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
      dueDate: getFormattedDate(),
      todoStatus: "pending",
    });
    navigate("/");
  };

  return (
    <Form title={`Add a New ToDo`} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} />
  );
}

export default Create;
