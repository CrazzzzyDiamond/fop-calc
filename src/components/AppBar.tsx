import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Box,
} from '@mui/material'

import { LangSelect } from './LangSelect'

export const AppBar = () => {
	return (
		<MUIAppBar
			position='sticky'
			sx={{
				backgroundColor: '#4d6160',
			}}
		>
			<Toolbar variant='dense'>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Typography variant="h6" color="inherit" component="div">
                    	FOP Calculator
					</Typography>
					<LangSelect />
				</Box>
			</Toolbar>
		</MUIAppBar>
	)
}