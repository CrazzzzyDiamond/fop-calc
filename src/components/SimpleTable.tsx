import { useState } from 'react';
import {
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
import { ConfirmDialog } from './ConfirmDialog';

interface SimpleTableProps {
    incomes: Income[];
    setIncomes: (incomes: Income[]) => void;
}

export const SimpleTable = ({
    incomes,
    setIncomes,
}: SimpleTableProps) => {
    const [idToDelete, setIdToDelete] = useState<string>('')

    const parsedIncomes = parseeIncomesSimple(incomes)

    const handleDelete = (id: string) => {
        const newIncomes = incomes.filter(income => income.id !== id);

        setIncomes(newIncomes);
        localStorage.setItem("incomes", JSON.stringify(newIncomes));
    }

    return (
        <>
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
                                key={income.date}
                                hover
                            >
                                <TableCell>{income.date}</TableCell>
                                <TableCell>{income.sum}</TableCell>
                                <TableCell>{income.currency}</TableCell>
                                <TableCell>{income.rate}</TableCell>
                                <TableCell>{income.uahSum.toFixed(2)}</TableCell>
                                <TableCell>
                                    <IconButton
                                        // onClick={() => onDelete(income.id)}
                                        onClick={() => {
                                            setIdToDelete(income.id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfirmDialog
                isOpen={!!idToDelete}
                onCancel={() => setIdToDelete('')}
                onConfirm={() => handleDelete(idToDelete)}
            />
        </>
    )
}