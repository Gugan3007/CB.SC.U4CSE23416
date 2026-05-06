"use client";

import { useState, useMemo } from "react";
import { getTopNPriority } from "@/lib/priorityUtils";
import { Log } from "@/lib/logger";
import type { Notification, PrioritizedNotification, TopNOption } from "@/lib/types";

export interface UsePriorityInboxReturn {
  
  priorityNotifications: PrioritizedNotification[];
  
  topN: TopNOption;
  
  setTopN: (n: TopNOption) => void;
  
  totalUnread: number;
}

export function usePriorityInbox(
  notifications: Notification[],
  defaultTopN: TopNOption = 10
): UsePriorityInboxReturn {
  Log("frontend", "debug", "hook", `usePriorityInbox initialized with ${notifications.length} notifications, defaultTopN=${defaultTopN}`);

      
  const [topN, setTopNState] = useState<TopNOption>(defaultTopN);

    
  
  
  const setTopN = (n: TopNOption) => {
    Log("frontend", "info", "hook", `Priority inbox top-N changed to ${n}`);
    setTopNState(n);
  };

      
  const totalUnread = useMemo(() => {
    const count = notifications.filter((n) => !n.isRead).length;
    Log("frontend", "debug", "hook", `Total unread notifications: ${count}`);
    return count;
  }, [notifications]);

      
  
  
  
  const priorityNotifications = useMemo(() => {
    Log("frontend", "info", "hook", `Recalculating priority inbox for top ${topN} unread notifications`);

    if (notifications.length === 0) {
      Log("frontend", "debug", "hook", "No notifications available for priority inbox");
      return [];
    }

    const result = getTopNPriority(notifications, topN);
    Log("frontend", "info", "hook", `Priority inbox computed: ${result.length} items`);
    return result;
  }, [notifications, topN]);

  return {
    priorityNotifications,
    topN,
    setTopN,
    totalUnread,
  };
}
