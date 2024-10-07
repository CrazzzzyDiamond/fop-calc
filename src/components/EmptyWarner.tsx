import {
	Box,
	Button,
	Paper,
	Typography
} from '@mui/material'

interface EmptyWarnerProps {
    handleAdd: () => void;
}

export const EmptyWarner = ({ handleAdd }: EmptyWarnerProps) => {
	return (
		<Box
			sx={{
				padding: 4,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 6,
					textAlign: 'center',
				}}
			>
				<Typography variant='h3'>No incomes</Typography>
				<Box
					m={5}
				>
					<Button
						variant='contained'
						onClick={handleAdd}
						size='large'
					>
                        Add Income
					</Button>
				</Box>
			</Paper>
		</Box>
	)
}