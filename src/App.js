import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'BikeID', direction: 'ascending' });

  useEffect(() => {
    fetch('/bikes_response.json')
      .then(response => response.json())
      .then(data => setBikes(data));
  }, []);

  // Sorting logic
  const sortedBikes = [...bikes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Searching logic
  const filteredBikes = sortedBikes.filter(bike =>
    Object.values(bike).some(value => value.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="App">
      <h1>Bike Catalog</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('BikeID')}>BikeID</th>
            <th onClick={() => requestSort('Make')}>Make</th>
            <th onClick={() => requestSort('Model')}>Model</th>
            <th onClick={() => requestSort('Year')}>Year</th>
            <th onClick={() => requestSort('Displacement')}>Displacement</th>
            <th onClick={() => requestSort('Price')}>Price</th>
            <th onClick={() => requestSort('Terrain')}>Terrain</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredBikes.map(bike => (
            <tr key={bike.BikeID}>
              <td>{bike.BikeID}</td>
              <td>{bike.Make}</td>
              <td>{bike.Model}</td>
              <td>{bike.Year}</td>
              <td>{bike.Displacement}</td>
              <td>{bike.Price}</td>
              <td>{bike.Terrain}</td>
              <td>{bike.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
