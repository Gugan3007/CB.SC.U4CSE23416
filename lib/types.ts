

export type NotificationType = "Event" | "Result" | "Placement";

export interface ApiNotification {
  
  ID: string;
  
  Type: NotificationType;
  
  Message: string;
  
  Timestamp: string;
}

export interface NotificationsApiResponse {
  notifications: ApiNotification[];
}

export interface Notification extends ApiNotification {
  
  isRead: boolean;
}

export interface FetchNotificationsParams {
  
  limit?: number;
  
  page?: number;
  
  notification_type?: NotificationType | "";
}

export interface PrioritizedNotification extends Notification {
  
  priorityScore: number;
}

export type TopNOption = 10 | 15 | 20;
