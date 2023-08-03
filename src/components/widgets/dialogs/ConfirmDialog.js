import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog({
  open = false,
  title = '',
  contentText = '',
  onClose,
  onConfirm,
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} variant="text" color="default">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          autoFocus
          variant="text"
          color="secondary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
