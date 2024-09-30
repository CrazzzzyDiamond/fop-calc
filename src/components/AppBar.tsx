import MUIAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'


export const AppBar = () => {
    return (
        <MUIAppBar
            position='static'
            sx={{
                backgroundColor: '#3f51b5',
            }}
        >
            <Toolbar>
                <Typography variant="h6" color="inherit" component="div">
                    FOP Calculator
                </Typography>
            </Toolbar>
        </MUIAppBar>
    )
}