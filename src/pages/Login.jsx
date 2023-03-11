import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/login', {
      username: username,
      password: password
      })
      navigate("/job-list");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  

  return (
    <div className="xl:w-[500px] justify-center items-center mx-auto p-5 md:p-16 xl:p-20 ">
      <form className="w-full p-5 gap-5 bg-slate-300 rounded-md" onSubmit={Auth}>
       
        <div className="flex flex-col gap-5">
          <label htmlFor="" className="text-base font-semibold">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" username" className="w-full p-2 rounded-md outline-none"/>
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="" className="text-base font-semibold mt-3">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" username" className="w-full p-2 rounded-md outline-none"/>
        <p className="text-base text-red-600 font-semibold">{msg}</p>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-5 rounded-md">SigIn</button>
      </form>
    </div>
  );
};

export default Login;
