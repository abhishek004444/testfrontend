import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../features/itemsSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current item data from Redux store
  const item = useSelector((state) =>
    state.items.items.find((item) => item.id === parseInt(id))
  );

  const [name, setName] = useState(item ? item.title : "");
  const [description, setDescription] = useState(item ? item.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/items/${id}`, {
        title: name,
        description,
      });

      if (response.data.status === 200) {
        dispatch(editItem({ id: parseInt(id), updatedData: { title: name, description } }));
        toast.success("Item updated successfully");
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
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
