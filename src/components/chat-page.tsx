'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat-interface';
import type { ChatSettings, Message } from '@/app/actions';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 0.7,
    responseLength: 'medium',
    responseStyle: 'casual',
  });
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex-1">
      <ChatInterface
        messages={messages}
        setMessages={setMessages}
        settings={settings}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
