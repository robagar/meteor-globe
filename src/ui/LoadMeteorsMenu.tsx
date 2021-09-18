import { Menu, MenuItem } from "@mui/material";

import { MeteorDataInfo } from "../interfaces";
import { METEORS_YESTERDAY, METEORS_LATEST_DAILY } from "../data/meteors";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onLoadMeteors: (info: MeteorDataInfo) => void;
  showLoadDailyDialog: () => void;
}

export function LoadMeteorsMenu(props: Props) {
  const { anchorEl, open, onClose, onLoadMeteors, showLoadDailyDialog } = props;

  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
      <MenuItem
        onClick={() => {
          onLoadMeteors(METEORS_YESTERDAY);
        }}
      >
        {METEORS_YESTERDAY.title}
      </MenuItem>
      <MenuItem
        onClick={() => {
          onLoadMeteors(METEORS_LATEST_DAILY);
        }}
      >
        {METEORS_LATEST_DAILY.title}
      </MenuItem>
      <MenuItem onClick={showLoadDailyDialog}>Daily...</MenuItem>
    </Menu>
  );
}
