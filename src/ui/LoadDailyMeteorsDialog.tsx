import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Link,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoadMeteors: () => void;
}

export function LoadDailyMeteorsDialog(props: Props) {
  const { open, onClose, onLoadMeteors } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Load Daily Meteors</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a date to load from the{" "}
          <Link
            color="inherit"
            href="https://globalmeteornetwork.org/"
            target="_blank"
            rel="noopener"
          >
            Global Meteor Network
          </Link>{" "}
          daily data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onLoadMeteors}>Load</Button>
      </DialogActions>
    </Dialog>
  );
}
