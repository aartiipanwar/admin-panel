"use client";
//Dashboard Page
// Tech: Next.js 14 App Router + Material UI + Zustand Auth
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";   // Global auth state management
import { useRouter } from "next/navigation";        // Client-side navigation
import ProtectedRoute from "@/components/ProtectedRoute";    // Auth protection wrapper
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  CircularProgress
} from "@mui/material";      //import icons
import {
  ShoppingCart,
  People,
  ShoppingBag,
  Logout,
  Person
} from "@mui/icons-material";

export default function Dashboard() {
  // Zustand store state
  const { user } = useAuthStore();
  const router = useRouter();

  // Local state for real-time stats
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  //Fetch live stats from dummyjson API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch products, users, orders simultaneously
        const [products, users, orders] = await Promise.all([
          fetch("https://dummyjson.com/products"),
          fetch("https://dummyjson.com/users"),
          fetch("https://dummyjson.com/carts")
        ]);
        const [pData, uData, oData] = await Promise.all([products.json(), users.json(), orders.json()]);
       
        // Update stats state
        setStats({
          totalProducts: pData.total || 0,
          totalUsers: uData.total || 0,
          totalOrders: oData.total || 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <Box sx={{ 
        minHeight: "100vh", 
        background: "#0f0f23",
        padding: 2
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          p: 2,
          background: "#1a1a2e",
          borderRadius: 2,
          borderLeft: "4px solid #3b82f6"
        }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 0.5 }}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Welcome back, {user || 'Admin'}
            </Typography>
          </Box>
          <Chip
            label={`@${user || 'admin'}`}
            sx={{ 
              background: "#1e40af",
              color: '#ffffff',
              height: 32,
              fontSize: 12,
              fontWeight: 600
            }}
            avatar={
              <Avatar sx={{ 
                background: "#3b82f6",
                width: 24, 
                height: 24,
                fontSize: 12,
                fontWeight: 700
              }}>
                {user?.charAt(0)?.toUpperCase() || 'A'}
              </Avatar>
            }
          />
        </Box>

        {/* Stats Cards - Compact */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {[
            { title: "Products", value: stats.totalProducts, icon: ShoppingCart, color: "#10b981" },
            { title: "Users", value: stats.totalUsers, icon: People, color: "#3b82f6" },
            { title: "Orders", value: stats.totalOrders, icon: ShoppingBag, color: "#f59e0b" }
          ].map((stat, i) => (
            <Card key={i} sx={{ 
              flex: '1 1 140px',
              minWidth: 120,
              p: 2,
              background: "#1e1e2e",
              border: '1px solid #2a2a3e',
              borderRadius: 1.5,
              textAlign: 'center',
              transition: 'all 0.2s ease'
            }}>
              <Box sx={{ 
                width: 40, height: 40, 
                background: `${stat.color}15`,
                borderRadius: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mb: 1.5, mx: 'auto',
                border: `1px solid ${stat.color}30`
              }}>
                <stat.icon sx={{ fontSize: 20, color: stat.color }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.5, fontSize: 20 }}>
                {loading ? <CircularProgress size={18} sx={{ color: stat.color }} /> : stat.value}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                {stat.title}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Quick Actions - Compact */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Products Card */}
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                flex: '1 1 160px',
                minWidth: 140,
                height: 100,
                p: 2.5,
                textAlign: 'center',
                background: "#1e1e2e",
                border: '1px solid #2a2a3e',
                borderRadius: 1.5,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  background: "#2a2a3e",
                  borderColor: "#10b981",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(16,185,129,0.2)'
                }
              }}>
                <ShoppingCart sx={{ fontSize: 28, color: "#10b981", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                  Products
                </Typography>
              </Card>
            </Link>

            {/* Users Card */}
            <Link href="/users" style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                flex: '1 1 160px',
                minWidth: 140,
                height: 100,
                p: 2.5,
                textAlign: 'center',
                background: "#1e1e2e",
                border: '1px solid #2a2a3e',
                borderRadius: 1.5,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  background: "#2a2a3e",
                  borderColor: "#3b82f6",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(59,130,246,0.2)'
                }
              }}>
                <People sx={{ fontSize: 28, color: "#3b82f6", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                  Users
                </Typography>
              </Card>
            </Link>

            {/* Profile Card */}
            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <Card sx={{ 
                flex: '1 1 160px',
                minWidth: 140,
                height: 100,
                p: 2.5,
                textAlign: 'center',
                background: "#1e1e2e",
                border: '1px solid #2a2a3e',
                borderRadius: 1.5,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  background: "#2a2a3e",
                  borderColor: "#ec4899",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(236,72,153,0.2)'
                }
              }}>
                <Person sx={{ fontSize: 28, color: "#ec4899", mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                  Profile
                </Typography>
              </Card>
            </Link>
          </Box>
        </Box>

        {/* Logout */}
        <Card sx={{ 
          p: 2, 
          background: "#1e1e2e",
          border: '1px solid #2a2a3e',
          borderRadius: 1.5,
          textAlign: 'center'
        }}>
          <Button
            variant="outlined"
            startIcon={<Logout sx={{ fontSize: 18 }} />}
            onClick={handleLogout}
            sx={{ 
              px: 3, py: 1, 
              fontSize: 14, fontWeight: 600,
              border: '1px solid #475569',
              color: '#f1f5f9',
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: "#2a2a3e",
                borderColor: '#64748b',
                transform: 'scale(1.02)'
              }
            }}
          >
            Logout
          </Button>
        </Card>
      </Box>
    </ProtectedRoute>
  );
}



