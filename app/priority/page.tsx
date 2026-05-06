'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Alert,
  AlertTitle,
  Button,
} from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import { useNotifications } from '@/hooks/useNotifications';
import { usePriorityInbox } from '@/hooks/usePriorityInbox';
import { Log } from '@/lib/logger';

export default function PriorityInboxPage() {
  Log('frontend', 'info', 'page', 'PriorityInboxPage mounted');

    const { notifications, loading, error, markAsRead, refetch } = useNotifications({
    limit: 200, 
    page: 1,
  });

    const { priorityNotifications, topN, setTopN } = usePriorityInbox(notifications, 10);
  const LIMIT_OPTIONS: import("@/lib/types").TopNOption[] = [10, 15, 20];

      
  if (loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
        <Skeleton variant="rectangular" height={90} sx={{ borderRadius: '16px', mb: 4, bgcolor: 'rgba(255,255,255,0.03)' }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={110} sx={{ borderRadius: '16px', mb: 2, bgcolor: 'rgba(255,255,255,0.02)' }} />
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
    <Box id="priority-inbox-page" sx={{ px: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
      
      {}
      <Box className="animate-slide-up" sx={{ mb: 4, mt: 2, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f59e0b' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Priority Inbox
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', fontWeight: 500 }}>
          Your most important updates, ranked intelligently.
        </Typography>
      </Box>

      {}
      <Box className="animate-slide-up delay-100" sx={{ mb: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            p: 2,
            gap: 3,
          }}
        >
          {}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.85rem', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Scoring Weights
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600 }}>PLACEMENT</Typography>
                <Typography sx={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: 800 }}>80%</Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600 }}>RESULT</Typography>
                <Typography sx={{ color: '#60a5fa', fontSize: '0.9rem', fontWeight: 800 }}>50%</Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600 }}>EVENT</Typography>
                <Typography sx={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 800 }}>20%</Typography>
              </Box>
            </Box>
          </Box>

          {}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '1px', height: 60, background: 'rgba(255,255,255,0.1)' }} />

          {}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-end' } }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, mb: 1 }}>
              SHOW TOP
            </Typography>
            <Box
              sx={{
                display: 'flex',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                p: 0.5,
              }}
            >
              {LIMIT_OPTIONS.map((opt) => {
                const isActive = topN === opt;
                return (
                  <Box
                    key={opt}
                    onClick={() => setTopN(opt)}
                    sx={{
                      width: 40,
                      textAlign: 'center',
                      py: 0.75,
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.85rem',
                      ...(isActive && {
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)',
                      }),
                      ...(!isActive && {
                        '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.05)' },
                      }),
                    }}
                  >
                    {opt}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>

      {}
      {priorityNotifications.length === 0 && (
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
              background: 'rgba(245, 158, 11, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              boxShadow: '0 8px 32px rgba(245, 158, 11, 0.15)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </Box>
          <Typography sx={{ color: '#f8fafc', fontWeight: 800, fontSize: '1.25rem', mb: 1, letterSpacing: '-0.01em' }}>
            Zero Priority Alerts
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: 300, mx: 'auto' }}>
            You have no unread notifications to rank. Check back when new alerts arrive.
          </Typography>
        </Box>
      )}

      {}
      <Box id="priority-list">
        {priorityNotifications.map((ranked, index) => (
          <NotificationCard
            key={ranked.ID}
            notification={ranked}
            onMarkAsRead={markAsRead}
            priorityScore={ranked.priorityScore}
            rank={index + 1}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );

}
