import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/itemsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/items/create",
        {
          title: name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          }
        }
      );

      if (response.data.status == 200) {
        dispatch(addItem(response?.data?.item));
        toast.success("Data added successfully");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
