'use client';

import { Bot, User, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Message } from '@/app/actions';

interface ChatMessageProps {
  message?: Message;
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const isAi = message?.role === 'model' || isLoading;

  return (
    <div className={cn('flex items-start gap-4')}>
      <Avatar className={cn(
        'w-8 h-8 text-primary-foreground flex-shrink-0',
        isAi ? 'bg-primary' : 'bg-secondary-foreground'
        )}>
        <AvatarFallback>{isAi ? <Bot size={20} /> : <User size={20} />}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col gap-1 w-full">
        <p className="font-bold text-sm">
            {isAi ? 'AI Assistant' : 'You'}
        </p>
        <div
            className={cn(
            'p-3 rounded-lg max-w-full inline-block',
            isAi ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
            )}
        >
            {isLoading ? (
            <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
            </div>
            ) : (
            <p className="whitespace-pre-wrap leading-relaxed">{message?.content}</p>
            )}
        </div>
      </div>
    </div>
  );
}
