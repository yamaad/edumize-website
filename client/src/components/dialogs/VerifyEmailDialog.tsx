import { Button, CircularProgress, Dialog, DialogActions, DialogContent, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useValidateEmailMutation } from "redux/lead/lead.api";
import { emailValidator } from "utils/validator";

interface VerifyEmailDialogProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  onVerified: () => void;
}

const VerifyEmailDialog = ({ showDialog, setShowDialog, onVerified }: VerifyEmailDialogProps) => {
  // ---------------
  // local states
  // ---------------
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();
  // ---------------
  // hooks
  // ---------------
  const [validateEmail, result] = useValidateEmailMutation();

  // ---------------
  // handlers
  // ---------------
  const handleOnEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };
  const handleOnVerify = () => {
    const errorMessage = emailValidator(email);
    setError(errorMessage);
    if (!errorMessage) {
      validateEmail({ email }).unwrap();
    }
  };
  const handleClose = () => {
    setShowDialog(false);
  };
  // ---------------
  // triggers
  // ---------------
  useEffect(() => {
    if (result.isSuccess) {
      switch (result.data.emailStatus) {
        case "ERROR":
        case "VALID":
          onVerified();
          setShowDialog(false);
          break;
        default:
          setError("Sorry! We are unable to verify your email please email another email or contact us on whatsapp");
          break;
      }
    }
  }, [result]);
  return (
    <Dialog
      open={showDialog}
      onClose={handleClose}
      PaperProps={{ sx: { boxSizing: "content-box", height: "240px", width: "350px", p: 3, pb: 1, borderRadius: 3 } }}
    >
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="bodyBold" color="content.500">
          Enjoy a generous extra discount by subscribing to our newsletter
        </Typography>
        <TextField
          placeholder="Type your email.."
          fullWidth
          variant="standard"
          color={"primary"}
          autoFocus
          value={email}
          error={!!error}
          helperText={error}
          onChange={handleOnEmailChange}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            mt: 3,
            bgcolor: "primary.100",
            height: "40px",
            borderRadius: 3,
            ".MuiInputBase-root": { height: "40px" },
            ".MuiInputBase-input": { textAlign: "center", height: "40px" },
            ".MuiFormHelperText-root": { textAlign: "center", mt: 1.5 },
          }}
        ></TextField>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          disabled={result.isLoading}
          onClick={handleOnVerify}
          sx={{ color: "content.0", textTransform: "capitalize", borderRadius: 5, fontWeight: 700, py: 1, px: 3 }}
        >
          {result.isLoading ? <CircularProgress color="secondary" /> : "verify"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyEmailDialog;
