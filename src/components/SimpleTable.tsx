import {
    Box,
    Button,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { Income } from '../types/Income';
import { parseeIncomesSimple } from '../helpers/parseIncomes';
import { ROW_COLOR } from '../constants/colors'

interface SimpleTableProps {
    incomes: Income[];
}

export const SimpleTable = ({ incomes }: SimpleTableProps) => {
    const parsedIncomes = parseeIncomesSimple(incomes)

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant='head'>Date</TableCell>
                        <TableCell variant='head'>Sum</TableCell>
                        <TableCell variant='head'>Currency</TableCell>
                        <TableCell variant='head'>Uah Sum</TableCell>
                        <TableCell variant='head'>Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parsedIncomes.map(income => (
                        <TableRow
                            sx={{

                                borderBottom: income.month === 'March'
                                || income.month === 'June'
                                || income.month === 'September'
                                    ? '2px solid black'
                                    : 'none'

                            }}
                            key={income.date}
                        >
                            <TableCell>{income.date}</TableCell>
                            <TableCell>{income.sum}</TableCell>
                            <TableCell>{income.currency}</TableCell>
                            <TableCell>{income.uahSum}</TableCell>
                            <TableCell>{income.rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}