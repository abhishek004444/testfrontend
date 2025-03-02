import { useSelector, useDispatch } from "react-redux";
import { deleteItem, fetchItems } from "../features/itemsSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  // const items = useSelector((state) => state.items.items);
  const { items, status, error } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/items/${id}`);
      if (response.data.status === 200) {
        dispatch(deleteItem(id));
        toast.success("Item deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Item
      </Link>
      {/* Show loading message while fetching data */}
      {status === "loading" && <p>Loading items...</p>}
      {status === "failed" && <p className="text-red-500">Error: {error}</p>}

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            {/* <th className="border border-gray-300 px-4 py-2">Created At</th> */}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">No items found</td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.description}</td>
                {/* <td className="border border-gray-300 px-4 py-2 text-center">
                  {Date.parse(item.created_at)}
                </td> */}
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <Link to={`/edit/${item.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
