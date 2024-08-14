import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Typography
} from '@mui/material';
import { IncomeDialog } from './IncomeDialog';
import { Income } from '../types/Income';
import { SimpleTable } from './SimpleTable';
import { parseIncomesSums } from '../helpers/parseIncomes'

export const Incomes = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [incomes, setIncomes] = useState<Income[]>([]);

    const parsedIncomesSums = parseIncomesSums(incomes);

    console.log(parsedIncomesSums);

    useEffect(() => {
        const storedIncomes = localStorage.getItem("incomes");

        if (storedIncomes) {
            setIncomes(JSON.parse(storedIncomes));
        }
    }, []);

    return (
        <Box
            sx={{
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                }}
            >
                <SimpleTable
                    incomes={incomes}
                    setIncomes={setIncomes}
                />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Add income
                    </Button>
                </Box>

                <Box
                    sx={{
                        marginTop: 2,
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: "1fr 1fr",
                    }}
                >
                    <Typography><b>First Quarter Sum</b></Typography>
                    <Typography>{parsedIncomesSums.firstHalfSum}</Typography>
                    <Typography><b>Second Quarter Sum</b></Typography>
                    <Typography>{parsedIncomesSums.secondQuarterSum}</Typography>
                    <Typography><b>Third Quarter Sum</b></Typography>
                    <Typography>{parsedIncomesSums.thirdQuarterSum}</Typography>
                    <Typography><b>Fourth Quarter Sum</b></Typography>
                    <Typography>{parsedIncomesSums.fourthQuarterSum}</Typography>
                    <Typography><b>First Half Year Sun</b></Typography>
                    <Typography>{parsedIncomesSums.firstHalfSum}</Typography>
                    <Typography><b>Second Half Year Sum</b></Typography>
                    <Typography>{parsedIncomesSums.secondHalfSum}</Typography>
                    <Typography><b>Year Sum</b></Typography>
                    <Typography>{parsedIncomesSums.yearSum}</Typography>
                </Box>
            </Paper>

            <IncomeDialog
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                setIncomes={setIncomes}
            />
        </Box>
    )
}