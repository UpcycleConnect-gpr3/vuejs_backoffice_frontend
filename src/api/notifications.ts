import { http } from '@/api/http'

export function sendNotification(
  userId: string,
  title: string,
  body: string,
): Promise<{ id: number }> {
  return http<{ id: number }>('upcycle', '/notifications', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, title, body }),
  })
}
