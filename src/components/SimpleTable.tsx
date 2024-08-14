import {
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Income } from '../types/Income';
import { parseeIncomesSimple } from '../helpers/parseIncomes';

interface SimpleTableProps {
    incomes: Income[];
    setIncomes: (incomes: Income[]) => void;
}

export const SimpleTable = ({ incomes, setIncomes }: SimpleTableProps) => {
    const parsedIncomes = parseeIncomesSimple(incomes)

    const handleDelete = (date: string) => {
        const newIncomes = incomes.filter(income => income.date !== date);
        setIncomes(newIncomes);
        localStorage.setItem("incomes", JSON.stringify(newIncomes));
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell variant='head'>Date</TableCell>
                        <TableCell variant='head'>Sum</TableCell>
                        <TableCell variant='head'>Currency</TableCell>
                        <TableCell variant='head'>Rate</TableCell>
                        <TableCell variant='head'>Uah Sum</TableCell>
                        <TableCell />
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
                            <TableCell>{income.rate}</TableCell>
                            <TableCell>{income.uahSum.toFixed(2)}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => handleDelete(income.date)}
                                    // variant='contained'
                                    // color='primary'
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}