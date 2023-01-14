import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export interface DialogStoryProps {
  title: string;
  description: string;
}

export const DialogStory = ({ title, description }: DialogStoryProps) => (
  <Dialog open>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography sx={{ whiteSpace: "pre-line" }}>{description}</Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="contained">확인</Button>
      <Button variant="outlined">취소</Button>
    </DialogActions>
  </Dialog>
);
