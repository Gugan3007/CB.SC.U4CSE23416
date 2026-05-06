import { Log } from "./logger";
import { USE_MOCK_DATA } from "./config";
import { getMockNotifications } from "./mockData";
import type { FetchNotificationsParams, NotificationsApiResponse } from "./types";

const API_BASE_URL = "/api";

export async function fetchNotifications(
  params: FetchNotificationsParams = {}
): Promise<NotificationsApiResponse> {
  Log("frontend", "info", "api", "fetchNotifications called: " + JSON.stringify(params));

    
  
  if (USE_MOCK_DATA) {
    Log("frontend", "info", "api", "USE_MOCK_DATA=true — returning mock notifications");

    
    await new Promise((resolve) => setTimeout(resolve, 400));

    return getMockNotifications(
      params.limit,
      params.page,
      params.notification_type
    );
  }

    
  
  const queryParams = new URLSearchParams();
  if (params.limit !== undefined) queryParams.set("limit", String(params.limit));
  if (params.page !== undefined) queryParams.set("page", String(params.page));
  if (params.notification_type) {
    queryParams.set("notification_type", params.notification_type);
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/notifications${queryString ? `?${queryString}` : ""}`;

  Log("frontend", "debug", "api", `Fetching via proxy: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      Log("frontend", "error", "api", `HTTP ${response.status} from proxy: ${errorText}`);
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data: NotificationsApiResponse = await response.json();
    Log("frontend", "info", "api", `Success — received ${data.notifications?.length ?? 0} notifications`);

    if (!data.notifications || !Array.isArray(data.notifications)) {
      Log("frontend", "warn", "api", "API response missing notifications array — returning empty");
      return { notifications: [] };
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      Log("frontend", "error", "api", `Network error: ${error.message}`);
    } else if (error instanceof Error) {
      Log("frontend", "error", "api", `fetchNotifications failed: ${error.message}`);
    } else {
      Log("frontend", "fatal", "api", "Unknown error in fetchNotifications");
    }
    throw error;
  }
}
