import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditDoctor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        experience: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        api.get(`/doctors/${id}`).then(response => {
            setDoctor(response.data);
        }).catch(err => {
            console.error("Failed to fetch doctor:", err);
        });
    }, [id]);

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
        await api.put(`/doctors/${id}`, doctorToSave);
        navigate("/doctors");
    }

    return (
        <div className="form-container">
            <h1>Edit Doctor</h1>

            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Doctor Name</label>
                <input name="name" value={doctor.name || ""} onChange={handleChange} required />

                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Specialization</label>
                <input name="specialization" value={doctor.specialization || ""} onChange={handleChange} required />

                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Years of Experience</label>
                <input type="number" name="experience" value={doctor.experience ?? ""} onChange={handleChange} min="0" required />

                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Image URL</label>
                <input name="image" value={doctor.image || ""} onChange={handleChange} />

                <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Description</label>
                <textarea name="description" value={doctor.description || ""} onChange={handleChange} required />

                <button type="submit">Update Doctor</button>
            </form>
        </div>
    );
}

export default EditDoctor;
