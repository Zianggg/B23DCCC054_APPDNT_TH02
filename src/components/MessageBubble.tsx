import * as React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { formatClock } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';

type MessageBubbleProps = {
  message: Message;
  isMine: boolean;
};

function MessageBubbleBase({ message, isMine }: MessageBubbleProps) {
  return (
    <View
      className={cn('my-0.5 max-w-[80%]', isMine ? 'self-end' : 'self-start')}
    >
      <View
        className={cn(
          'rounded-2xl px-3.5 py-2',
          isMine ? 'rounded-br-md bg-primary' : 'rounded-bl-md bg-muted',
        )}
      >
        <Text
          className={cn(
            'text-[15px] leading-5',
            isMine ? 'text-primary-foreground' : 'text-foreground',
          )}
        >
          {message.text}
        </Text>
        <Text
          className={cn(
            'mt-0.5 self-end text-[11px]',
            isMine ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          {formatClock(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

export const MessageBubble = React.memo(MessageBubbleBase);
