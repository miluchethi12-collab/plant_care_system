import { Link } from 'react-router-dom';

// Nav bar with simple class-based styles
export default function Navbar({ user, onLogout }) {
  return (
    <>
      <style>{`
        .nav-container {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
          background: #fff;
          display: flex;
          align-items: center;
        }
        .nav-link {
          margin-right: 1rem;
          color: inherit;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
        .user-info {
          margin-left: auto;
          display: flex;
          align-items: center;
        }
        .user-info span {
          margin-right: 0.5rem;
        }
      `}</style>
      <nav className="nav-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/plants" className="nav-link">Your Plants</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
        {user ? (
          <div className="user-info">
            <span>Hello, {user.name}</span>
            <button onClick={onLogout}>Log out</button>
          </div>
        ) : (
          <Link to="/login" className="nav-link">Log in</Link>
        )}
      </nav>
    </>
  );
}
