import React, { useEffect, useState } from 'react';
import { ThemeProvider, styled } from '@mui/material/styles'; // Import styled from MUI
import theme from './theme'; // Import the custom theme
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, TextField, Paper, Typography, Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 === 0 ? theme.palette.background.paper : theme.palette.grey[200],
}));

function App() {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'BikeID', direction: 'ascending' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch('/bikes_response.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setBikes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleRequestSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === 'ascending') ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setPage(0); // Reset page to 0 on search
  };

  const filteredBikes = bikes.filter(bike =>
    Object.values(bike).some(value => value.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const sortedBikes = filteredBikes.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

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
