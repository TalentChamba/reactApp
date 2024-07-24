import React, { useEffect, useState } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles'; // Import styled from MUI
import theme from './theme'; // Import the custom theme
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, TextField, Paper, Typography, Button, Snackbar, Alert } from '@mui/material'; // Import MUI components

// StyledTableCell to apply custom styling to table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold', // Bold font for table headers
}));

// StyledTableRow to alternate row colors
const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 === 0 ? theme.palette.background.paper : theme.palette.grey[200], // Alternating row colors
}));

function App() {
  // State to store bike data
  const [bikes, setBikes] = useState([]);
  // State for search input
  const [search, setSearch] = useState('');
  // State for sorting configuration
  const [sortConfig, setSortConfig] = useState({ key: 'BikeID', direction: 'ascending' });
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // State for error messages
  const [error, setError] = useState('');

  // Fetch bike data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/bikes_response.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Basic validation example (modify as needed based on your data schema)
        if (!Array.isArray(data) || !data.every(item => item.BikeID && item.Make && item.Model)) {
          throw new Error('Invalid data format');
        }

        // Sanitize and store data
        setBikes(data.map(item => ({
          ...item,
          BikeID: sanitizeString(item.BikeID),
          Make: sanitizeString(item.Make),
          Model: sanitizeString(item.Model),
          Year: sanitizeString(item.Year),
          Displacement: sanitizeString(item.Displacement),
          Price: sanitizeString(item.Price),
          Terrain: sanitizeString(item.Terrain),
          Description: sanitizeString(item.Description),
        })));
      } catch (error) {
        console.error('Error fetching data:', error); // Log detailed error
        setError('Unable to load bike data. Please try again later.'); // Set user-friendly error message
      }
    };

    fetchData();
  }, []);

  // Sanitize strings to prevent XSS attacks
  const sanitizeString = (str) => {
    if (typeof str === 'string') {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return str;
  };

  // Handle sorting request
  const handleRequestSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
    setSortConfig({ key, direction }); // Update sort configuration
  };

  // Handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to first page
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Update search input
  };

  // Handle search on Enter key press
  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search
    }
  };

  // Handle search button click
  const handleSearch = () => {
    setPage(0); // Reset page to 0 on search
  };

  // Filter bikes based on search input
  const filteredBikes = bikes.filter(bike =>
    Object.values(bike).some(value => value.toString().toLowerCase().includes(search.toLowerCase()))
  );

  // Sort bikes based on sort configuration
  const sortedBikes = filteredBikes.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Paginate sorted bikes
  const paginatedBikes = sortedBikes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>Bike Catalog</Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress} // Handle Enter key press
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <br /><br />
        {/* Show custom error message if there is an error */}
        {error && (
          <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
            <Alert onClose={() => setError('')} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'BikeID'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('BikeID')}
                  >
                    BikeID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Make'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Make')}
                  >
                    Make
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Model'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Model')}
                  >
                    Model
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Year'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Year')}
                  >
                    Year
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Displacement'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Displacement')}
                  >
                    Displacement
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Price'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Price')}
                  >
                    Price
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={sortConfig.key === 'Terrain'}
                    direction={sortConfig.direction}
                    onClick={() => handleRequestSort('Terrain')}
                  >
                    Terrain
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBikes.map((bike, index) => (
                <StyledTableRow key={bike.BikeID} index={index}>
                  <TableCell>{bike.BikeID}</TableCell>
                  <TableCell>{bike.Make}</TableCell>
                  <TableCell>{bike.Model}</TableCell>
                  <TableCell>{bike.Year}</TableCell>
                  <TableCell>{bike.Displacement}</TableCell>
                  <TableCell>{bike.Price}</TableCell>
                  <TableCell>{bike.Terrain}</TableCell>
                  <TableCell>{bike.Description}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBikes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
