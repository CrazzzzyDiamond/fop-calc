import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { TotalSums } from '../types/Income'

interface TotalProps {
    parsedIncomesSums: TotalSums;
}

const totaleWrapperStyle = {	
	position: 'sticky',
	top: 80,
	padding: 2,
	['@media (max-width: 1230px)']: {
		position: 'static',
		marginBottom: 4,
	},
}

export const Total = ({ parsedIncomesSums }: TotalProps) => {
	const { t } = useTranslation()

	return (
		<Paper
			elevation={3}
			sx={totaleWrapperStyle}
		>
			<TableContainer>
				<Table sx={{ minWidth: 520 }}>
					<TableHead>
						<TableRow>
							<TableCell variant='head'>
								{t('period')}
							</TableCell>
							<TableCell variant='head'>
								{t('sum')}
							</TableCell>
							<TableCell variant='head'>
                                3%
							</TableCell>
							<TableCell variant='head'>
                                5%
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.entries(parsedIncomesSums.quarter).map(([quarter, total]) => (
							<TableRow key={quarter} hover>
								<TableCell>
									{t(quarter)}
								</TableCell>
								<TableCell>
									{total.sum}
								</TableCell>
								<TableCell>
									{total.percentage3}
								</TableCell>
								<TableCell>
									{total.percentage5}
								</TableCell>
							</TableRow>
						))}
						{Object.entries(parsedIncomesSums.half).map(([half, total]) => (
							<TableRow key={half} hover>
								<TableCell>
									{t(half)}
								</TableCell>
								<TableCell>
									{total.sum}
								</TableCell>
								<TableCell>
									{total.percentage3}
								</TableCell>
								<TableCell>
									{total.percentage5}
								</TableCell>
							</TableRow>
						))}
						<TableRow hover>
							<TableCell>
								{t('year')}
							</TableCell>
							<TableCell>
								{parsedIncomesSums.year.sum}
							</TableCell>
							<TableCell>
								{parsedIncomesSums.year.percentage3}
							</TableCell>
							<TableCell>
								{parsedIncomesSums.year.percentage5}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}