import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Message,
  MessagesResponse,
  MessageResponse,
  DeleteResponse,
  CreateMessageRequest,
  UpdateMessageRequest,
} from '@/types/message.types';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => '/messages',
      transformResponse: (response: MessagesResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Message' as const, id })),
              { type: 'Message', id: 'LIST' },
            ]
          : [{ type: 'Message', id: 'LIST' }],
    }),
    
    createMessage: builder.mutation<Message, CreateMessageRequest>({
      query: (body) => ({
        url: '/messages',
        method: 'POST',
        body,
      }),
      transformResponse: (response: MessageResponse) => response.data,
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),
    
    updateMessage: builder.mutation<Message, UpdateMessageRequest>({
      query: ({ id, message }) => ({
        url: `/messages/${id}`,
        method: 'PUT',
        body: { message },
      }),
      transformResponse: (response: MessageResponse) => response.data,
      invalidatesTags: (result, error, { id }) => [{ type: 'Message', id }],
    }),
    
    deleteMessage: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteResponse) => response.data,
      invalidatesTags: (result, error, id) => [{ type: 'Message', id }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;