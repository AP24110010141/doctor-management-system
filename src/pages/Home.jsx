
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home">

            {/* Hero Section */}
            <div className="hero">

                <div className="hero-text">
                    <h1>Welcome to Doctor Management System</h1>

                    <p>
                        Find experienced doctors and explore
                        their medical specializations.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/doctors" className="btn-primary">
                            View Doctors
                        </Link>

                        <Link to="/add-doctor" className="btn-secondary">
                            Add Doctor
                        </Link>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="/images/doctor2.jpeg"
                        alt="Doctor"
                    />
                </div>

            </div>

            {/* Features Section */}
            <div className="features">

                <div className="feature-card">
                    <span className="feature-icon">🔍</span>
                    <h3>Find Doctors</h3>
                    <p>Search and browse through our list of experienced doctors.</p>
                </div>

                <div className="feature-card">
                    <span className="feature-icon">🏥</span>
                    <h3>Explore Specializations</h3>
                    <p>Discover doctors across various medical specializations.</p>
                </div>

                <div className="feature-card">
                    <span className="feature-icon">📋</span>
                    <h3>Manage Doctor Records</h3>
                    <p>Add, edit, and manage doctor profiles all in one place.</p>
                </div>

            </div>

            {/* Footer */}
            <footer className="footer">
                <p>© 2024 Doctor Management System</p>
            </footer>

        </div>
    );
}

export default Home;
