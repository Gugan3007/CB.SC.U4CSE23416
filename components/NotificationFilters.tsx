"use client";

import React from "react";
import { Box, Button, Typography, CircularProgress, IconButton, Tooltip } from "@mui/material";
import type { NotificationType } from "@/lib/types";

interface NotificationFiltersProps {
  activeFilter: NotificationType | "";
  onFilterChange: (filter: NotificationType | "") => void;
  unreadCount: number;
  totalCount: number;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
  loading: boolean;
}

export default function NotificationFilters({
  activeFilter,
  onFilterChange,
  unreadCount,
  totalCount,
  onMarkAllAsRead,
  onRefresh,
  loading,
}: NotificationFiltersProps) {
  const FILTERS: { label: string; value: NotificationType | "" }[] = [
    { label: "All", value: "" },
    { label: "Event", value: "Event" },
    { label: "Result", value: "Result" },
    { label: "Placement", value: "Placement" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: 2,
        mb: 4,
        p: 1,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      {}
      <Box
        sx={{
          display: "flex",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "12px",
          p: 0.5,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <Box
              key={f.label}
              onClick={() => onFilterChange(f.value)}
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1,
                px: { xs: 1, sm: 2 },
                cursor: "pointer",
                position: "relative",
                zIndex: 1,
                borderRadius: "10px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.85rem",
                ...(isActive && {
                  background: "rgba(99, 102, 241, 0.2)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }),
                ...(!isActive && {
                  "&:hover": { color: "rgba(255,255,255,0.8)" },
                  border: "1px solid transparent",
                }),
              }}
            >
              {f.label}
            </Box>
          );
        })}
      </Box>

      {}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1.5, px: { xs: 1, sm: 0 } }}>
        
        {}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mr: 1 }}>
          <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
            {totalCount} Total
          </Typography>
          {unreadCount > 0 && (
            <Typography sx={{ fontSize: "0.7rem", color: "#f43f5e", fontWeight: 800 }}>
              {unreadCount} Unread
            </Typography>
          )}
        </Box>

        {}
        <Button
          variant="outlined"
          size="small"
          onClick={onMarkAllAsRead}
          disabled={unreadCount === 0 || loading}
          sx={{
            borderColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.75rem",
            py: 0.5,
            px: 1.5,
            "&:hover": {
              borderColor: "rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.05)",
            },
            "&:disabled": {
              borderColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.2)",
            },
          }}
        >
          Mark All Read
        </Button>

        {}
        <Tooltip title="Refresh Notifications" arrow placement="top">
          <IconButton
            onClick={onRefresh}
            disabled={loading}
            size="small"
            sx={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              "&:hover": { background: "rgba(255,255,255,0.1)" },
            }}
          >
            {loading ? (
              <CircularProgress size={16} thickness={5} sx={{ color: "#818cf8" }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.67-1.36" />
              </svg>
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
