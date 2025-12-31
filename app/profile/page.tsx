"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Card, Typography, Box, Button, TextField, Avatar, Divider } from "@mui/material";
import { Edit, Save, Logout } from "@mui/icons-material";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user || "admin");
  const [email, setEmail] = useState("admin@store.com");

  const handleSave = () => {
    // Update auth store with new name
    useAuthStore.getState().login(name, ""); // Password dummy, just update user
    setIsEditing(false);
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <Box sx={{ 
        padding: 3, 
        background: "#0f0f23",
        minHeight: "100vh"
      }}>
        <Typography variant="h4" sx={{ 
          mb: 3, 
          color: '#ffffff', 
          fontWeight: 700,
          borderLeft: "4px solid #ec4899",
          pl: 2
        }}>
          Profile Settings
        </Typography>

        <Card sx={{ 
          background: "#1a1a2e",
          border: '1px solid #2a2a3e',
          borderRadius: 2.5,
          p: 4,
          maxWidth: 500,
          mx: 'auto'
        }}>
          {/* Profile Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto',
                mb: 2,
                background: "linear-gradient(135deg, #ec4899, #f43f5e)"
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
              {name}
            </Typography>
            <Typography sx={{ color: '#94a3b8' }}>
              {email}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: '#2a2a3e' }} />

          {/* Edit Form */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ color: '#f8fafc', fontWeight: 600, mr: 2 }}>
                Account Details
              </Typography>
              <Button
                startIcon={<Edit />}
                onClick={() => setIsEditing(!isEditing)}
                size="small"
                sx={{ 
                  color: '#ec4899',
                  '&:hover': { background: 'rgba(236,72,153,0.1)' }
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
              InputProps={{
                style: { background: "#1e1e2e", color: "#f8fafc" }
              }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              sx={{ mb: 3 }}
              InputProps={{
                style: { background: "#1e1e2e", color: "#f8fafc" }
              }}
            />

            {isEditing && (
              <Button
                fullWidth
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  background: "#ec4899",
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { background: "#db2777" }
                }}
              >
                Save Changes
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 3, borderColor: '#2a2a3e' }} />

          {/* Logout */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ 
                px: 4, py: 1.5,
                border: '1px solid #475569',
                color: '#f1f5f9',
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </Box>
    </ProtectedRoute>
  );
}
