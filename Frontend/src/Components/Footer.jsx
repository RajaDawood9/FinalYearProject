import React from "react";
import "./Styles/footer.css";

const Footer = () => {
  return (
    <div>
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sections Container - Flexbox for Horizontal Alignment */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {/* About Section */}
          <div style={{ flex: 1, marginRight: "20px" }}>
            <h3>About NCBA&E</h3>
            <p>
              NCBA&E is a leading institution in business, economics, computer
              science, and social sciences, committed to delivering quality
              education and fostering innovation since 1994.
            </p>
          </div>

          

          {/* Contact Info */}
          <div style={{ flex: 1 }}>
            <h3>Contact Us</h3>
            <p>
              <strong>Email:</strong> info@ncbae.edu.pk
              <br />
              <strong>Phone:</strong> +92 42 1234 5678
              <br />
              <strong>Address:</strong> 123 University Avenue, Lahore, Punjab,
              Pakistan
            </p>
          </div>
        </div>

        {/* Social Media Links - Positioned at the bottom */}
        <div style={{ marginTop: "20px" }}>
          <h3>Follow Us</h3>
          <div>
            <a
              href="https://facebook.com/ncbaeuniversity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", marginRight: "10px" }}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/ncbaeuniversity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", marginRight: "10px" }}
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/school/ncbaeuniversity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", marginRight: "10px" }}
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/ncbaeuniversity"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid #555",
          marginTop: "20px",
          paddingTop: "10px",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} NCBA&E University. All Rights
          Reserved.
        </p>
      </div>
    </footer>{" "}
  </div>
);
};

export default Footer;
