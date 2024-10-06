import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from '@mui/material'

import { TotalSums } from '../types/Income'

interface TotalProps {
    parsedIncomesSums: TotalSums;
}

export const Total = ({ parsedIncomesSums }: TotalProps) => {
    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'inline-grid',
                gap: 2,
                gridTemplateColumns: '1fr 1fr',
            }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head'>
                                Period
                            </TableCell>
                            <TableCell variant='head'>
                                Sum
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
                                    {quarter}
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
                            <TableRow key={half} hover >
                                <TableCell>
                                    {half}
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
                                Year
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
        </Box>
    )
}