import { Box } from '@mui/material'
import { AppBar } from './components/AppBar'
import { Incomes } from './components/Incomes'

function App() {
	return (
		<Box
			sx={{
				backgroundColor: '#efd9b4',
				minHeight: '100vh',
			}}
		>
			<AppBar />
			<Incomes />
		</Box>
	)
}

export default App
