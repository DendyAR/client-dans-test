import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_docoded from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import Pagination from "./Pagination";
import { paginate } from "../helper/Paginate";

const JobLsitPage = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState();
  const [query , setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
        )
      ).json();

      // set state when the data received
      setData(data);
      setLoading(true);
    };

    dataFetch();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/token");
      setToken(response.data.accessToken);
      const decoded = jwt_docoded(response.data.accessToken);
      console.log(decoded);
      setUsername(decoded.username);
      setExpired(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const Logout =  async() => {
    try {
      await axios.delete('http://localhost:8080/logout');
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const search = (searchData) => {
    return searchData?.filter((item) => 
    item.description.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query)
    )
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  const paginatedJobs = paginate(search(data), currentPage, pageSize);
 
  // const axiosJWT = axios.create();

  // axios.interceptors.request.use(async(config) => {
  //   const currentDate  = new Date();
  //   if(expired * 1000 < currentDate.getTime()){
  //     const response = await axios.get('http://localhost:8080/token');
  //     config.headers.Authorization = `Bearer ${response.data.accessToken}`
  //     setToken(response.data.accessToken);
  //     const decoded = jwt_docoded(response.data.accessToken);
  //     console.log(decoded)
  //     setUsername(decoded.username);
  //     setExpired(decoded.exp);
  //   }
  //   return config;
  // }, (error) => {
  //   return Promise.reject(error)
  // })

  //   const getJobs = async () => {

  // };

  console.log(data?.filter(job => job.description.toLowerCase().includes("fe")));

  return (
    <div className="w-full justify-center items-center p-5">
      <div className="flex flex-row justify-between py-4">
        <p className="text-base text-gray-500 font-medium p-2">
          Online :{username}
          <span className="text-5xl text-green-500">.</span>
        </p>
        <button
          type="submit"
          onClick={Logout}
          className="w-[100px] bg-blue-500 hover:bg-blue-600 text-white p-2 mt-5 rounded-md"
        >
          LogOut
        </button>
      </div>
      <div className="w-full border-2 border-gray-400 p-10 rounded-md bg-slate-100">
        <form className="flex flex-col xl:flex-row justify-between items-center">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="text-base font-semibold">
              Job Description
            </label>
            <input
              type="text"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              className="w-full xl:w-[300px] border-2 border-gray-400 rounded-sm inset-2 text-gray-900 p-1 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="text-base font-semibold">
              Location
            </label>
            <input
              type="input"
              placeholder="locations..."
              onChange={e => setQuery(e.target.value)}
              className="w-full xl:w-[300px] border-2 border-gray-400 rounded-sm inset-2 text-gray-900 p-1 outline-none"
            />
          </div>
          <div className="flex gap-2 mt-5 text-base font-semibold">
            <input type="checkbox" name="" id="" className=" border-2" />
            <label htmlFor="">Full Time Only</label>
          </div>

          <div className="w-[110px] hover:bg-slate-500 bg-slate-600 border-2 p-1 text-center rounded-md mt-5">
            <button className="text-sm font-medium w-full text-white">
              Search
            </button>
          </div>
        </form>
        {/* job list */}

        <div className="grid grid-cols-1 gap-5 divide-y divide-gray-400 items-start p-5 mt-10 border-2">
          <div className="text-3xl font-semibold">
            <h1>Job List</h1>
          </div>
          <Table data={paginatedJobs}/>
    
        </div>
        <div className="flex justify-center items-center mt-10">
          <Pagination
            items={data?.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
        <div className="w-full mt-10">
          <button className="w-full bg-blue-500 rounded-sm text-base font-medium p-2 text-white hover:bg-blue-600">
            More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobLsitPage;
