import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Box,
} from '@mui/material'

import { LangSelect } from './LangSelect'
import { ClearButton } from './ClearButton'

export const AppBar = () => {
	return (
		<MUIAppBar
			position='sticky'
			sx={{
				backgroundColor: '#1071f2',
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
					<Box>
						<ClearButton />
						<LangSelect />
					</Box>
				</Box>
			</Toolbar>
		</MUIAppBar>
	)
}