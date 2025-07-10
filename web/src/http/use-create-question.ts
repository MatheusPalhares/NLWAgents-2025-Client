import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { createQuestionRequest } from './types/create-question-request'
import type { createQuestionResponse } from './types/create-question-response'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: createQuestionRequest) => {
      const response = await fetch(`/api/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create room')
      }

      const result: createQuestionResponse = await response.json()

      return result
    },

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-questions',
        roomId,
      ])
      const questionsArray = questions ?? []
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      )
      return { newQuestion, questions }
    },

    onSuccess(data, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          (questions) => {
            if (!questions) {
              return questions
            }
            if (!context.newQuestion) {
              return questions
            }
            return questions.map((question) => {
              if (question.id === context.newQuestion.id) {
                return {
                  ...context.newQuestion,
                  id: data.questionId,
                  answer: data.answer,
                  isGeneratingAnswer: false,
                }
              }

              return question
            })
          }
        )
      }
    },

    onError(_error_, _variables_, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
    // },
  })
}
