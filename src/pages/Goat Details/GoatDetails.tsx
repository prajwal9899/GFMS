import React, { useEffect, useState } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import { Link, useParams } from "react-router-dom";
import fireDB from "./../../../firebase/Firebase";
import { toast } from "react-toastify";
import { IGoatDetailsProps } from "./IGoatDetailsProps";
import { IGoatDetailsState } from "./IGoatDetailsState";
import FemaleGoat from "../../assets/FemaleGoat.png";
import MaleGoat from "../../assets/MaleGoat.png";

type goatSchema = {
  [key: string]: any;
  name: string;
};

export const GoatDetails = () => {
  const { id } = useParams();
  const [goat, setGoat] = useState<goatSchema>({
    name: "",
  });

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

  return (
    <div className="container mx-auto mt-12">
      <div className="md:col-span-2 md:mt-0">
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
