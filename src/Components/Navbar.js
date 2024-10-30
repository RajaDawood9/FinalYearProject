import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
// import logo from './src/Images/logo.png';

// const Navbar = () => {
//     return (
   
//    <nav> 
//          <div class='logo'>
//           <img src='./images/logo1.png'height={120} width={600} alt='logo' />
//           {/* <h3>logo</h3> */}
//         </div>
//         {/* <div class='name'>
//           <h2 >National College <br/> Of business Administration <br/> & Economics </h2>
//         </div> */}
//         <div class='nav-links'>
//           <Link to="/">Home</Link>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Register</Link>
//         </div>
//     </nav>

//     );
//   };
  
//   export default Navbar;

const Navbar = () => {
  return (
    <nav> 
      <div className='logo'>
        <img src='./images/logo.png' height={40} width={40} alt='logo' />
        <h4 style={{ fontFamily: 'Elephant, serif', fontWeight: 'bold',   fontsize: '24px' }}>
          NCBA&E
        </h4>

        
      </div>
      <div className='nav-links'>
        <Link to="/">
          <FaHome /> Home
        </Link>
        <Link to="/login">
          <FaSignInAlt /> Login
        </Link>
        <Link to="/register">
          <FaUserPlus /> Register
        </Link>
        <Link to="/about">
        <FaInfoCircle /> About Us
      </Link>
      <Link to="/contact">
        <FaPhoneAlt /> Contact Us
      </Link>
      <Link to="/about">About Us
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;