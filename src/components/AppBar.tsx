import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Box,
} from '@mui/material'

import { LangSelect } from './LangSelect'
import { ClearButton } from './ClearButton'

const appBarStyle = {
	backgroundColor: '#1071f2',
}

const toolbarStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
}

export const AppBar = () => {
	return (
		<MUIAppBar
			position='sticky'
			sx={appBarStyle}
		>
			<Toolbar variant='dense'>
				<Box
					sx={toolbarStyle}
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