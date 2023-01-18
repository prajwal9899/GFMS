import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./AddGoats.scss";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fireDB from "./../../../firebase/Firebase";

const AddGoats = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [goat, setGoat] = useState({
    breed: "",
    tagNo: "",
    gender: "Select Gender",
    weightOnPurchase: 0,
    weightOnBorn: 0,
    howGoatObtained: "",
    buyingCost: 0,
    fatherTagNo: null,
    motherTagNo: null,
    ageOnPurchase: null,
    dateOfEntryOnFarm: null,
    dateOfBirth: null,
  });
  const {
    breed,
    tagNo,
    gender,
    weightOnPurchase,
    weightOnBorn,
    howGoatObtained,
    fatherTagNo,
    motherTagNo,
    buyingCost,
    ageOnPurchase,
    dateOfEntryOnFarm,
    dateOfBirth,
  } = goat;

  useEffect(() => {
    fireDB.child("goat-test").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let tagGender = gender === "Male" ? "M" : "F";
    let newTagNo = `${breed[0]}-${tagGender}-${tagNo}`;
    // console.log(newTagNo, "newtag");

    // const isFatherTag = Object.keys(data).filter((item) => {
    //   return data[item].tagNo === fatherTagNo
    // })

    // const isFatherTag = Object.keys(data).filter((item) => {
    //   return data[item].tagNo === fatherTagNo
    // })

    

    const newGoatData = {
      breed: goat.breed,
      tagNo: newTagNo,
      gender: goat.gender,
      weightOnPurchase: goat.weightOnPurchase,
      weightOnBorn: goat.weightOnBorn,
      howGoatObtained: "",
      buyingCost: goat.buyingCost,
      fatherTagNo: goat.fatherTagNo,
      motherTagNo: goat.motherTagNo,
      ageOnPurchase: goat.ageOnPurchase,
      dateOfEntryOnFarm: goat.dateOfEntryOnFarm,
      dateOfBirth: goat.dateOfBirth,
    };

    if (howGoatObtained === "Born on farm") {
      if (
        !tagNo ||
        !breed ||
        !gender ||
        !dateOfBirth ||
        !weightOnBorn ||
        !motherTagNo ||
        !fatherTagNo
      ) {
                 toast.error("Error occured");
        setError(true);
        
      } else {
        fireDB.child("goat-test").push(newGoatData, (err: any) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Goat Added Successfully");
          }
        });
        console.log(newGoatData);

        setGoat({
          breed: "",
          tagNo: "",
          gender: "Select Gender",
          weightOnPurchase: 0,
          weightOnBorn: 0,
          howGoatObtained: "",
          buyingCost: 0,
          fatherTagNo: null,
          motherTagNo: null,
          ageOnPurchase: null,
          dateOfEntryOnFarm: null,
          dateOfBirth: null,
        });
      }
                 toast.error("Error occured");
    } else if (howGoatObtained === "Purchased") {
      if (
        !tagNo ||
        !breed ||
        !gender ||
        !dateOfEntryOnFarm ||
        !weightOnPurchase ||
        !ageOnPurchase
      ) {
        setError(true);
      } else {
        fireDB.child("goat-test").push(newGoatData, (err: any) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Goat Added Successfully");
          }
        });
        console.log(newGoatData);

        setGoat({
          breed: "",
          tagNo: "",
          gender: "Select Gender",
          weightOnPurchase: 0,
          weightOnBorn: 0,
          howGoatObtained: "",
          buyingCost: 0,
          fatherTagNo: null,
          motherTagNo: null,
          ageOnPurchase: null,
          dateOfEntryOnFarm: null,
          dateOfBirth: null,
        });
      }
    } else {
      toast.warning("Select how goat was obtained");
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setGoat({ ...goat, [name]: value });
  };

  
  return (
    <div className="md:col-span-2 md:mt-0">
      <ToastContainer />
      {/* <div className="overflow-hidden shadow sm:rounded-md"> */}
      <div className="overflow-hidden sm:rounded-md">
        {/* <div className="bg-white px-4 py-5 sm:p-6"> */}
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-8 gap-6">
            {/* How goat was obtained */}
            <div className="col-span-8 sm:col-span-8 lg:col-span-8">
              <label
                htmlFor="howGoatObtained"
                className="block text-sm font-medium text-gray-700"
              >
                Select how goat was obtained{" "}
                <span className="text-red-600">*</span>
              </label>
              <select
                id="howGoatObtained"
                name="howGoatObtained"
                onChange={handleInputChange}
                value={howGoatObtained || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Born on farm</option>
                <option>Purchased</option>
              </select>
            </div>
            {/* Breed */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
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
                value={breed || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Barbari</option>
                <option>Osmanabadi</option>
                <option>Sangamneri</option>
                <option>Konkan Kanyal</option>
                <option>Rohilkhandi</option>
              </select>
            </div>

            {/* Tag No */}
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="tagNo"
                className="block text-sm font-medium text-gray-700"
              >
                Tag No. <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="tagNo"
                id="tagNo"
                onChange={handleInputChange}
                value={tagNo || ""}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Gender */}
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Select Gender <span className="text-red-600">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                onChange={handleInputChange}
                value={gender || ""}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {/* {gender === "Select Gender" ? (
                <span
                  style={{ fontSize: "10px", marginLeft: "10px" }}
                  className="text-red-500"
                >
                  Select gender
                </span>
              ) : (
                ""
              )} */}
            </div>

            {/* Weight on purchase */}
            {howGoatObtained === "Purchased" ? (
              <>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight at purchase <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="weightOnPurchase"
                    id="weightOnPurchase"
                    placeholder="Enter in months"
                    onChange={handleInputChange}
                    value={weightOnPurchase || ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="dateOfEntryOnFarm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of entry on farm{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfEntryOnFarm"
                    id="dateOfEntryOnFarm"
                    // value={dateOfEntryOnFarm || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="ageOnPurchase"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age on purchase <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="ageOnPurchase"
                    id="ageOnPurchase"
                    onChange={handleInputChange}
                    value={ageOnPurchase || ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="weightOnBorn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight on born <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="weightOnBorn"
                    id="weightOnBorn"
                    onChange={handleInputChange}
                    value={weightOnBorn || ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="fatherTagNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Father's tag no <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="fatherTagNo"
                    id="fatherTagNo"
                    value={fatherTagNo || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="motherTagNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mother's tag no. <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="motherTagNo"
                    id="motherTagNo"
                    value={motherTagNo || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}
          </div>
          <div className="col-span-6 sm:col-span-6 lg:col-span-2 flex items-center justify-end mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoats;
