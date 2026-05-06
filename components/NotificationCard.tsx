"use client";

import React, { useCallback } from "react";
import { Card, CardContent, Typography, Chip, Box, Tooltip } from "@mui/material";
import { Log } from "@/lib/logger";
import type { Notification, NotificationType } from "@/lib/types";

const TYPE_COLORS: Record<NotificationType, { bg: string; text: string; border: string; glow: string }> = {
  Placement: { bg: "linear-gradient(135deg, #7c3aed, #4f46e5)", text: "#ffffff", border: "#5b21b6", glow: "rgba(124, 58, 237, 0.4)" },
  Result:    { bg: "linear-gradient(135deg, #0ea5e9, #2563eb)", text: "#ffffff", border: "#1e40af", glow: "rgba(14, 165, 233, 0.4)" },
  Event:     { bg: "linear-gradient(135deg, #10b981, #059669)", text: "#ffffff", border: "#047857", glow: "rgba(16, 185, 129, 0.4)" },
};

const BORDER_ACCENT: Record<NotificationType, string> = {
  Placement: "#8b5cf6", 
  Result:    "#3b82f6", 
  Event:     "#10b981", 
};

function formatTimestamp(timestamp: string): string {
  try {
    const isoString = timestamp.replace(" ", "T");
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return timestamp;

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timestamp;
  }
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  priorityScore?: number;
  rank?: number;
  
  index?: number;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  priorityScore,
  rank,
  index = 0,
}) => {
  const { ID, Type, Message, Timestamp, isRead } = notification;
  const typeColors = TYPE_COLORS[Type] ?? TYPE_COLORS.Event;
  const accentColor = BORDER_ACCENT[Type] ?? BORDER_ACCENT.Event;

  
  const delayClass = `delay-${Math.min(index * 100, 900)}`;

  const handleClick = useCallback(() => {
    if (!isRead) {
      Log("frontend", "info", "component", `Card clicked — marking as read: ${ID}`);
      onMarkAsRead(ID);
    }
  }, [ID, isRead, onMarkAsRead]);

  return (
    <Tooltip title={isRead ? "Already read" : "Click to mark as read"} placement="top" arrow>
      <Card
        className={`animate-slide-up ${delayClass}`}
        id={`notification-card-${ID}`}
        onClick={handleClick}
        elevation={0}
        sx={{
          
          opacity: 0,
          transform: "translateY(20px)",
          animationFillMode: "forwards",

          
          borderRadius: "16px",
          cursor: isRead ? "default" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          mb: 2,
          position: "relative",
          overflow: "visible", 

          
          background: isRead
            ? "rgba(255,255,255,0.02)"
            : "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(16px)",
          border: isRead
            ? "1px solid rgba(255,255,255,0.03)"
            : "1px solid rgba(255,255,255,0.1)",
          
          
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: isRead ? "3px" : "4px",
            background: isRead ? "rgba(255,255,255,0.1)" : accentColor,
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            transition: "all 0.3s ease",
            boxShadow: isRead ? "none" : `0 0 12px ${typeColors.glow}`,
          },

          
          "&:hover": {
            transform: isRead ? "none" : "translateY(-4px)",
            boxShadow: isRead ? "none" : `0 12px 24px -10px ${typeColors.glow}`,
            background: isRead
              ? "rgba(255,255,255,0.03)"
              : "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
            borderColor: isRead ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.15)",
            "&::before": {
              boxShadow: isRead ? "none" : `0 0 20px ${typeColors.glow}`,
            }
          },
        }}
      >
        <CardContent sx={{ py: 2.5, px: 3, "&:last-child": { pb: 2.5 } }}>
          
          {}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              
              {}
              {rank !== undefined && (
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: "#fff" }}>
                    #{rank}
                  </Typography>
                </Box>
              )}

              {}
              <Chip
                label={Type}
                size="small"
                sx={{
                  background: typeColors.bg,
                  color: typeColors.text,
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  height: 24,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: `0 2px 8px ${typeColors.glow}`,
                  border: "none",
                }}
              />

              {}
              {!isRead && (
                <Box
                  className="sonar-ping"
                  sx={{
                    position: "relative",
                    background: "#f43f5e",
                    borderRadius: "6px",
                    px: 1,
                    py: 0.25,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                    NEW
                  </Typography>
                </Box>
              )}

              {}
              {priorityScore !== undefined && (
                <Chip
                  label={`Score: ${(priorityScore * 100).toFixed(0)}`}
                  size="small"
                  sx={{
                    background: "rgba(245,158,11,0.1)",
                    color: "#fbbf24",
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    height: 22,
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                />
              )}
            </Box>

            {}
            <Typography
              variant="caption"
              sx={{
                color: isRead ? "rgba(255,255,255,0.3)" : "rgba(148, 163, 184, 0.9)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {formatTimestamp(Timestamp)}
            </Typography>
          </Box>

          {}
          <Typography
            variant="body1"
            sx={{
              color: isRead ? "rgba(255,255,255,0.4)" : "#f8fafc",
              fontWeight: isRead ? 400 : 500,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
            }}
          >
            {Message}
          </Typography>

        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default NotificationCard;
