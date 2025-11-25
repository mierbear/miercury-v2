"use client";

import RequestInfo from "../../types/requestInfo";
import Image from "next/image";


function RequestList({ info }: { info: RequestInfo[] }) {
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-blue-400">
      {info.map((item) => (
        <div key={item.id} className="flex flex-col justify-center items-center">
          <img src={item.image_url} alt={item.notes} className="max-h-[50vh]"/>
          <h1>{item.notes}</h1>
        </div>
      ))}
    </div>
  );
}


export default RequestList;