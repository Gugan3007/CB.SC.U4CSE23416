# Stage 1

## Priority Inbox Approach & Logic
The priority inbox is designed to identify and surface the most critical unread notifications efficiently. Priority determination relies on a dual-metric scoring system: Event Type Weight and Recency.

### Scoring Algorithm
1. **Type Weighting (60% influence)**:
   - Placement: 3 (Highest importance)
   - Result: 2
   - Event: 1 (Lowest importance)
   
   The type score is calculated as `Weight / Max Weight (3) * 0.6`. This ensures critical placement updates always bubble toward the top.

2. **Recency (40% influence)**:
   - Using the timestamps from the API, we calculate the age of the notification.
   - We determine the maximum age among all unread notifications to act as a normalizer.
   - Recency score is calculated as `(1 - (age / maxAge)) * 0.4`. This guarantees that newer notifications receive a slight edge within the same weight category.

### Execution
- We fetch the notifications and filter for only `unread` items locally since the API does not natively track read states. 
- The resulting unread array is then mapped to include the computed composite priority score (`Type Score + Recency Score`).
- Finally, the array is sorted in descending order based on the composite score and sliced to yield the top `N` notifications (where `N` is dynamically adjustable between 10, 15, or 20 per user preference).

This O(n log n) sorting approach efficiently ranks the notifications on the client side without relying on complex backend database queries, fully satisfying the constraints.

## Application Architecture & Constraints
- **Logging**: Console logging has been avoided entirely. A bespoke `Log` middleware utility is used globally for tracing application behavior.
- **Styling**: The application utilizes Material UI components with minimal inline structural CSS, conforming to the requirement of not using ShadCN or external CSS frameworks.
- **Port Constraints**: The Next.js development server is locked to port 3000 to maintain required conformity.
