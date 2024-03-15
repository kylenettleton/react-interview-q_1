import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from './mock-api/apis';
import './App.css'; // Import CSS file

const App = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [nameValidity, setNameValidity] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  const handleNameChange = async (event) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.trim() !== '') {
      const isValid = await isNameValid(newName.trim());
      setNameValidity(isValid);
      if (!isValid) {
        setNameErrorMessage('This name has already been taken');
      } else {
        setNameErrorMessage('');
      }
    } else {
      setNameValidity(true);
      setNameErrorMessage('');
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleClear = () => {
    setName('');
    setLocation('');
  };

  const handleAdd = () => {
    if (name.trim() && location.trim() && nameValidity) {
      setTableData([...tableData, { name, location }]);
      setName('');
      setLocation('');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={!nameValidity ? 'invalid' : ''}
          />
          {!nameValidity && <p className="error-message">{nameErrorMessage}</p>}
        </label>
        <br />
        <label>
          Location:
          <select value={location} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
