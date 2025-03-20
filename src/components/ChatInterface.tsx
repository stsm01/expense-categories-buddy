
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import UserAvatar from './UserAvatar';
import { Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  expenseId: string;
  comments?: Comment[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ expenseId, comments = [] }) => {
  const { currentUser } = useUser();
  const [message, setMessage] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  
  const handleSendMessage = () => {
    if (!message.trim() || !currentUser) return;
    
    const newComment: Comment = {
      id: `cmt_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      message: message.trim(),
      timestamp: new Date(),
    };
    
    setLocalComments((prev) => [...prev, newComment]);
    setMessage('');
    
    toast({
      title: "Comment sent",
      description: "Your comment has been added to the conversation.",
    });
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(date));
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {localComments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start the conversation about this expense.
            </p>
          </div>
        ) : (
          localComments.map((comment, index) => {
            const isCurrentUser = currentUser?.id === comment.userId;
            const showDate = index === 0 || 
              formatDate(localComments[index - 1].timestamp) !== formatDate(comment.timestamp);
              
            return (
              <React.Fragment key={comment.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                      {formatDate(comment.timestamp)}
                    </div>
                  </div>
                )}
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <UserAvatar
                      name={comment.userName}
                      role={comment.userRole}
                      className={isCurrentUser ? 'ml-2' : 'mr-2'}
                    />
                    <div 
                      className={`rounded-2xl p-3 ${
                        isCurrentUser 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-secondary text-secondary-foreground rounded-tl-none'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className={`text-xs font-medium ${isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {comment.userName} • {comment.userRole}
                        </p>
                        <p className={`text-xs ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} ml-2`}>
                          {formatTime(comment.timestamp)}
                        </p>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{comment.message}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className="h-[80px] w-[80px]"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
