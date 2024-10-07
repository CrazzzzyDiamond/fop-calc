import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Box,
} from '@mui/material'

export const AppBar = () => {
	return (
		<MUIAppBar
			position='static'
			sx={{
				backgroundColor: '#3f51b5',
			}}
		>
			<Toolbar variant='dense'>
				<Box>
					<Typography variant="h6" color="inherit" component="div">
                    FOP Calculator
					</Typography>
				</Box>
			</Toolbar>
		</MUIAppBar>
	)
}