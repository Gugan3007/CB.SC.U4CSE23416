"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchNotifications } from "@/lib/api";
import { Log } from "@/lib/logger";
import type { Notification, NotificationType, FetchNotificationsParams } from "@/lib/types";

const READ_IDS_STORAGE_KEY = "campus_notifications_read_ids";

function loadReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_IDS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set<string>(parsed);
  } catch {
    Log("frontend", "warn", "hook", "Failed to load read IDs from localStorage — resetting");
    return new Set();
  }
}

function saveReadIds(ids: Set<string>): void {
  try {
    localStorage.setItem(READ_IDS_STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    Log("frontend", "warn", "hook", "Failed to save read IDs to localStorage");
  }
}

export interface UseNotificationsReturn {
  
  notifications: Notification[];
  
  loading: boolean;
  
  error: string | null;
  
  markAsRead: (id: string) => void;
  
  markAllAsRead: () => void;
  
  refetch: () => void;
  
  unreadCount: number;
}

export interface UseNotificationsOptions {
  
  limit?: number;
  
  page?: number;
  
  notificationType?: NotificationType | "";
}

export function useNotifications(
  options: UseNotificationsOptions = {}
): UseNotificationsReturn {
  const { limit = 100, page = 1, notificationType = "" } = options;

  Log("frontend", "debug", "hook", `useNotifications mounted with limit=${limit}, page=${page}, type=${notificationType || "all"}`);

      
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const isMountedRef = useRef<boolean>(true);

    
  
  const fetchData = useCallback(async () => {
    Log("frontend", "info", "hook", "Initiating notification fetch");
    setLoading(true);
    setError(null);

    
    const params: FetchNotificationsParams = { limit, page };
    if (notificationType) {
      params.notification_type = notificationType as NotificationType;
    }

    try {
      const data = await fetchNotifications(params);

      if (!isMountedRef.current) {
        Log("frontend", "debug", "hook", "Component unmounted before fetch completed — skipping state update");
        return;
      }

      
      const readIds = loadReadIds();
      Log("frontend", "debug", "hook", `Loaded ${readIds.size} read IDs from localStorage`);

      
      const enriched: Notification[] = data.notifications.map((n) => ({
        ...n,
        isRead: readIds.has(n.ID),
      }));

      setNotifications(enriched);
      Log("frontend", "info", "hook", `State updated with ${enriched.length} notifications`);
    } catch (err) {
      if (!isMountedRef.current) return;

      const message = err instanceof Error ? err.message : "Unknown error occurred";
      Log("frontend", "error", "hook", `Fetch failed: ${message}`);
      setError(message);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [limit, page, notificationType]);

    
  
  
  useEffect(() => {
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      Log("frontend", "debug", "hook", "useNotifications cleanup — component unmounted");
    };
  }, [fetchData]);

    
  
  
  const markAsRead = useCallback((id: string) => {
    Log("frontend", "info", "hook", `Marking notification as read: ${id}`);

    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.ID === id ? { ...n, isRead: true } : n
      );

      
      const readIds = new Set(updated.filter((n) => n.isRead).map((n) => n.ID));
      saveReadIds(readIds);

      return updated;
    });
  }, []);

  
  const markAllAsRead = useCallback(() => {
    Log("frontend", "info", "hook", "Marking all notifications as read");

    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, isRead: true }));
      const readIds = new Set(updated.map((n) => n.ID));
      saveReadIds(readIds);
      return updated;
    });
  }, []);

    
  
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refetch: fetchData,
    unreadCount,
  };
}
