// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [hoveredLink, setHoveredLink] = React.useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     navigate('/login');
//   };

//   const isLoggedIn = localStorage.getItem('loggedInUser');

//   const navLinkStyle = {
//     color: '#fff',
//     marginRight: '15px',
//     transition: 'color 0.3s ease',
//     textDecoration: 'none',
//   };

//   const navLinkHoverStyle = {
//     color: '#e50914',
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg px-4"
//       style={{ backgroundColor: '#141414', padding: '12px 24px', width: '100%' }}
//     >
//       <Link
//         className="navbar-brand fw-bold fs-3"
//         to="/"
//         style={{ color: '#e50914', textDecoration: 'none' }}
//       >
//         🎬 CineReview Hub
//       </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarContent"
//         aria-controls="navbarContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse show" id="navbarContent">
//         <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
//           {[ 
//             { label: 'Home', path: '/' },
//             { label: 'Bollywood', path: '/bollywood' },
//             { label: 'RetroNova', path: '/oldbollywood' },
//             { label: 'Search', path: '/search' },
//             ...(isLoggedIn ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
//             ...(!isLoggedIn
//               ? [
//                 { label: 'Login', path: '/login' },
//                 { label: 'Signup', path: '/signup' },
//               ]
//               : []),
//           ].map((link, index) => (
//             <li className="nav-item" key={index}>
//               <Link
//                 to={link.path}
//                 className="nav-link"
//                 style={{
//                   ...navLinkStyle,
//                   ...(hoveredLink === link.label ? navLinkHoverStyle : {}),
//                 }}
//                 onMouseEnter={() => setHoveredLink(link.label)}
//                 onMouseLeave={() => setHoveredLink(null)}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}

//           {isLoggedIn && (
//             <li className="nav-item">
//               <button
//                 className="btn btn-sm text-white ms-2"
//                 style={{
//                   backgroundColor: '#e50914',
//                   border: 'none',
//                   padding: '6px 12px',
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = '#b00610')}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = '#e50914')}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));
//   const [hoveredLink, setHoveredLink] = useState(null);

//   useEffect(() => {
//     const checkLogin = () => {
//       const user = localStorage.getItem('loggedInUser');
//       setIsLoggedIn(!!user);
//     };
//     checkLogin();
//   }, [location]); // <- update whenever route changes

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   const navLinkStyle = {
//     color: '#fff',
//     marginRight: '15px',
//     transition: 'color 0.3s ease',
//     textDecoration: 'none',
//   };

//   const navLinkHoverStyle = {
//     color: '#e50914',
//   };

//   const links = [
//     { label: 'Home', path: '/' },
//     { label: 'Bollywood', path: '/bollywood' },
//     { label: 'RetroNova', path: '/oldbollywood' },
//     { label: 'Search', path: '/search' },
//     ...(isLoggedIn ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
//     ...(!isLoggedIn
//       ? [
//           { label: 'Login', path: '/login' },
//           { label: 'Signup', path: '/signup' },
//         ]
//       : []),
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: '#141414', padding: '12px 24px', width: '100%' }}>
//       <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: '#e50914', textDecoration: 'none' }}>
//         🎬 CineReview Hub
//       </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarContent"
//         aria-controls="navbarContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse show" id="navbarContent">
//         <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
//           {links.map((link, index) => (
//             <li className="nav-item" key={index}>
//               <Link
//                 to={link.path}
//                 className="nav-link"
//                 style={{
//                   ...navLinkStyle,
//                   ...(hoveredLink === link.label ? navLinkHoverStyle : {}),
//                 }}
//                 onMouseEnter={() => setHoveredLink(link.label)}
//                 onMouseLeave={() => setHoveredLink(null)}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}

//           {isLoggedIn && (
//             <li className="nav-item">
//               <button
//                 className="btn btn-sm text-white ms-2"
//                 style={{
//                   backgroundColor: '#e50914',
//                   border: 'none',
//                   padding: '6px 12px',
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = '#b00610')}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = '#e50914')}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!user);
    };
    checkLogin();
  }, [location]); // <- update whenever route changes

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinkStyle = {
    color: '#fff',
    marginRight: '15px',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
  };

  const navLinkHoverStyle = {
    color: '#e50914',
  };

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Bollywood', path: '/bollywood' },
    { label: 'RetroNova', path: '/oldbollywood' },
    { label: 'Search', path: '/search' },
    // Watchlist and Dashboard are always present, regardless of login

    { label: 'Dashboard', path: '/dashboard' },
    ...(!isLoggedIn
      ? [
          { label: 'Login', path: '/login' },
          { label: 'Signup', path: '/signup' },
        ]
      : []),
  ];

  return (
    <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: '#141414', padding: '12px 24px', width: '100%' }}>
      <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: '#e50914', textDecoration: 'none' }}>
        🎬 CineReview Hub
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse show" id="navbarContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
          {links.map((link, index) => (
            <li className="nav-item" key={index}>
              <Link
                to={link.path}
                className="nav-link"
                style={{
                  ...navLinkStyle,
                  ...(hoveredLink === link.label ? navLinkHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {isLoggedIn && (
            <li className="nav-item">
              <button
                className="btn btn-sm text-white ms-2"
                style={{
                  backgroundColor: '#e50914',
                  border: 'none',
                  padding: '6px 12px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#b00610')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#e50914')}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
