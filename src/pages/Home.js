// import React from 'react';


// const Home = () => {
//   return (
    
//     <div>
//       {/* <img src='./images/home3.png' height={562} width={1232} alt='university image' /> */}
//       <div class='text-background'>
//       {/* <img src='./images/home4.png' height={300} width={1232} alt='student image' /> */}
//       </div>
//       <div class='text'>
//         <h1>WELCOME</h1>
//         <h3>______________________</h3>
//         {/* <h2><marquee scrollamount="15">NATIONAL COLLEGE OF BUSINESS ADMINISTRATION & ECONOMICS</marquee></h2> */}
//         <h2>NATIONAL COLLEGE OF BUSINESS ADMINISTRATION & ECONOMICS</h2>
//         <p>NCBA&E as an educational institution plays a key role in the city and region in which it operates. We are located in the heart of Lahore<br></br> <center>which is the second largest city of Pakistan.</center> </p>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
  // Assuming you will add the styles to Home.css
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Existing content */}
      <div className="text-background">
        {/* Image section */}
      </div>
      <div className="text">
        <h1>WELCOME</h1>
        <h3>______________________</h3>
        <h2>NATIONAL COLLEGE OF BUSINESS ADMINISTRATION & ECONOMICS</h2>
        <p>
          NCBA&E as an educational institution plays a key role in the city and region in which it operates. 
          We are located in the heart of Lahore<br />
          <center>which is the second largest city of Pakistan.</center>
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-navigation">
            <a href="#">NEWS</a>
            <a href="#">EVENTS</a>
            <a href="#">GRADUATE PROGRAMS</a>
            <a href="#">ATHLETICS</a>
            <a href="#">EMPLOYMENT</a>
            <a href="#">LIBRARY</a>
            <a href="#">OFFICES & CENTERS</a>
            <a href="#">DIRECTORY</a>
          </div>
          <div className="footer-contact">
            <p>1021 Dulaney Valley Road, Lahore, PK 54000 | +92-42-1234567 | admissions@ncbae.edu.pk | <a href="#">Contact & Directions</a> | <a href="#">Emergency Info</a></p>
          </div>
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NCBA&E | <a href="#">Privacy Policy</a> | <a href="#">Accessibility</a> | <a href="#">About this Website</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
