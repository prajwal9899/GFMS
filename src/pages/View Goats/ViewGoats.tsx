import React, { useEffect, useState } from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import "./ViewGoats.scss";
import { Link, useParams } from "react-router-dom";
import fireDB from "./../../../firebase/Firebase";
import { toast } from "react-toastify";
import { IViewGoatsProps } from "./IViewGoatsProps";
import { IViewGoatsState } from "./IViewGoatsState";
import FemaleGoat from "../../assets/FemaleGoat.png";
import MaleGoat from "../../assets/MaleGoat.png";

export class ViewGoats extends React.Component<
  IViewGoatsProps,
  IViewGoatsState
> {
  constructor(props: IViewGoatsProps) {
    super(props);
    this.state = {
      goatsData: {},
    };
  }

  componentDidMount(): void {
    fireDB.child("goat-test").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ goatsData: { ...snapshot.val() } });
      } else {
        this.setState({});
      }
    });
  }

  render() {
    return (
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {Object.keys(this.state.goatsData).map((id, index) => {
            return (
              <Link key={index} to={`/goat-details/${id}`}>
                <div
              
                  // className="w-full px-4 py-5 bg-white rounded-lg shadow flex"
                  className="w-full px-3 py-3 bg-white rounded-lg shadow flex cursor-pointer"
                >
                  <div>
                    <img
                      style={{ width: "100px", height: "80px" }}
                      src={
                        this.state.goatsData[id].gender === "Male"
                          ? MaleGoat
                          : FemaleGoat
                      }
                      alt=""
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-500 truncate w-100 px-3 py-2 flex justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-500 truncate">
                        Tag No.
                      </div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">
                        {this.state.goatsData[id].tagNo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 truncate">
                        Gender
                      </div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">
                        {this.state.goatsData[id].gender}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
