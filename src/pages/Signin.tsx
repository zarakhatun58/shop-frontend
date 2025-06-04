import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`, // ✅ Make sure this matches your backend route
        {
          username,
          password,
          remember: rememberMe,
        },
        {
          withCredentials: true, // ✅ Needed for cookie-based auth
        }
      );

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        border: "1px solid #d0caca",
        borderRadius: "6px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
           <Typography variant="h6" gutterBottom style={{fontWeight:"700"}}>
        Sign In
      </Typography>

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember Me"
      />

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#090642" }}
          onClick={handleSubmit}
          fullWidth
        >
          Sign In
        </Button>
      </Box>

      <Box mt={2}>
        <Typography>
          Not Registered?{" "}
          <Link to="/signup" style={{ color: "#090642" }}>
            Create an account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signin;
