import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createRoomRequest } from './types/create-room-request'
import type { CreateRoomResponse } from './types/create-room-response'

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: createRoomRequest) => {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create room')
      }

      const result: CreateRoomResponse = await response.json()

      return result
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  })
}
