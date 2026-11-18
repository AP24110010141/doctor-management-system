import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";

function DoctorCard({ doctor, onDelete }) {
    const dispatch = useDispatch();

    return (
        <div className="card">
            <img
                src={doctor.image}
                alt={doctor.name}
            />

            <h3>{doctor.name}</h3>

            <p>{doctor.specialization}</p>

            <p>⭐ {doctor.experience} Years Experience</p>

            <Link to={`/doctors/${doctor.id}`}>
                View Details
            </Link>

            <Link to={`/edit-doctor/${doctor.id}`} className="edit-btn">
                Edit
            </Link>

            <button className="delete-btn" onClick={() => onDelete(doctor.id)}>
                Delete
            </button>

            <button
                className="favorite-btn"
                onClick={() => dispatch(addFavorite(doctor))}
            >
                ❤️ Add to Favorites
            </button>
        </div>
    );
}

export default DoctorCard;
