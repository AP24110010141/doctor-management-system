
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditDoctor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        api.get(`/doctors/${id}`).then(response => {
            setDoctor(response.data);
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
        await api.put(`/doctors/${id}`, doctor);
        navigate("/doctors");
    }

    return (
        <div className="form-container">
            <h1>Edit Doctor</h1>

            <form onSubmit={handleSubmit}>
                <input name="name" value={doctor.name || ""} onChange={handleChange} />
                <input name="specialization" value={doctor.specialization || ""} onChange={handleChange} />
                <input name="image" value={doctor.image || ""} onChange={handleChange} />
                <textarea name="description" value={doctor.description || ""} onChange={handleChange} />
                <button type="submit">Update Doctor</button>
            </form>
        </div>
    );
}

export default EditDoctor;
