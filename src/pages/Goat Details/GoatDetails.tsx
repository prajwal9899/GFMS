import React, { useEffect, useState } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import { Link, useParams } from "react-router-dom";
import fireDB from "./../../../firebase/Firebase";
import { toast } from "react-toastify";
import { IGoatDetailsProps } from "./IGoatDetailsProps";
import { IGoatDetailsState } from "./IGoatDetailsState";
import FemaleGoat from "../../assets/FemaleGoat.png";
import MaleGoat from "../../assets/MaleGoat.png";
import { Checkbox, Form } from "antd";

type goatSchema = {
  [key: string]: any;
  name: string;
};

export const GoatDetails = () => {
  const { id } = useParams();
  const [goat, setGoat] = useState<goatSchema>({
    name: "",
  });
  const [goatStatus, setGoatStatus] = useState("Select Status");

  useEffect(() => {
    fireDB
      .child(`goat-test/${id}`)
      .get()
      .then((snapshot) => {
   
        
        if (snapshot.exists()) {
          setGoat({ ...snapshot.val() });
        } else {
          toast.error("User Does not exists");
        }
      });
  }, [id]);

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <div className="container mx-auto mt-12">
      <div className="md:col-span-2 md:mt-0">
        {/* Select status */}
        {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="breed"
            className="block text-sm font-medium text-gray-700"
          >
            Select Breed <span className="text-red-600">*</span>
          </label>
          <select
            id="breed"
            name="breed"
            onChange={handleInputChange}
            value={goatStatus || ""}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option disabled value="">
              Select Status
            </option>
            <option>Live</option>
            <option>Sold</option>
            <option>Dead</option>
          </select>
        </div> */}

        {/* Ready to sell */}
        {/* <div>
          <div style={{ display: "flex" }}>
            <p style={{ color: "red" }}>READY TO SELL</p>
            <input type="checkbox" name="" id="" />
          </div>
          <div style={{ display: "flex" }}>
            <input type="number" placeholder="Current Weight (Kg)*" />
            <input type="number" placeholder="Selling Price (Rs)*" />
          </div>
        </div> */}

        {/* Sold  */}
        {/* <div>
          <div>
            <p>SOLD RECORD</p>
          </div>
          <div style={{ display: "flex" }}>
            <input type="date" name="" id="" />
            <input type="number" placeholder="Selling Price (Rs)*" />
          </div>
        </div> */}

        {/* Dead */}
        {/* <div>
          <div>
            <input type="date" name="" id="" />
          </div>
          <div>
            <input type="text" placeholder="Reason" />
          </div>
        </div> */}

        <div className="overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            {/* Breed */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Breed :</h1>
              <p className="mx-3">{goat.breed}</p>
            </div>
            {/* Tag No */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Tag No :</h1>
              <p className="mx-3">{goat.tagNo}</p>
            </div>
            {/* Gender */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Gender :</h1>
              <p className="mx-3">{goat.gender}</p>
            </div>
            {/* Date of birth */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Date of birth :</h1>
              <p className="mx-3">{goat.dateOfBirth}</p>
            </div>
            {/* Weight */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Weight :</h1>
              <p className="mx-3">{goat.weight} Kg</p>
            </div>

            {/* Fathers Tag No. */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Father's tag no :</h1>
              <Link to={`/goat-details/${goat.fatherTagNo}`}>
                <p className="mx-3">{goat.fatherTagNo}</p>
              </Link>
            </div>
            {/* Mothers Tag No. */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex">
              <h1 className="text-lg">Mothers's tag no :</h1>
              <p className="mx-3">{goat.motherTagNo}</p>
            </div>
          </div>

          {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2 flex items-center justify-end mt-4">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div> */}
        </div>
      </div>
    </div>
  );
};
