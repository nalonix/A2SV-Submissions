import React from "react";
import { useForm } from "../hooks/useForm";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const validate = (values: any) => {
    const errors: Record<string, string> = {};

    if (!values.name?.trim()) errors.name = "Name is required";

    if (!values.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.message?.trim()) errors.message = "Message is required";

    return errors;
  };

  const { values, errors, submitted, handleChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      message: "",
    },
    validate
  );

  return (
    <div className="form-container">
      <h2>Contact Us</h2>

      {submitted && <p className="success">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Message */}
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
