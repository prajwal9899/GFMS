import React, { useState, useEffect } from "react";
import fireDB from "../../../firebase/Firebase";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import './AddEmployee.scss'

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEmployee = () => {
  const [user, setUser] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = user;
  const { id } = useParams();

  useEffect(() => {
    fireDB.child("contact").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  //   useEffect(() => {
  //     if (id) {
  //       setUser({ ...data[id] });
  //     } else {
  //       setUser({ ...initialState });
  //     }

  //     return () => {
  //       setUser({ ...initialState });
  //     };
  //   }, [id, data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("All Fields are required !");
    } else {
      if (!id) {
        fireDB.child("contact").push(user, (err: any) => {
          if (err) {
            // toast.error(err : any);
          } else {
            toast.success("User Added Successfully");
          }
        });
      } else {
        fireDB.child(`contact/${id}`).set(user, (err) => {
          if (err) {
            toast.error("Error Occured");
          } else {
            toast.success("User Updated Successfully");
          }
        });
      }

      setTimeout(() => {
        // location.replace('/')
      }, 500);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="" style={{ marginTop: "100px" }}>
      <form
        action=""
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Your Contact"
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEmployee;
