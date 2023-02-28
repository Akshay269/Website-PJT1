import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import logo from "../assets/logo.jpeg"

import {
  auth_user,
  get_forms,
  get_user_det_by_id,
  delete_form,
  submit_form,
  get_forms_by_formid,
  edit_form,
} from "../controllers/user";
import "../styles/index.css";

export default function DashboardUser() {
  const navigate = useNavigate();
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [forms, setForms] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [isEditable, setIsEditable] = useState(false);
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [budget, setBudget] = useState("");
  let [formid, setFormId] = useState("");
  let [isPaying, setIsPaying] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [form_budget_pay, setForm_budget_pay] = useState();
  const [popup, setIsPopup] = useState(false);

  const handlePay = async(e) => {
    e.preventDefault();
    let formid = e.target.value;
    // console.log(formid);

    let obj = {id: formid}

    get_forms_by_formid(obj).then((data) => {
      setForm_budget_pay(data.message[0].form_budget);
    })

    setIsPaying(true);

  }

  const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: form_budget_pay,
                },
            },
        ],
    }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
};

const onApprove = (data, actions) => {
  return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
  });
};

//capture likely error
const onError = (data, actions) => {
  setErrorMessage("An Error occured with your payment ");
};

  const handleChange = async (e) => {
    e.preventDefault();

    let obj = {
      formid: formid,
      form_title: title,
      form_desc: desc,
      form_budget: budget,
    };

    edit_form(obj).then((data) => {
      console.log(data);
      window.location.reload();
    });
  };


  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let obj = {
        token: localStorage.getItem("user_token"),
      };
      auth_user(obj).then((data) => {
        if (data.tag) {
          setIsUserLoggedIn(true);
          let obj = {
            id: JSON.parse(
              atob(localStorage.getItem("user_token").split(".")[1])
            ).id,
          };
          get_user_det_by_id(obj).then((data) => {
            setName(data.message.user_name);
            setEmail(data.message.user_email);
          });
          get_forms(obj).then((data) => {
            setForms(data.message);
          });
        } else {
          setIsUserLoggedIn(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar />

      <PayPalScriptProvider options={{ "client-id": 'AZjE_nJBZmhF4ydNErXnjnWrOScZ6LEj4jxvRLJiQxtyNZRerDQ6XL0NxYuCb1Vjta99AO623GyVyx1y' }}>
      <div className="dashbg p-16 flex flex-col items-center">
        {/* <img className="imgabout" src={about1} /> */}
        <div className="userdetails bg-[#e6e6e6] w-3/5 rounded-lg shadow-2xl p-16 mt-20 flex justify-between items-center">
          <div>
            <h1 className="text-2xl m-2 p-2 text-black">Name: {name} </h1>
            <h1 className="text-2xl m-2 p-2 text-black">Email: {email} </h1>
          </div>
          <div className="serveButton">
            <button
              className="p-4 rounded-lg"
              onClick={() => navigate("/requestservice")}
            >
              Request A Service
            </button>
          </div>
        </div>


        {isUserLoggedIn ? (
          /* <div className="responses-section">
            <div className="text-5xl font-semibold m-10 text-white">
              My Forms
            </div>

            {forms ? (
              forms.map((form) => (
                <div className="rounded flex flex-row">
                  <div className="dashcard p-10  mt-5 mb-5 w-full rounded-lg text-white flex flex-row">
                    <div className="data-container flex flex-col">
                      <div className="form-title text-3xl text-red font-bold">
                        {form.form_title}
                      </div>
                      <div className="form-desc text-2xl text-red mt-2 mb-2 text-wrap w-1/2">
                        {form.form_desc}
                      </div>
                      <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                        Budget: ${form.form_budget}
                      </div>
                    </div>
                    <div className="data-container-button flex flex-row ">
                      <button className="m-2 p-2 edit-dash rounded-lg">
                        Edit
                      </button>
                      <button className="m-2 p-2 delete-dash rounded-lg">
                        Delete
                      </button>
                    </div>
                  </div>
                </div> */
          <div className="responses-section w-3/4">
            <div className="text-5xl font-semibold m-10 text-white">
              My Forms
            </div>

            
               

            {isPaying && (
                        <>
                         <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex drop-shadow-2xl backdrop-blur-[2px]">
            <div className="relative p-8 bg-white w-full max-w-xl m-auto flex-col flex rounded-lg">
              <div className="flex items-center justify-between">
                </div>
                <h1 className="text-center">Amount to be paid: {form_budget_pay}</h1>
                {show ? (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}
                <div className="flex flex-col justify-center items-center p-2 gap-3">

                <button onClick={() => {setShow(true)}} className="text-white bg-[#000cc9] rounded-lg w-32">Checkout</button>
                <button onClick={() => {setShow(false); setIsPaying(false)}} className="text-white bg-[#000cc9] rounded-lg w-32">Back</button>
                </div>
            </div>
          </div>
                        </>

                      )}

            {forms ? (
              forms.map((form) => (
                <div className="rounded flex md:flex-row sm:flex-col">
                  <div
                    className={`dashcard p-10 ${form.action} mt-5 mb-5 w-full rounded-lg text-white flex flex-row justify-between`}
                  >
                    <div className="data-container flex flex-col w-1/3">
                      <div className="form-title text-3xl text-red font-bold">
                        {form.form_title}
                      </div>
                      <div className="form-desc text-2xl mt-2 mb-2 text-wrap">
                        {form.form_desc}
                      </div>
                      <div className="form-desc text-2xl text-red text-wrap w-1/2 font-semibold">
                        Budget: USD {form.form_budget}
                      </div>
                    </div>
                    <div className="form-title text-2xl items-center flex">
                      Status: {form.status ? form.status : "Pending"}
                    </div>
                    <div className="data-container-button flex flex-row items-center">
                      <button
                      value={form._id}
                        className="m-2 p-2 edit-dash h-12 rounded-lg"
                        onClick={handlePay}
                      >
                        Pay
                      </button>
                      
                      
                      <button
                        onClick={() => {
                          setIsEditable(true);
                          setFormId({ _id: form._id });
                        }}
                        className="m-2 p-2 edit-dash h-12 rounded-lg"
                      >
                        Edit
                      </button>
                      {isEditable && (
                        <>
                          <div>
                            <div class="signup text-black">
                              <form method="POST">
                                <input
                                  className="input"
                                  type="text"
                                  name="txt"
                                  placeholder="Title"
                                  required=""
                                  value={title}
                                  onChange={(e) => {
                                    setTitle(e.target.value);
                                  }}
                                />
                                <input
                                  className="input"
                                  type="text"
                                  name="Description"
                                  placeholder="Description"
                                  required=""
                                  value={desc}
                                  onChange={(e) => {
                                    setDesc(e.target.value);
                                  }}
                                />
                                <input
                                  className="input"
                                  type="number"
                                  name="budget"
                                  placeholder="Budget"
                                  required=""
                                  value={budget}
                                  onChange={(e) => {
                                    setBudget(e.target.value);
                                  }}
                                />
                                <button
                                  className="signup-btn"
                                  value="Register"
                                  onClick={handleChange}
                                >
                                  Submit
                                </button>
                                <button
                                  className="signup-btn"
                                  value="Register"
                                  onClick={() => setIsEditable(false)}
                                >
                                  Close
                                </button>
                              </form>
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        onClick={() => {
                          let obj = { _id: form._id };
                          delete_form(obj).then((data) => {
                            alert(data.message);
                            window.location.reload();
                          });
                        }}
                        className="m-2 p-2 h-12 delete-dash rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-white text-center text-5xl w-full font-bold">
                  <h1>No Forms available</h1>
                </div>
              </>
            )}
          </div>
        ) : (
          <>You are not logged in</>
        )}
      </div>
      </PayPalScriptProvider>
     
      <Footer />
    </>
  );
}
