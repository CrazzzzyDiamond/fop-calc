import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs"

import { getExchangeRate } from "../helpers/getExchangeRate";
import { uid } from "../helpers/generateId";

interface IncomeDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    setIncomes: (incomes: any) => void;
}

const CURRENCY_OPTIONS = ["UAH", "USD", "EUR"];

export const IncomeDialog = ({
    isOpen,
    onCancel,
    setIncomes,
}: IncomeDialogProps) => {
    const {
        control,
        handleSubmit
    } = useForm({
        defaultValues: {
            sum: "",
            date: dayjs(),
            currency: "USD",
        }
    });

    const submitFormData = async (data: any) => {
        const isUah = data.currency === "UAH"
        let rate = 1

        if (!isUah) {
            rate = await getExchangeRate(
                data.currency,
                data.date.format("YYYYMMDD")
            );
        }

        setIncomes((prevIncomes: any) => {
            const newIncomes = [...prevIncomes, {
                sum: data.sum,
                date: data.date.format("DD.MM.YYYY"),
                currency: data.currency,
                uahSum: data.sum * rate,
                rate,
                id: uid(),
            }];

            localStorage.setItem("incomes", JSON.stringify(newIncomes));

            return newIncomes;
        });

        onCancel();
    };

    return (
        <Dialog open={isOpen}>
            <form onSubmit={handleSubmit(submitFormData)}>
                <DialogTitle>Add income</DialogTitle>
                <DialogContent
                    sx={{
                        padding: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            padding: 1,
                        }}
                    >
                        <Controller
                            name="sum"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Sum"
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    label="Date"
                                    views={["day", "month"]}
                                />
                            )}
                        />

                        <Controller
                            name="currency"
                            control={control}
                            render={({ field }) => (
                                <FormControl>
                                    <InputLabel
                                        id="demo-simple-select-autowidth-label"
                                    >
                                        Currency
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        fullWidth
                                        label="Currency"
                                        {...field}
                                    >
                                        {CURRENCY_OPTIONS.map((currency) => (
                                            <MenuItem key={currency} value={currency}>
                                                {currency}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        padding: 2,
                    }}
                >
                    <Button
                        onClick={onCancel}
                        color="secondary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}