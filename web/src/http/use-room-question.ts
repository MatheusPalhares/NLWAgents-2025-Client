import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`/api/rooms/${roomId}/questions`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result: GetRoomQuestionsResponse = await response.json()
      return result
    },
  })
}
