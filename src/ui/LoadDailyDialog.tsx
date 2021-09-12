import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoad: () => void;
}

export function LoadDailyDialog(props: Props) {
  const { open, onClose, onLoad } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Load Daily Meteors</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a date to load from the Global Meteor Network daily
          data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onLoad}>Load</Button>
      </DialogActions>
    </Dialog>
  );
}
