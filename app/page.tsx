'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import NotificationFilters from '@/components/NotificationFilters';
import { useNotifications } from '@/hooks/useNotifications';
import { Log } from '@/lib/logger';
import type { NotificationType } from '@/lib/types';

export default function AllNotificationsPage() {
  Log('frontend', 'info', 'page', 'AllNotificationsPage mounted');

  const [activeFilter, setActiveFilter] = useState<NotificationType | ''>('');

  const { notifications, loading, error, markAsRead, markAllAsRead, refetch, unreadCount } =
    useNotifications({
      limit: 100,
      page: 1,
      notificationType: activeFilter,
    });

  const handleFilterChange = useCallback((filter: NotificationType | '') => {
    Log('frontend', 'info', 'page', `AllNotificationsPage: filter changed to "${filter || 'all'}"`);
    setActiveFilter(filter);
  }, []);

  const handleMarkAsRead = useCallback(
    (id: string) => {
      Log('frontend', 'info', 'page', `AllNotificationsPage: marking notification read: ${id}`);
      markAsRead(id);
    },
    [markAsRead]
  );

  const { unreadNotifications, readNotifications } = useMemo(() => {
    const unread = notifications.filter((n) => !n.isRead);
    const read = notifications.filter((n) => n.isRead);
    return { unreadNotifications: unread, readNotifications: read };
  }, [notifications]);

      
  if (loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
        <Skeleton
          variant="rectangular"
          height={72}
          sx={{ borderRadius: '16px', mb: 4, bgcolor: 'rgba(255,255,255,0.03)' }}
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={110}
            sx={{ borderRadius: '16px', mb: 2, bgcolor: 'rgba(255,255,255,0.02)' }}
          />
        ))}
      </Box>
    );
  }

      
  if (error) {
    return (
      <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: '16px',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            color: '#fda4af',
            '& .MuiAlert-icon': { color: '#f43f5e' },
          }}
          action={
            <Button color="inherit" size="small" onClick={refetch} sx={{ fontWeight: 700 }}>
              Retry
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 800, color: '#f43f5e' }}>Connection Failed</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

      
  return (
    <Box id="all-notifications-page" sx={{ px: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
      
      {}
      <Box className="animate-slide-up" sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Inbox
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', fontWeight: 500 }}>
          Your central hub for campus updates and alerts.
        </Typography>
      </Box>

      {}
      <Box className="animate-slide-up delay-100">
        <NotificationFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          unreadCount={unreadCount}
          totalCount={notifications.length}
          onMarkAllAsRead={markAllAsRead}
          onRefresh={refetch}
          loading={loading}
        />
      </Box>

      {}
      {notifications.length === 0 && (
        <Box
          className="animate-slide-up delay-200"
          sx={{
            textAlign: 'center',
            py: 12,
            px: 4,
            borderRadius: '24px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
            border: '1px solid rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
              borderRadius: '24px',
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </Box>
          <Typography sx={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.25rem', mb: 1, letterSpacing: '-0.01em' }}>
            All Caught Up
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: 300, mx: 'auto' }}>
            {activeFilter
              ? `There are no new ${activeFilter.toLowerCase()} notifications at the moment.`
              : "You have no notifications. We'll alert you when something happens."}
          </Typography>
        </Box>
      )}

      {}
      {unreadNotifications.length > 0 && (
        <Box id="section-unread" sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, pl: 1 }}>
            <Typography
              sx={{
                color: '#f8fafc',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              New
            </Typography>
            <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />
          </Box>

          {unreadNotifications.map((notification, index) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              index={index}
            />
          ))}
        </Box>
      )}

      {}
      {readNotifications.length > 0 && (
        <Box id="section-read">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, pl: 1 }}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.3)',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Earlier
            </Typography>
            <Box sx={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.05), transparent)' }} />
          </Box>

          {readNotifications.map((notification, index) => (
            <NotificationCard
              key={notification.ID}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              
              index={unreadNotifications.length + index}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
