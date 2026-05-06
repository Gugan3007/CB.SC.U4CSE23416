import { Log } from "./logger";
import type { Notification, NotificationType, PrioritizedNotification } from "./types";

export const TYPE_WEIGHTS: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const WEIGHT_FACTOR = 0.6;

const RECENCY_FACTOR = 0.4;

function parseTimestamp(timestamp: string): Date {
  try {
    
    const isoString = timestamp.replace(" ", "T");
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      Log("frontend", "warn", "utils", `Invalid timestamp format: "${timestamp}" — defaulting to epoch`);
      return new Date(0);
    }

    return date;
  } catch {
    Log("frontend", "warn", "utils", `Failed to parse timestamp: "${timestamp}"`);
    return new Date(0);
  }
}

export function calculatePriorityScores(
  notifications: Notification[]
): PrioritizedNotification[] {
  Log("frontend", "info", "utils", `Calculating priority scores for ${notifications.length} notifications`);

  if (notifications.length === 0) {
    Log("frontend", "debug", "utils", "No notifications to prioritize — returning empty array");
    return [];
  }

  
  const MAX_TYPE_WEIGHT = Math.max(...Object.values(TYPE_WEIGHTS));

  
  const withDates = notifications.map((n) => ({
    notification: n,
    date: parseTimestamp(n.Timestamp),
    dateMs: parseTimestamp(n.Timestamp).getTime(),
  }));

  
  const allTimestampsMs = withDates.map((n) => n.dateMs);
  const oldestMs = Math.min(...allTimestampsMs);
  const newestMs = Math.max(...allTimestampsMs);
  const timeRange = newestMs - oldestMs;

  Log("frontend", "debug", "utils", `Timestamp range: ${new Date(oldestMs).toISOString()} to ${new Date(newestMs).toISOString()}`);

  
  const prioritized: PrioritizedNotification[] = withDates.map(({ notification, dateMs }) => {
    const typeWeight = TYPE_WEIGHTS[notification.Type] ?? 1;

    
    const normalizedWeight = typeWeight / MAX_TYPE_WEIGHT;

    
    
    const normalizedRecency = timeRange === 0 ? 1 : (dateMs - oldestMs) / timeRange;

    
    const priorityScore =
      normalizedWeight * WEIGHT_FACTOR + normalizedRecency * RECENCY_FACTOR;

    Log(
      "frontend",
      "debug",
      "utils",
      `[${notification.ID.slice(0, 8)}] type=${notification.Type} weight=${normalizedWeight.toFixed(2)} recency=${normalizedRecency.toFixed(2)} score=${priorityScore.toFixed(4)}`
    );

    return { ...notification, priorityScore };
  });

  
  prioritized.sort((a, b) => b.priorityScore - a.priorityScore);

  Log("frontend", "info", "utils", "Priority scoring complete — top notification: " + (prioritized[0]?.Message ?? "N/A"));

  return prioritized;
}

export function getTopNPriority(
  notifications: Notification[],
  n: number
): PrioritizedNotification[] {
  Log("frontend", "info", "utils", `getTopNPriority called: n=${n}, total=${notifications.length}`);

  
  const unread = notifications.filter((n) => !n.isRead);
  Log("frontend", "debug", "utils", `Unread notifications: ${unread.length}`);

  if (unread.length === 0) {
    Log("frontend", "info", "utils", "No unread notifications found for priority inbox");
    return [];
  }

  const scored = calculatePriorityScores(unread);
  const topN = scored.slice(0, n);

  Log("frontend", "info", "utils", `Returning top ${topN.length} prioritized notifications`);
  return topN;
}
