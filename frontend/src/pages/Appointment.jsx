import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { Filter, Star } from "lucide-react";

const Appointment = () => {
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
    userData,
    getReviewsData
  } = useContext(AppContext);
  const { docId } = useParams();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const [rating, setRating] = useState(0);

  const [reviewData, setReviewData] = useState([]);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    //getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hrs
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          //add slots to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Log in to Book Appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const allReview = async () => {
    const { data } = await axios.get(backendUrl + "/api/user/all-review", {
      headers: { token },
    });
    //  console.log(data.reviews)
    const allReviews = data.reviews;
    const doctorName = docInfo.name;

    const filteredReviews = allReviews.filter(
      (review) => review.docData === doctorName
    );

    setReviewData(filteredReviews);
  };

  useEffect(() => {
    allReview();
  });

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {}, [docSlots]);

  return (
    docInfo && (
      <div>
        <div className="flex sm:flex-row flex-col gap-4 text-gray-600 my-6 p-2">
          <div>
            <img
              className="border bg-primary rounded-lg w-full sm:max-w-72"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl  font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex gap-3 my-2">
              <p>
                {docInfo.degree} - {docInfo.speciality}{" "}
              </p>
              <p className="border rounded-2xl text-sm w-16 text-center">
                {docInfo.experience}
              </p>
            </div>
            <div>
              <p className=" my-1 font-semibold flex gap-2">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm">{docInfo.about}</p>
            </div>
            <p className="font-semibold my-4 text-gray-700">
              Appointment fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* BOOKING SLOTS */}
        <div className="sm:ml-72 sm:pl-4 mt-4 fonr-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm border font-light flex-shrink-0 px-5 py-2 rounded-full  cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <div>
            <button
              onClick={bookAppointment}
              className="bg-primary rounded-3xl my-5 w-60 h-10 text-sm text-white"
            >
              Book an Appointment
            </button>
          </div>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

        {/* reviews */}
        <hr className="mt-5" />
        <p className="text-3xl  font-medium text-gray-900 text-center mt-10 mb-10">
          Reviews
        </p>
        {reviewData.length === 0 
        ? <p>No Reviews Found</p>
        : <div className="flex flex-col flex-wrap sm:flex-row gap-8 ml-4 ">
        {reviewData.map((item, index) => (
          <div
            key={index}
            className=" border rounded-xl p-8 shadow-sm bg-white hover:shadow-md transition hover:scale-105"
          >
            <div className="flex gap-4 mb-4 p-2 ">
              <img
                className="w-12 h-12 rounded-3xl"
                src={userData.image}
                alt=""
              />
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                {userData.name}
              </h3>
            </div>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < item.rating ? "text-yellow-400" : "text-gray-300"
                  }
                  fill={i < item.rating ? "#facc15" : "none"}
                />
              ))}
            </div>

            <p className="w-40 text-gray-700 mt-3 text-sm">{item.review}</p>

            <span className="mt-2 flex justify-end text-sm text-gray-500">
              {new Date(item.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
        
        }
        
      </div>
    )
  );
};

export default Appointment;
