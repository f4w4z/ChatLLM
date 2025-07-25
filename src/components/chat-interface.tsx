'use client';

import type { FormEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { getAiResponse, Message, ChatSettings } from '@/app/actions';
import { generateInitialPrompt } from '@/ai/flows/generate-initial-prompt';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { SendHorizonal, Loader2, Bot } from 'lucide-react';
import ChatMessage from './chat-message';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  settings: ChatSettings;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export default function ChatInterface({ messages, setMessages, settings, isLoading, setIsLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialPrompt = async () => {
      try {
        const { prompt } = await generateInitialPrompt();
        setMessages([{ role: 'model', content: prompt }]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch initial message.",
        });
        setMessages([{ role: 'model', content: 'Hello! How can I help you today?' }]);
      } finally {
        setIsLoading(false);
      }
    };
    if (messages.length === 0) {
      fetchInitialPrompt();
    }
  }, [setMessages, setIsLoading, toast, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', content: input };
    const newHistory = [...messages, newUserMessage];

    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    const result = await getAiResponse(newHistory, settings);

    if (result.success) {
      const newAiMessage: Message = { role: 'model', content: result.response };
      setMessages([...newHistory, newAiMessage]);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.response,
      });
      // remove the user message if the call failed
      setMessages(messages);
    }
    setIsLoading(false);
  };
  
  return (
    <div className="flex flex-col h-screen p-0">
      <header className="p-4 border-b flex items-center gap-3">
        <Bot className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-semibold font-headline">
          AI Chat
        </h1>
      </header>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4 max-w-4xl mx-auto w-full">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && messages.length > 0 && <ChatMessage isLoading />}
          </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-end gap-2 max-w-4xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow resize-none rounded-none shadow-sm"
            rows={1}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="rounded-none w-12 h-12 flex-shrink-0">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SendHorizonal />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
