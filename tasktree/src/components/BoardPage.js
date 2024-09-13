import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Toolbar, Box, Paper, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import userData from '../userData.json';

function BoardPage() {
    const { boardTitle } = useParams();
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const selectedBoard = userData.boards.find(board => board.title === boardTitle);
        setBoard(selectedBoard);
    }, [boardTitle]);

    if (!board) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            textAlign: 'left',
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
                        fontWeight: 'bold',
                    }}
                >
                    {board.title}
                </Typography>

                <Box>
                    <Typography variant="h5" sx={{ textAlign: 'left', mb: 2 }}>
                        Blocks
                    </Typography>
                    <Grid container direction="column" spacing={2}>
                        {board.blocks.map((block, index) => (
                            <Grid item key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {/* Render Block Title */}
                                    <Typography variant="h6">
                                        {block.title}
                                    </Typography>
                                    {/* Render Block Completion */}
                                    <Typography variant="body1">
                                        Completion: {Math.round(block.completion * 100)}%
                                    </Typography>
                                    {/* Render Block End Date */}
                                    <Typography variant="body2" color="textSecondary">
                                        End Date: {block.endDate}
                                    </Typography>

                                    {/* Render Tasks under Block */}
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Tasks:
                                        </Typography>
                                        {block.tasks.map((task) => (
                                            <Typography key={task.id} variant="body2">
                                                {task.done ? '✔️' : '❌'} {task.title} (Due: {task.endDate})
                                            </Typography>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default BoardPage;
