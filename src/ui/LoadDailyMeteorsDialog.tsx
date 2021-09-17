import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Skeleton,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { DateTime } from "luxon";
import useAsyncEffect from "use-async-effect";

import { useGMN } from "../GMNProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  onLoadMeteors: (date: DateTime) => void;
}

export function LoadDailyMeteorsDialog(props: Props) {
  const { open, onClose, onLoadMeteors } = props;

  const { gmn } = useGMN();
  const [availablityInitialized, setAvailablityInitialized] = useState(
    gmn.dailyInitialized
  );
  useAsyncEffect(async () => {
    if (open && !availablityInitialized) {
      await gmn.initDailyMeteorsAvailable();
      setAvailablityInitialized(true);
    }
  });

  const [date, setDate] = useState<DateTime | null>(null);
  // const today = DateTime.now();

  const DailyMeteorsDatePicker = () => {
    return (
      <DatePicker
        label="dd/mm/yyyy"
        value={date}
        onChange={setDate}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="dd/MM/yyyy"
        shouldDisableDate={(date) =>
          date > DateTime.now() || !gmn.dailyMeteorsAvailable(date)
        }
      />
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Load Daily Meteors</DialogTitle>
      <DialogContent>
        {!availablityInitialized && (
          <Skeleton>
            <DailyMeteorsDatePicker />
          </Skeleton>
        )}
        {availablityInitialized && <DailyMeteorsDatePicker />}
      </DialogContent>
      <DialogActions>
        <Button
          disabled={date === null}
          onClick={() => {
            console.info(date);
            if (date) onLoadMeteors(date);
          }}
        >
          Load
        </Button>
      </DialogActions>
    </Dialog>
  );
}
