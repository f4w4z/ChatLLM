'use client';

import dynamic from 'next/dynamic';

const ChatPage = dynamic(() => import('@/components/chat-page'), { ssr: false });

export default function Home() {
  return <ChatPage />;
}
