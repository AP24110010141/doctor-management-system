import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>My Favorite Doctors</h1>

            {favorites.length === 0 ? (
                <p className="no-favorites">
                    No favorite doctors yet. Go to the Doctors page and click
                    ❤️ Add to Favorites.
                </p>
            ) : (
                <div className="doctors">
                    {favorites.map((doctor) => (
                        <div key={doctor.id} className="card">
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

                            <button
                                className="remove-btn"
                                onClick={() => dispatch(removeFavorite(doctor.id))}
                            >
                                ❌ Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
