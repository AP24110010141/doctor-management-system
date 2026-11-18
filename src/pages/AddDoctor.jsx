
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddDoctor() {
    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        image: "",
        description: ""
    });

    const navigate = useNavigate();

    function handleChange(e) {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await api.post("/doctors", doctor);

        navigate("/doctors");
    }

    return (
        <div className="form-container">
            <h1>Add Doctor</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Doctor Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
}

export default AddDoctor;
