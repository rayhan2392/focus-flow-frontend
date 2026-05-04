"use client";

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

// 1. Define the client creation logic
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Data stays fresh for 1 minute
        refetchOnWindowFocus: false, // Don't refetch just because the user switched tabs
        retry: 1, // Retry failed requests once before showing an error
      },
    },
  });
}

// 2. Safely store the client for the browser
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: Always make a new query client so user data never leaks
    return makeQueryClient();
  } else {
    // Browser: Make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  // 3. Initialize the client using our safe function
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* This adds a helpful debugging widget in the bottom corner during development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}