import {
	Box,
	Button,
	Paper,
	Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface EmptyWarnerProps {
    handleAdd: () => void;
}

export const EmptyWarner = ({ handleAdd }: EmptyWarnerProps) => {
	const { t } = useTranslation()

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
				<Typography variant='h3'>
					{t('noIncomes')}
				</Typography>
				<Box
					m={5}
				>
					<Button
						variant='contained'
						onClick={handleAdd}
						size='large'
					>
						{t('addIncome')}
					</Button>
				</Box>
			</Paper>
		</Box>
	)
}