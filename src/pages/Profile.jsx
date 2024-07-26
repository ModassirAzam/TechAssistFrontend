import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { updateToken } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";

const Profile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(updateToken(localStorage.getItem("token")));
    navigate("/log-in");
  }

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  console.log("decoded: ", decoded);

  const fetchMyData = () => {
    axios
      .get(`http://localhost:3001/api/user/${decoded.id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setUser({
          email: response.data.result[0].email,
          first_name: response.data.result[0].first_name,
          last_name: response.data.result[0].last_name,
        });
      });
  };
  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p class="font-bold text-gray-700 text-xl">22</p>
              <p class="text-gray-400">Friends</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">10</p>
              <p class="text-gray-400">Photos</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">89</p>
              <p class="text-gray-400">Comments</p>
            </div>
          </div>
          <div class="relative">
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              <a href="https://tech-asst.com/">Connect</a>
            </button>
            <button
              onClick={handleLogout}
              class="text-white py-2 px-4 uppercase rounded bg-red-500 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
        <div class="mt-20 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">{`${user.first_name} ${user.last_name}`}</h1>
          <p class="text-gray-600 mt-3">{`${user.email}`}</p>
          <p class="font-light text-gray-600 mt-3">Hyderabad, India</p>

          <p class="mt-8 text-gray-500">Tech Assist - Private Limited</p>
          <p class="mt-2 text-gray-500">
            Connecting Tech With Right Oppurtunity
          </p>
        </div>
        <div class="mt-12 flex flex-col justify-center">
          <p class="text-gray-600 text-center font-light lg:px-16">
            At Tech-Asst, we are more than just a technology service provider;
            we are your partner in navigating the complex world of technology.
            Our mission is to simplify and enhance how individuals and
            businesses utilize technology, enabling them to achieve their goals
            with efficiency and ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
