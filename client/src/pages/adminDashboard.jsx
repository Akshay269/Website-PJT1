import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import {
  auth_admin,
  get_forms,
  get_admin_det_by_id,
  action_by_admin,
} from "../controllers/admin";
import "../styles/index.css";
import Footer from "../components/Footer";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  let [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [forms, setForms] = useState([]);
  let [action, setAction] = useState("");
  let [accepted, setAccepted] = useState(false);
  let [rejected, setRejected] = useState(false);
  let [awaiting, setAwaiting] = useState(true);

  const handleAction = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    let formid = e.target.name;

    let newAction = e.target.value;

    let obj = {
      id: formid,
      action: newAction,
    };

    // console.log(obj);

    action_by_admin(obj).then((data) => {
      console.log(data);
      // window.location.reload();
    });

    // console.log(e.target.value);
  };
  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      let obj = {
        token: localStorage.getItem("admin_token"),
      };
      auth_admin(obj).then((data) => {
        if (data.tag) {
          setIsAdminLoggedIn(true);
          let obj = {
            id: JSON.parse(
              atob(localStorage.getItem("admin_token").split(".")[1])
            ).id,
          };
          get_admin_det_by_id(obj).then((data) => {
            setName(data.message.admin_name);
            setEmail(data.message.admin_email);
          });
          get_forms(obj).then((data) => {
            console.log(data);
            setForms(data);
          });
          // action_by_admin(obj).then((data) => {
          //   setAction(data);
          // });
        } else {
          setIsAdminLoggedIn(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashbg p-16">
        <div className="userdetails bg-[#e6e6e6] rounded-lg shadow-2xl p-16 ml-10 mr-10 mt-20">
          <h1 className="text-4xl m-2 p-2 text-black">
            Name: <span className="font-bold capitalize">{name}</span>{" "}
          </h1>
          <h1 className="text-4xl m-2 p-2 text-black">
            Email: <span className="font-bold">{email}</span>{" "}
          </h1>
        </div>

        {isAdminLoggedIn ? (
          <div className="responses-section">
            <div className="text-5xl font-semibold m-10 text-white">Forms</div>
            <div className="flex justify-center p-3 gap-5">
              <button
                onClick={() => {
                  setAccepted(true);
                  setRejected(false);
                  setAwaiting(false);
                }}
                className="accept-btn rounded p-2 bg-green-800 text-white"
              >
                Accepted Forms
              </button>
              <button
                onClick={() => {
                  // window.location.reload();
                  setAccepted(false);
                  setRejected(true);
                  setAwaiting(false);
                }}
                className="reject-btn rounded p-2 bg-red-800 text-white"
              >
                Rejected Forms
              </button>
              <button
                onClick={() => {
                  // window.location.reload();
                  setAccepted(false);
                  setRejected(false);
                  setAwaiting(true);
                }}
                className="await-btn rounded p-2 dashcard text-white"
              >
                Awaiting Response Forms
              </button>
            </div>

            {accepted &&
              forms
                .filter((form) => form.status === "Accepted")
                .map((temp) => (
                  <div className="rounded flex flex-row">
                    <div className="dashcard p-10 accept mt-5 mb-5 w-full rounded-lg text-white flex flex-row justify-between">
                      <div className="data-container flex flex-col w-1/2">
                        <div className="form-title text-3xl text-red font-bold">
                          {temp.form_title}
                        </div>
                        <div className="form-desc text-2xl text-red mt-2 mb-2 text-wrap w-1/2">
                          {temp.form_desc}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Budget: USD {temp.form_budget}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Name: {temp.form_user_name}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Contact: {temp.form_user_contact}
                        </div>
                      </div>
                      <div className="data-container-button flex flex-row items-center flex-end">
                        <button
                          name={temp._id}
                          value={"accept"}
                          className="accept m-2 p-2 edit-dash h-12 rounded-lg"
                          onClick={handleAction}
                        >
                          Accept
                        </button>
                        <button
                          name={temp._id}
                          value={"deny"}
                          className="deny m-2 p-2 h-12 delete-dash rounded-lg"
                          onClick={handleAction}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

            {rejected &&
              forms
                .filter((form) => form.status === "Rejected")
                .map((temp) => (
                  <div className="rounded flex flex-row">
                    <div className="dashcard p-10 deny mt-5 mb-5 w-full rounded-lg text-white flex flex-row justify-between">
                      <div className="data-container flex flex-col w-1/2">
                        <div className="form-title text-3xl text-red font-bold">
                          {temp.form_title}
                        </div>
                        <div className="form-desc text-2xl text-red mt-2 mb-2 text-wrap w-1/2">
                          {temp.form_desc}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Budget: USD {temp.form_budget}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Name: {temp.form_user_name}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Contact: {temp.form_user_contact}
                        </div>
                      </div>
                      <div className="data-container-button flex flex-row items-center flex-end">
                        <button
                          name={temp._id}
                          value={"accept"}
                          className="accept m-2 p-2 edit-dash h-12 rounded-lg"
                          onClick={handleAction}
                        >
                          Accept
                        </button>
                        <button
                          name={temp._id}
                          value={"deny"}
                          className="deny m-2 p-2 h-12 delete-dash rounded-lg"
                          onClick={handleAction}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

            {awaiting &&
              forms
                .filter((form) => form.status === "Pending")
                .map((temp) => (
                  <div className="rounded flex flex-row">
                    <div className="dashcard p-10  mt-5 mb-5 w-full rounded-lg text-white flex flex-row justify-between">
                      <div className="data-container flex flex-col w-1/2">
                        <div className="form-title text-3xl text-red font-bold">
                          {temp.form_title}
                        </div>
                        <div className="form-desc text-2xl text-red mt-2 mb-2 text-wrap w-1/2">
                          {temp.form_desc}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Budget: USD {temp.form_budget}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Name: {temp.form_user_name}
                        </div>
                        <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                          Client Contact: {temp.form_user_contact}
                        </div>
                      </div>
                      <div className="data-container-button flex flex-row items-center flex-end">
                        <button
                          name={temp._id}
                          value={"accept"}
                          className="accept m-2 p-2 edit-dash h-12 rounded-lg"
                          onClick={handleAction}
                        >
                          Accept
                        </button>
                        <button
                          name={temp._id}
                          value={"deny"}
                          className="deny m-2 p-2 h-12 delete-dash rounded-lg"
                          onClick={handleAction}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <>You are not logged in</>
        )}
      </div>
      <Footer />
    </>
  );
}
