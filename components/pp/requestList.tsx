"use client";

import RequestInfo from "../../types/requestInfo";
import Image from "next/image";


function RequestList({ info }: { info: RequestInfo[] }) {
  return (
    <div>
      {info.map((item) => (
        <div key={item.id} className="flex flex-col justify-center items-center">
          <img src={item.image_url} alt={item.notes} className="min-h-50vh"/>
          <p>{item.notes}</p>
        </div>
      ))}
    </div>
  );
}


export default RequestList;