import {createApi} from '@reduxjs/toolkit/query/react';
import {customFetchBase} from './baseQuery';

export const user = createApi({
  reducerPath: 'user',
  baseQuery: customFetchBase,
  refetchOnReconnect: true,
  tagTypes: ['User'],
  endpoints: build => ({
    deleteMessages: build.mutation({
      query: body => {
        return {
          url: 'user/messages',
          method: 'DELETE',
          body,
        };
      },
    }),
    selectUserRedFlag: build.mutation({
      query: body => {
        return {
          url: 'user/red-flag',
          method: 'POST',
          body,
        };
      },
    }),
    selectUserInjury: build.mutation({
      query: body => {
        return {
          url: 'user/injury',
          method: 'POST',
          body,
        };
      },
    }),
    getUserMessages: build.query({
      query: params => {
        let endpoint = `user/messages?offset=${params?.offset}&limit=${params?.limit}`;

        console.log(
          `\n${new Date().toLocaleTimeString()} \n ~ file: user.api.ts:41 ~ endpoint:`,
          endpoint,
        );
        return {
          url: endpoint,
          method: 'GET',
        };
      },
    }),

    updateUserProfile: build.mutation({
      query: body => {
        console.log(
          `\n${new Date().toLocaleTimeString()} \n ~ file: user.api.ts:53 ~ body:`,
          body,
        );
        return {
          url: 'user/profile',
          method: 'PATCH',
          body,
        };
      },
    }),

    // Become a Sitter mutation
    becomeSitter: build.mutation<{ success: boolean; message: string; data?: { role: 'Booker' | 'Sitter' } }, void>({
      query: () => ({
        url: 'user/become-sitter', // Example endpoint
        method: 'POST',
        // body can be empty or include any necessary info if backend requires
      }),
      invalidatesTags: ['User'], // Invalidate User tag to refetch user data which includes the role
    }),
  }),
});

export const {
  useDeleteMessagesMutation,
  useSelectUserRedFlagMutation,
  useSelectUserInjuryMutation,
  useLazyGetUserMessagesQuery,
  useUpdateUserProfileMutation,
  useBecomeSitterMutation, // Export the new mutation
} = user;
