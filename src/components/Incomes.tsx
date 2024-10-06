import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Paper,
} from '@mui/material'

import { IncomeDialog } from './IncomeDialog'
import { Income } from '@src/types/Income'
import { SimpleTable } from './SimpleTable'
import { parseIncomesSums } from '../helpers/parseIncomes'
import { EmptyWarner } from './EmptyWarner'
import { Total } from './Total'

export const Incomes = () => {
    const [editId, setEditId] = useState<string>('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [incomes, setIncomes] = useState<Income[]>([])

    const parsedIncomesSums = parseIncomesSums(incomes)

    useEffect(() => {
        const storedIncomes = localStorage.getItem('incomes')

        if (storedIncomes) {
            setIncomes(JSON.parse(storedIncomes))
        }
    }, [])

    return (
        <Box
            sx={{
                padding: 4,
                height: 'calc(100vh - 130px)',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >
            {incomes.length === 0 && (
                <EmptyWarner
                    handleAdd={() => setIsDialogOpen(true)}
                />
            )}

            {incomes.length > 0 && (
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                    }}
                >
                    <SimpleTable
                        incomes={incomes}
                        setIncomes={setIncomes}
                        setEditId={setEditId}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
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

                    <Total parsedIncomesSums={parsedIncomesSums} />
                </Paper>
            )}

            <IncomeDialog
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                setIncomes={setIncomes}
                editId={editId}
                setEditId={setEditId}
                parsedIncomesSums={parsedIncomesSums}
            />
        </Box>
    )
}