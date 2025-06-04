import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  shops: string[];
}

const Signup = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    shops: ["", "", ""],
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedShops = [...formData.shops];
      updatedShops[index] = e.target.value;
      setFormData({ ...formData, shops: updatedShops });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    try {
     await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      setSuccess("Signup successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Grid >
    <Container maxWidth="sm" style={{border: "1px solid #d0caca", borderRadius:"6px", margin:"30px auto", padding:"20px"}}>
      <Typography variant="h6" gutterBottom style={{fontWeight:"700"}}>
        Sign Up
      </Typography>

      <TextField
        label="Username"
        name="username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        helperText="Min 8 chars, 1 number, 1 special char"
      />

      <Typography variant="subtitle1">Enter 3 unique shop names</Typography>
      {formData.shops.map((shop, idx) => (
        <TextField
          key={idx}
          label={`Shop ${idx + 1}`}
          fullWidth
          margin="normal"
          value={shop}
          onChange={(e:any) => handleChange(e, idx)}
        />
      ))}

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {success && (
        <Box mt={2}>
          <Alert severity="success">{success}</Alert>
        </Box>
      )}

      <Box mb={4}>
        <Button variant="contained" style={{backgroundColor:"#090642"}} onClick={handleSubmit}>
          Sign Up
        </Button>
      </Box>
    </Container>
     </Grid>
  );
};

export default Signup;
