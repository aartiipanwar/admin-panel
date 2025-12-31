"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, Typography, TextField, Button, Box } from "@mui/material";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description?: string;
  category: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;
      if (search.trim()) url = `https://dummyjson.com/products/search?q=${search.trim()}&limit=${LIMIT}`;
      else if (category) url = `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, category, skip]);

  useEffect(() => { getProducts(); }, [getProducts]);

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
        borderLeft: "4px solid #10b981",
        pl: 2
      }}>
        Products
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search products..."
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
          onClick={() => { setSkip(0); getProducts(); }} 
          sx={{ 
            background: "#10b981",
            borderRadius: 1.5,
            textTransform: 'none',
            '&:hover': { background: "#059669" }
          }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {products.map((product) => (
          <Card key={product.id} sx={{ 
            width: 240, 
            background: "#1e1e2e",
            border: '1px solid #2a2a3e',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 30px rgba(16,185,129,0.2)'
            }
          }}>
            <Box sx={{ height: 140, overflow: 'hidden' }}>
              <img 
                src={product.thumbnail} 
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 1, fontWeight: 600 }}>
                {product.title}
              </Typography>
              <Typography sx={{ color: '#10b981', fontWeight: 700, fontSize: 18, mb: 1 }}>
                ₹{product.price}
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>
                {product.category}
              </Typography>
              <Link href={`/products/${product.id}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                View →
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

