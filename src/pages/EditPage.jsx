import React, { useState } from "react";
import avatar from "../assets/avatar.png"
import { useParams, useNavigate } from 'react-router-dom';
import { updateContact } from '../redux/contactReducer';
import { useDispatch, useSelector } from 'react-redux';

function EditPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const { contacts } = useSelector(state => state.contactReducer);

    // Find the contact with the given ID
    const contact = contacts.find(contact => contact.id === parseInt(id));

    // State to store updated contact details
    const [updatedContact, setUpdatedContact] = useState(contact || {
        fullName: "",
        Email: "",
        Contact: "",
        Message: "",
        Avatar: ""
    });

    // Update contact handler
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateContact(updatedContact));
        navigate("/contact");
    }

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Handle changes in image field
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (reader.readyState === 2) {
                setUpdatedContact(prevState => ({
                    ...prevState,
                    Avatar: reader.result
                }));
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="container">
            <form className="row g-3 py-5 w-50" onSubmit={handleUpdate}>
                <div className="col-md-12">
                    <label htmlFor="inputFullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        value={updatedContact.fullName}
                        id="inputFullName"
                        name="fullName"
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        onChange={handleChange}
                        className="form-control"
                        value={updatedContact.Email}
                        id="inputEmail4"
                        name="Email"
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="inputC" className="form-label">
                        Contact
                    </label>
                    <input
                        type="tel"
                        onChange={handleChange}
                        className="form-control"
                        value={updatedContact.Contact}
                        id="inputContact"
                        name="Contact"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Message
                    </label>
                    <textarea
                        className="form-control"
                        onChange={handleChange}
                        id="exampleFormControlTextarea1"
                        value={updatedContact.Message}
                        rows="3"
                        name="Message"
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <label htmlFor="Avatar" className="form-label">
                        Attachment
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                        id="Avatar"
                        name="Avatar"
                    />
                </div>

                <div className="col-md-6">
                    <img style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src={updatedContact.Avatar || avatar} alt="" />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form>

        </div>
    );
}

export default EditPage;
