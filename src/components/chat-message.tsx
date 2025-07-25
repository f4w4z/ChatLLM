'use client';

import { Bot, User, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Message } from '@/app/actions';

interface ChatMessageProps {
  message?: Message;
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const isAi = message?.role === 'model' || isLoading;

  return (
    <div className={cn('flex items-start gap-3', isAi ? 'justify-start' : 'justify-end')}>
      {isAi && (
        <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
          <AvatarFallback><Bot size={20} /></AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'p-3 rounded-lg max-w-sm md:max-w-md lg:max-w-lg shadow-md',
          isAi ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message?.content}</p>
        )}
      </div>
      {!isAi && (
        <Avatar className="w-8 h-8 bg-accent text-accent-foreground">
          <AvatarFallback><User size={20} /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
