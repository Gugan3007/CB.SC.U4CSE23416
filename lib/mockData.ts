import { Log } from "./logger";
import type { NotificationsApiResponse, NotificationType } from "./types";

const MOCK_NOTIFICATIONS = [
  
  {
    ID: "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
    Type: "Placement" as NotificationType,
    Message: "CSX Corporation is hiring — Apply before May 15",
    Timestamp: "2026-05-06 12:30:00",
  },
  {
    ID: "8a7412bd-6065-4d09-8501-a37f11cc848b",
    Type: "Placement" as NotificationType,
    Message: "Advanced Micro Devices Inc. (AMD) campus drive — 50 openings",
    Timestamp: "2026-05-06 11:00:00",
  },
  {
    ID: "c1a9f820-3b4e-4d22-a6c7-f12b9a3e5d01",
    Type: "Placement" as NotificationType,
    Message: "Google SWE Internship 2026 — Registration open",
    Timestamp: "2026-05-06 09:45:00",
  },
  {
    ID: "f2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d",
    Type: "Placement" as NotificationType,
    Message: "Microsoft Hiring Drive — B.Tech CSE/IT only",
    Timestamp: "2026-05-05 18:00:00",
  },
  
  {
    ID: "d146895a-0d86-4a34-9e69-3900a14576bc",
    Type: "Result" as NotificationType,
    Message: "Mid-semester exam results published — Check student portal",
    Timestamp: "2026-05-06 10:00:00",
  },
  {
    ID: "003cb427-8fc6-47f7-bb00-be228f6b0d2c",
    Type: "Result" as NotificationType,
    Message: "Advarna project results declared — Top 3 teams announced",
    Timestamp: "2026-05-06 08:30:00",
  },
  {
    ID: "ea836726-c25e-4f21-a72f-544a6af8a37f",
    Type: "Result" as NotificationType,
    Message: "Project-review evaluation scores released for Batch 2022-26",
    Timestamp: "2026-05-05 17:00:00",
  },
  {
    ID: "e5c4ff20-31bf-4d48-8f02-72fda59e8918",
    Type: "Result" as NotificationType,
    Message: "Hackathon 2026 results — Winners to receive certificates",
    Timestamp: "2026-05-05 14:20:00",
  },
  {
    ID: "cf2885a6-45ac-4ba8-b548-6e9e9d4c52c8",
    Type: "Result" as NotificationType,
    Message: "Semester 6 supplementary exam results available",
    Timestamp: "2026-05-04 16:00:00",
  },
  
  {
    ID: "81589ada-0ad3-4f77-9554-f52fb558e09d",
    Type: "Event" as NotificationType,
    Message: "Farewell ceremony for Batch 2022-26 — May 20 at Main Auditorium",
    Timestamp: "2026-05-06 08:00:00",
  },
  {
    ID: "1cfce5ee-ad37-4894-8946-d70762716a5",
    Type: "Event" as NotificationType,
    Message: "Tech-Fest 2026 registrations open — 12 competitive events",
    Timestamp: "2026-05-05 12:00:00",
  },
  {
    ID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    Type: "Event" as NotificationType,
    Message: "Workshop on AI & ML — Dr. Priya Sharma, May 18, Room 301",
    Timestamp: "2026-05-05 10:30:00",
  },
  {
    ID: "b9c8d7e6-f5a4-3210-9876-543210fedcba",
    Type: "Event" as NotificationType,
    Message: "Cultural night 'Utsav 2026' — Registrations close May 12",
    Timestamp: "2026-05-04 14:00:00",
  },
  {
    ID: "c7d6e5f4-a3b2-1098-7654-321098fedcba",
    Type: "Event" as NotificationType,
    Message: "Blood donation camp by Red Cross — May 10, Sports Complex",
    Timestamp: "2026-05-04 09:00:00",
  },
  {
    ID: "d5e4f3a2-b1c0-9876-5432-109876543210",
    Type: "Event" as NotificationType,
    Message: "Annual sports day 2026 — Registrations open for all branches",
    Timestamp: "2026-05-03 15:00:00",
  },
];

export function getMockNotifications(
  limit = 100,
  page = 1,
  notification_type?: NotificationType | ""
): NotificationsApiResponse {
  Log("frontend", "info", "utils", `getMockNotifications: limit=${limit}, page=${page}, type=${notification_type || "all"}`);

  let filtered = [...MOCK_NOTIFICATIONS];

  
  if (notification_type) {
    filtered = filtered.filter((n) => n.Type === notification_type);
    Log("frontend", "debug", "utils", `Mock filter applied: ${filtered.length} ${notification_type} remaining`);
  }

  
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  Log("frontend", "info", "utils", `getMockNotifications returning ${paginated.length} notifications`);

  return { notifications: paginated };
}
