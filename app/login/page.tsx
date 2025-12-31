"use client";

import dynamic from "next/dynamic";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s: any) => s.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#0f0f23",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      }}
    >
      <Card
        style={{
          padding: 30,
          maxWidth: 400,
          width: "100%",
          background: "#1a1a2e",
          border: "1px solid #2a2a3e",
          borderRadius: 12,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
        }}
      >
        <Typography 
          variant="h5" 
          style={{ 
            textAlign: "center", 
            marginBottom: 30,
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 28
          }}
        >
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            style: {
              background: "#1e1e2e",
              borderRadius: 8,
              color: "#f8fafc"
            }
          }}
          InputLabelProps={{
            style: {
              color: "#94a3b8",
              fontWeight: 500
            }
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2a2a3e",
                borderRadius: 8
              },
              "&:hover fieldset": {
                borderColor: "#3b82f6"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3b82f6"
              }
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#3b82f6"
            }
          }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              background: "#1e1e2e",
              borderRadius: 8,
              color: "#f8fafc"
            }
          }}
          InputLabelProps={{
            style: {
              color: "#94a3b8",
              fontWeight: 500
            }
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#2a2a3e",
                borderRadius: 8
              },
              "&:hover fieldset": {
                borderColor: "#3b82f6"
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3b82f6"
              }
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#3b82f6"
            }
          }}
        />

        {error && (
          <div 
            style={{ 
              marginBottom: 20,
              padding: 12,
              borderRadius: 8,
              borderLeft: "4px solid #dc2626",
              background: "rgba(220,38,38,0.1)",
              color: "#fca5a5",
              fontSize: 14
            }}
          >
            {error}
          </div>
        )}

        <Button
          fullWidth
          variant="contained"
          style={{ 
            marginTop: 20,
            height: 50,
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 8px 25px rgba(59,130,246,0.4)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(59,130,246,0.6)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(59,130,246,0.4)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Typography 
          variant="body2" 
          style={{ 
            textAlign: "center", 
            marginTop: 20, 
            color: "#94a3b8",
            fontSize: "0.875rem"
          }}
        >
          Demo: <strong style={{ color: "#3b82f6" }}>username: admin</strong> | <strong style={{ color: "#3b82f6" }}>password: admin123</strong>
        </Typography>
      </Card>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false });
