import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddDoctor() {
    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        experience: "",
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

        const doctorToSave = {
            ...doctor,
            experience: Number(doctor.experience) || 0
        };

        await api.post("/doctors", doctorToSave);
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
                    value={doctor.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization (e.g. Cardiologist, Dermatologist)"
                    value={doctor.specialization}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={doctor.experience}
                    onChange={handleChange}
                    min="0"
                    required
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (e.g. /images/doctor1.jpeg)"
                    value={doctor.image}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Doctor Description"
                    value={doctor.description}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
}

export default AddDoctor;
