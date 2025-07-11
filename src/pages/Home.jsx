import React from "react";
import "../styles.css"; // Ensure this file exists for styling

const Home = ({ immunizations }) => {
  return (
    <div className="home-container">
      <h1>Welcome to Linda Toto Immunization Tracker</h1>
      <p>
        Immunization is a key step in protecting your child from preventable diseases.
        Stay on track with vaccinations and ensure a healthier future for your little one!
      </p>

      <h2>Infant Immunization Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Age Administered</th>
            <th>Protection Against</th>
          </tr>
        </thead>
        <tbody>
          {/* Static immunization data */}
          <tr>
            <td>BCG</td>
            <td>At Birth</td>
            <td>Tuberculosis (TB)</td>
          </tr>
          <tr>
            <td>Hepatitis B</td>
            <td>At Birth</td>
            <td>Hepatitis B</td>
          </tr>
          <tr>
            <td>Oral Polio (OPV)</td>
            <td>6, 10, 14 Weeks</td>
            <td>Polio</td>
          </tr>
          <tr>
            <td>DTP-HepB-Hib (Pentavalent)</td>
            <td>6, 10, 14 Weeks</td>
            <td>Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib</td>
          </tr>
          <tr>
            <td>Measles</td>
            <td>9 & 18 Months</td>
            <td>Measles</td>
          </tr>

          {/* Dynamic immunization data fetched from Django API */}
          {immunizations.length > 0 ? (
            immunizations.map((vaccine) => (
              <tr key={vaccine.id}>
                <td>{vaccine.name}</td>
                <td>{vaccine.age}</td>
                <td>{vaccine.protection_against}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading immunization data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
