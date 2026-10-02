import React, { useState } from 'react'
import "./Contact.css"
import { data } from 'react-router-dom';

const Contact = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccess("");

        if(!name || !email || !message){
            setError("All fields are required");
            return;
        }

        const message=JSON.parse(localStorage.getItem("messages")) || [];

        message.push({
            name,email,message,data:new Date().toLocaleString(),
        });

        localStorage.setItem("messages",JSON.stringify(message));

        setError("");
        setSuccess("Thanks! Mee message pampabadindi ✅");
        setMessage("")
    }
    return (
        <div className="contact-page">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Contact Us</h2>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <textarea rows="5" placeholder='Mee message ikkada raayandi...' value={message} onChange={(e)=>setMessage(e.target.value)} />

                    <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default Contact