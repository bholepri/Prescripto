import React, { useContext, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddReview = () => {
  const {  backendUrl, token ,doctors,appointments} = useContext(AppContext);
  const navigate = useNavigate()
  const { id } = useParams();
const appointment = appointments.find((item) => item._id === id);
    
  const [userData, setUserData] = useState("");
  const [docData, setDocData] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const getData = async () => {
    
    setDocData(appointment.docData.name);
    setUserData(appointment.userData.name);

    
  };
  //handle submit function
  const saveReview = async (e) => {
    e.preventDefault();

    if(!userData || !docData || !rating || !review) {
      toast.error("Please fill all fields");
    }

    const { data } = await axios.post(
      backendUrl + "/api/user/add-review",
      {
        userData,
        docData,
        rating,
        review,
        id
      },
      { headers: { token } }
    );
    setDocData('');
    setUserData('');
    setRating(0); 
    setReview('');

    navigate('/my-appointments')


    
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  
  useEffect(() => {
    getData();
  }, [id, backendUrl, token]);
  

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-20">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a Review</h2>
      <form onSubmit={saveReview} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={docData}
            onChange={(e) => setDocData(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating:
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setRating(num)}
                className={`text-yellow-400 hover:scale-110 transition ${
                  num <= rating ? "fill-yellow-400" : "fill-none text-gray-300"
                }`}
              >
                <Star fill={num <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
