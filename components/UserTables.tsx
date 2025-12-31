"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, Typography, TextField, Button, Box, Avatar } from "@mui/material";
import Link from "next/link";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export default function UserTables() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const url = search.trim()
        ? `https://dummyjson.com/users/search?q=${search.trim()}&limit=${LIMIT}`
        : `https://dummyjson.com/users?limit=${LIMIT}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { getUsers(); }, [getUsers]);

  return (
    <Box sx={{ 
      padding: 3, 
      background: "#0f0f23",
      minHeight: "100vh"
    }}>
      <Typography variant="h4" sx={{ 
        mb: 3, 
        color: '#ffffff', 
        fontWeight: 700,
        borderLeft: "4px solid #3b82f6",
        pl: 2
      }}>
        Users
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search users..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ 
            minWidth: 220,
            '& .MuiOutlinedInput-root': {
              background: "#1e1e2e",
              border: '1px solid #2a2a3e',
              borderRadius: 1.5,
              color: '#f8fafc'
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={() => getUsers()} 
          sx={{ 
            background: "#3b82f6",
            borderRadius: 1.5,
            textTransform: 'none',
            '&:hover': { background: "#2563eb" }
          }}
        >
          Search
        </Button>
      </Box>

      <Card sx={{ 
        background: "#1e1e2e",
        border: '1px solid #2a2a3e',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '60px 1fr 1fr 1fr 100px', 
          gap: 2, 
          p: 3, 
          borderBottom: '1px solid #2a2a3e',
          color: '#94a3b8'
        }}>
          <Typography fontWeight={600}>Photo</Typography>
          <Typography fontWeight={600}>Name</Typography>
          <Typography fontWeight={600}>Username</Typography>
          <Typography fontWeight={600}>Email</Typography>
          <Typography fontWeight={600}>Action</Typography>
        </Box>
        
        {users.map((user) => (
          <Box key={user.id} sx={{ 
            display: 'grid', 
            gridTemplateColumns: '60px 1fr 1fr 1fr 100px', 
            gap: 2, 
            p: 3, 
            borderBottom: '1px solid #2a2a3e',
            alignItems: 'center',
            '&:hover': { background: "#2a2a3e" }
          }}>
            <Avatar src={user.image} sx={{ width: 36, height: 36 }} />
            <Box>
              <Typography sx={{ color: '#f8fafc', fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: 12 }}>{user.phone}</Typography>
            </Box>
            <Typography sx={{ color: '#f8fafc' }}>@{user.username}</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>{user.email}</Typography>
            <Link href={`/users/${user.id}`} style={{ color: '#3b82f6', fontSize: 13 }}>
              View
            </Link>
          </Box>
        ))}
      </Card>
    </Box>
  );
}

