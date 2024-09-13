import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import userData from './userData.json';
import BoardPage from './components/BoardPage';

function App() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBoards(userData.boards);
  }, []);

  const handleBoardClick = (boardTitle) => {
    navigate(`/${boardTitle}`);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'left'
            }}
          >
            TaskTree
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            textAlign: 'left',
            fontWeight: 'bold'
          }}
        >
          Boards
        </Typography>

        <Box>
          <Grid container spacing={2}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={4} key={board.id}>
                <Paper
                  elevation={3}
                  sx={{
                    height: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onClick={() => handleBoardClick(board.title)}
                >
                  <Typography variant="h6">{board.title}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:boardTitle" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;