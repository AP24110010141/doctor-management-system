import { useEffect, useState } from "react";
import api from "../services/api";
import DoctorCard from "../components/DoctorCard";
import { Link } from "react-router-dom";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [specialization, setSpecialization] = useState("All");
    const [fee, setFee] = useState("All");
    const [sort, setSort] = useState("");

    async function getDoctors() {
        try {
            const response = await api.get("/doctors");
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctors();
    }, []);

    async function deleteDoctor(id) {
        try {
            await api.delete(`/doctors/${id}`);
            setDoctors(doctors.filter((doctor) => doctor.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    // Check if consultationFee field exists in the data
    const hasConsultationFee = doctors.some(
        (doc) => doc.consultationFee !== undefined && doc.consultationFee !== null
    );

    // Extract unique specializations for filter dropdown
    const specializations = [
        "All",
        ...Array.from(new Set(doctors.map((d) => d.specialization).filter(Boolean))),
    ];

    // Filter logic
    const filteredDoctors = doctors.filter((doctor) => {
        const searchMatch = doctor.name
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const specializationMatch =
            specialization === "All" || doctor.specialization === specialization;

        let feeMatch = true;
        if (hasConsultationFee && fee !== "All") {
            const numFee = Number(doctor.consultationFee) || 0;
            if (fee === "Low") feeMatch = numFee < 500;
            else if (fee === "Medium") feeMatch = numFee >= 500 && numFee <= 1000;
            else if (fee === "High") feeMatch = numFee > 1000;
        }

        return searchMatch && specializationMatch && feeMatch;
    });

    // Sort logic (by experience or rating)
    let finalDoctors = [...filteredDoctors];
    if (sort === "high") {
        finalDoctors.sort(
            (a, b) =>
                (Number(b.experience ?? b.rating) || 0) -
                (Number(a.experience ?? a.rating) || 0)
        );
    } else if (sort === "low") {
        finalDoctors.sort(
            (a, b) =>
                (Number(a.experience ?? a.rating) || 0) -
                (Number(b.experience ?? b.rating) || 0)
        );
    }

    return (
        <>
            <div className="page-header">
                <h1>Our Doctors</h1>
                <Link to="/add-doctor" className="btn-primary">
                    + Add Doctor
                </Link>
            </div>

            {/* Filters Section */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search Doctor"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                >
                    {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec === "All" ? "All Specializations" : spec}
                        </option>
                    ))}
                </select>

                {hasConsultationFee && (
                    <select value={fee} onChange={(e) => setFee(e.target.value)}>
                        <option value="All">All Fees</option>
                        <option value="Low">Low (&lt; ₹500)</option>
                        <option value="Medium">Medium (₹500 - ₹1000)</option>
                        <option value="High">High (&gt; ₹1000)</option>
                    </select>
                )}

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort Experience</option>
                    <option value="high">High To Low</option>
                    <option value="low">Low To High</option>
                </select>
            </div>

            {/* Doctors Grid */}
            {finalDoctors.length === 0 ? (
                <p className="no-favorites">
                    No doctors match your search or filter criteria.
                </p>
            ) : (
                <div className="doctors">
                    {finalDoctors.map((doctor) => (
                        <DoctorCard
                            key={doctor.id}
                            doctor={doctor}
                            onDelete={deleteDoctor}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Doctors;
