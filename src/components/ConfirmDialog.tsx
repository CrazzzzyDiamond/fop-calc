import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface ConfirmDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog = ({
    isOpen,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
        >
            <DialogTitle>
                Are you sure?
            </DialogTitle>
            <DialogContent>
                This action cannot be undone.
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onConfirm()}
                    color='error'
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}