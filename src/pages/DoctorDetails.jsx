import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function DoctorDetails() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    async function getDoctor() {
        try {
            const response = await api.get(`/doctors/${id}`);
            setDoctor(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctor();
    }, [id]);

    if (!doctor) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="details">
            <img
                src={doctor.image}
                alt={doctor.name}
            />

            <h1>{doctor.name}</h1>

            <p>{doctor.description}</p>

            <h3>Specialization</h3>
            <p>{doctor.specialization}</p>

            {doctor.qualification && (
                <>
                    <h3>Qualification</h3>
                    <p>{doctor.qualification}</p>
                </>
            )}

            <h3>Experience</h3>
            <p>{doctor.experience} Years</p>

            {doctor.consultationFee && (
                <>
                    <h3>Consultation Fee</h3>
                    <p>₹ {doctor.consultationFee}</p>
                </>
            )}

            {doctor.phone && (
                <>
                    <h3>Phone</h3>
                    <p>{doctor.phone}</p>
                </>
            )}

            {doctor.email && (
                <>
                    <h3>Email</h3>
                    <p>{doctor.email}</p>
                </>
            )}

            <div style={{ marginTop: "25px" }}>
                <Link to="/doctors" className="btn-secondary">
                    ← Back to Doctors
                </Link>
            </div>
        </div>
    );
}

export default DoctorDetails;
