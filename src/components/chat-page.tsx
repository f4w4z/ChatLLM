'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat-interface';
import SettingsPanel from '@/components/settings-panel';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
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
    <SidebarProvider>
        <ChatInterface 
          messages={messages}
          setMessages={setMessages}
          settings={settings}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <Sidebar side="right" collapsible="icon" className="w-[350px] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </Sidebar>
    </SidebarProvider>
  );
}
