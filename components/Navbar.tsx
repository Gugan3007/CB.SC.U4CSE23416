"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface NavbarProps {
  
  unreadCount: number;
}

const NAV_LINKS = [
  { label: "All Notifications", path: "/" },
  { label: "Priority Inbox", path: "/priority" },
];

export default function Navbar({ unreadCount }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(3, 7, 18, 0.65)", 
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ height: 72, px: { xs: 2, sm: 4, md: 6 }, display: 'flex', justifyContent: 'space-between' }}>
          
          {}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff" }}>
                N
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(to right, #f8fafc, #94a3b8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: { xs: "none", sm: "block" },
              }}
            >
              CampusNotify
            </Typography>
          </Box>

          {}
          <Box sx={{ display: { xs: "none", md: "flex" }, height: "100%", alignItems: "center", gap: 1 }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;

              
              const linkContent = (
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    cursor: "pointer",
                    textDecoration: "none",
                    color: isActive ? "#f8fafc" : "rgba(255,255,255,0.6)",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "#f8fafc",
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: isActive ? 600 : 500, fontSize: "0.95rem" }}>
                    {link.label}
                  </Typography>

                  {}
                  {isActive && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        boxShadow: "0 -2px 10px rgba(99,102,241,0.4)",
                      }}
                    />
                  )}
                </Box>
              );

              
              return (
                <Link href={link.path} key={link.path} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  {link.label === "Priority Inbox" ? (
                    <Badge
                      badgeContent={unreadCount}
                      color="error"
                      sx={{
                        height: "100%",
                        "& .MuiBadge-badge": {
                          top: 24,
                          right: 12,
                          fontWeight: 800,
                          boxShadow: "0 0 10px rgba(244,63,94,0.6)",
                        },
                      }}
                    >
                      {linkContent}
                    </Badge>
                  ) : (
                    linkContent
                  )}
                </Link>
              );
            })}
          </Box>

          {}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "#f8fafc" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "rgba(3, 7, 18, 0.95)",
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#f8fafc" }}>
            CampusNotify
          </Typography>
        </Box>
        <List sx={{ p: 2 }}>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <ListItem key={link.path} disablePadding sx={{ mb: 1 }}>
                <Link href={link.path} style={{ textDecoration: "none", width: "100%" }} onClick={handleDrawerToggle}>
                  <ListItemButton
                    sx={{
                      borderRadius: "10px",
                      background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                      border: isActive ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#818cf8" : "#f8fafc",
                          }}
                        >
                          {link.label}
                        </Typography>
                      }
                    />
                    {link.label === "Priority Inbox" && unreadCount > 0 && (
                      <Box
                        sx={{
                          background: "#f43f5e",
                          color: "#fff",
                          borderRadius: "12px",
                          px: 1.5,
                          py: 0.5,
                          fontSize: "0.75rem",
                          fontWeight: 800,
                        }}
                      >
                        {unreadCount}
                      </Box>
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
