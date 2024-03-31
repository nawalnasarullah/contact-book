import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToContact } from "../redux/contactReducer";
import { deleteFromContact } from "../redux/contactReducer";
import avatar from "../assets/avatar.png";
import { Bounce } from "react-toastify";

function Contact() {

  const notifyContactAdded = () =>
    toast("Your Contact has been saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    const notifyContactDeleted = () =>
    toast("Your contact has been deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const dispatch = useDispatch();
  const { contactReducer } = useSelector((state) => state);
  const [preview, setPreview] = useState(undefined)

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: {
      fullName: "",
      Email: "",
      Contact: "",
      Message: "",
      Avatar: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(4, "At least provide four digits")
        .max(20, "Not valid it should contain max 20 digits")
        .trim()
        .required("Please enter valid name."),
      Email: Yup.string()
        .required("Please enter email address.")
        .trim()
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address"
        ),
      Contact: Yup.string()
        .matches(
          /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
          "Please enter valid contact number.(+92-xxx-xxxxxxx)"
        )
        .trim()
        .required("Please enter your contact number."),
      Avatar: Yup.string()
    }),
    onSubmit: (vals, { resetForm }) => {
      console.log(vals);

      let newContact = {
        ...vals,
        id: Date.now(),
      };

      dispatch(addToContact(newContact));
      resetForm();
      notifyContactAdded();
    },
  });

  const handleDelete = (id) => {
    dispatch(deleteFromContact(id));
    notifyContactDeleted();
  };


  const handleImageChange = (e)=>{
    const reader = new FileReader();
    reader.onload = (event)=>{
      if(reader.readyState==2){
        setPreview(reader.result);
        setFieldValue("Avatar", reader.result);
      }
    }

    reader.readAsDataURL(e.target.files[0]);

  }


  return (
    <div className="container">
      
      <form className="row g-3 py-5 w-50" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputFullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            className="form-control"
            id="inputFullName"
            name="fullName"
          />
          <p className="text-danger">
            <small>
              {touched.fullName && errors.fullName ? errors.fullName : null}
            </small>
          </p>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Email}
            className="form-control"
            id="inputEmail4"
            name="Email"
          />
          <p className="text-danger">
            <small>{touched.Email && errors.Email ? errors.Email : null}</small>
          </p>
        </div>

        <div className="col-md-12">
          <label htmlFor="inputContact" className="form-label">
            Contact
          </label>
          <input
            type="tel"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Contact}
            className="form-control"
            id="inputContact"
            name="Contact"
          />
          <p className="text-danger">
            <small>
              {touched.Contact && errors.Contact ? errors.Contact : null}
            </small>
          </p>
        </div>
    
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Message}
            id="exampleFormControlTextarea1"
            rows="3"
            name="Message"
          ></textarea>
        </div>

        <div className="col-md-6">
          <label htmlFor="Avatar" className="form-label">
            Attatchment
          </label>
          <input
            type="file"
            onChange={(e)=>handleImageChange(e)}
            className="form-control"
            id="Avatar"
            name="Avatar"
          />
        </div>

        <div className="col-md-6">
          <img style={{width: "100px", height: "100px", borderRadius:"50%", objectFit: "cover"}} src={preview ? preview : avatar} alt="" />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-dark">
            Add to Contacts
          </button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Message</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {contactReducer.contacts.length > 0 ? (
            contactReducer.contacts.map((val, index) => {
              return (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td><img style={{width: "30px", height: "30px", borderRadius:"50%", objectFit: "cover"}} src={val.Avatar ? val.Avatar : avatar} alt="" /></td>
                  <td>{val.fullName}</td>
                  <td>{val.Email}</td>
                  <td>{val.Contact}</td>
                  <td>{val.Message}</td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(val.id)}
                    >
                      <i className="bi-trash"></i>
                    </button>
                    <Link
                      to={`/edit/${val.id}`}
                      className="btn btn-warning me-2"
                    >
                      <i className="bi-pencil-square"></i>
                    </Link>
                    <a href={`tel:${val.Contact}`} className="btn btn-success">
                      <i className="bi-telephone-forward"></i>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Contact;
