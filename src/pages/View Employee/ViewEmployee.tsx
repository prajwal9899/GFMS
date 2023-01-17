import React, { useEffect, useState } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import "./ViewEmployee.scss";
import { useParams } from "react-router-dom";
import fireDB from "../../../firebase/Firebase";
import { toast } from "react-toastify";
import { IViewEmployeeProps } from "./IViewEmployeeProps";
import { IViewEmployeeState } from "./IViewEmployeeState";

export class ViewEmployee extends React.Component<
  IViewEmployeeProps,
  IViewEmployeeState
> {
  constructor(props: IViewEmployeeProps) {
    super(props);
    this.state = {
      EmployeeData: {},
    };
  }

  // componentDidMount(): void {
  //   fireDB.child("goat-test").on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       this.setState({ goatsData: { ...snapshot.val() } });
  //     } else {
  //       this.setState({});
  //     }
  //   });
  // }

  public handleDelete(id: any) {
    if (window.confirm("Confirm Delete ?")) {
      fireDB.child(`contact/${id}`).remove((err) => {
        if (err) {
          // toast.error(err);
        } else {
          toast.success("User deleted Successfully");
        }
      });
    }
  }

  render() {
    return (
      <div className="" style={{ marginTop: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })} */}
          </tbody>
        </table>
      </div>
    );
  }
}
