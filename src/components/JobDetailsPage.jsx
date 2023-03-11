import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

const JobDetailsPage = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  function createMarkupDescription() {
    return {__html: data?.description};
  }

  function createMarkupHowToApply() {
    return {__html: data?.how_to_apply};
  }

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
        )
      ).json();

      // set state when the data received
      setData(data);
    };

    dataFetch();
  }, []);

  console.log(data);

  return (
    <div className="w-full justify-center items-center p-5">
      <div className="flex xl:flex-row justify-between py-4">
        <Link to="/job-list">
          <button
            type="button"
            className="w-[100px] bg-transparent hover:text-blue-600 text-blue-500 p-2 mt-5 rounded-md text-base font-extrabold"
          >
            ← Back
          </button>
        </Link>
      </div>
      <div className="w-full border-2 border-gray-400 p-10 rounded-md bg-slate-100">
        <div className="grid grid-cols-1 gap-5 divide-y divide-gray-400 items-start p-5 mt-10 border-2">
          <div className="flex flex-col divide-y divide-gray-600">
            <div className="flex flex-col xl:flex-row justify-between">
                <div className="flex flex-col gap-3">
            <p className="py-2">
              {data?.type} / <span>{data?.location}</span>
            </p>
            <span>{data?.created_at}</span>
                </div>
            <p className="break-words">{data?.company_url}</p>
            </div>
            <h1 className="text-3xl font-bold py-5">{data?.title}</h1>
            <br />
            <div className="py-5 text-base font-normal break-words" dangerouslySetInnerHTML={createMarkupDescription()} />
            <br/>
            <div className="py-5 text-base font-normal break-words" dangerouslySetInnerHTML={createMarkupHowToApply()} />
            {/* <img className="w-[300px]" src={data?.company_logo} alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
