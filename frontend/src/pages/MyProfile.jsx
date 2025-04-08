import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
    records,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [file, setFile] = useState(null);
  
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addRecords = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        backendUrl + "/api/user/save-records",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);

         // Instantly update the list by adding the new image
      // setUserData((prev) => ({
      //   ...prev,
      //   records: [...prev.records, data.recordUrl], // assuming API returns it
      // }));
      await loadUserProfileData(); 

        setFile(null);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  
  return (
    userData && (
      <div className="flex flex-col sm:flex-row mt-8 justify-around ">
        <div className="max-w-lg flex flex-col gap-2 text-sm">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-24 rounded" src={userData.image} alt="" />
          )}

          {isEdit ? (
            <input
              className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800 mt-4">
              {userData.name}
            </p>
          )}
          <hr className="bg-zinc-400 h-[1px] border-none" />
          <div>
            <p className="text-neutral-500 underline mt-3">Contact Info:</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
              <p className="font-medium"> Email Id:</p>
              <p className="text-blue-500">{userData.email}</p>
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <p>
                  <input
                    className="font-medium bg-gray-100"
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <br />
                  <input
                    className="font-medium bg-gray-100"
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </p>
              ) : (
                <p className="text-gray-500">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
            <p className="text-neutral-500 underline mt-8">
              BASIC INFORMATION:
            </p>
            <br />
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5  text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  className="max-w-20 bg-gray-100"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
              <p className="font-medium">BirthDate: </p>
              {isEdit ? (
                <input
                  className="max-w-28 bg-gray-100"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-400"> {userData.dob}</p>
              )}
            </div>
          </div>
          <div className="mt-10">
            {isEdit ? (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {/* medical records */}
        <div>
          <div className="border mt-5 border-gray-300 rounded-lg p-5 flex flex-col items-center">
            <p className="mb-5 font-medium text-3xl text-neutral-800 mt-4">
              Save Your Medical Records Here:
            </p>
            <input className="ms-28"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="file"
            />{" "}
            <br />
            <button 
              onClick={addRecords}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
            >
              <a href="#record">Save</a>
            </button>
          </div>
          <div>
            <p className="mb-5 mt-10 font-medium text-3xl text-neutral-800 ">Medical History:</p>
            {userData.records.length === 0 
            ? <p className="text-gray-500">No records found.</p>
            : <div className=" mt-5">
            {[...(userData.records || [])].reverse().slice(0,5).map((item, index) => (
              <div id="record"
                key={index}
                className="border border-gray-300 rounded-lg p-3  items-center mb-5 mt-5 flex gap-3 justify-around"
              >
                <p className="text-gray-500">{index + 1}</p>
                <img className="w-24 h-12 object-cover" src={item} alt="" />
                <a href={item} download className="text-blue-500 hover:border hover:p-2 hover:border-gray-300 hover:rounded-lg hover:bg-gray-100">
                  View
                </a>
              </div>
            ))}
          </div>
            }
            
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
