import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Table = ({ data }) => {

    const navigate = useNavigate()
    const detailJobs = () => {
        navigate(`/job-details`, {
            state: data,
          });
    }

    return (
        <React.Fragment>
            {data?.map((item) => (
            <React.Fragment key={item.id}>
            <div  className="w-fulll h-auto flex justify-between">
              <div className="text-start">
                <h2 className="mt-5 text-base font-normal mb-2">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-400">
                  {item.company}
                  <span className="text-xs font-normal text-green-500">
                    - {item.type}
                  </span>
                </p>
              </div>
              <div className="flex flex-col text-end">
                <h2 className="mt-5 text-base font-normal">{item.location}</h2>
                <p className="text-xs font-normal text-gray-400">{item.created_at}</p>
              </div>
            </div>
            <Link to={`/job-details/${item.id}`}> 
            <button className="w-[100px] mt-2 bg-blue-500 hover:bg-blue-600 p-2 text-white text-xs font-normal rounded-sm">
            Job Details
          </button>
            </Link>
            </React.Fragment>
          ))}
        </React.Fragment>
    );
}

export default Table;
