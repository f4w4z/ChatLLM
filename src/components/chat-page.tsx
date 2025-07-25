'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat-interface';
import SettingsPanel from '@/components/settings-panel';
import { SidebarProvider, Sidebar, SidebarTrigger } from '@/components/ui/sidebar';
import type { ChatSettings, Message } from '@/app/actions';
import { Button } from './ui/button';

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
        <div className="relative flex-1">
            <div className="absolute top-3 right-4 z-20">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                </Button>
              </SidebarTrigger>
            </div>
            <ChatInterface 
              messages={messages}
              setMessages={setMessages}
              settings={settings}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
        </div>
        <Sidebar side="right" collapsible="offcanvas" className="w-[350px]">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </Sidebar>
    </SidebarProvider>
  );
}
