import { useState } from 'react'
import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Box,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material'

import { LANGS_OPTIONS } from '@src/constants/langs'

export const AppBar = () => {
	const [lang, setLang] = useState(LANGS_OPTIONS[0].value)

	const handleChange = (event: SelectChangeEvent) => {
		setLang(event.target.value as string)
	}

	return (
		<MUIAppBar
			position='static'
			sx={{
				backgroundColor: '#3f51b5',
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
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={lang}
						label="Age"
						onChange={handleChange}
						size='small'
						variant='outlined'
						sx={{
							// color: 'white',
							backgroundColor: 'white',
						}}
					>
						{LANGS_OPTIONS.map(lang => (
							<MenuItem
								key={lang.value}
								value={lang.value}
							>
								{lang.label}
							</MenuItem>
						))}
					</Select>
				</Box>
			</Toolbar>
		</MUIAppBar>
	)
}