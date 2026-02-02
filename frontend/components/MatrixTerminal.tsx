'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MatrixTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to the Matrix Terminal. Type your message and press ENTER to chat with your AI mental coach.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply || 'No response received.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to connect to the server. Make sure the backend is running on port 8000.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="border-b border-green-500 px-4 py-2 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-green-400 text-sm ml-2">matrix-terminal@ai-coach:~$</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 ${
              msg.role === 'user' ? 'text-green-300' : 'text-green-400'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-green-600 shrink-0">
                {msg.role === 'user' ? '> ' : '>> '}
              </span>
              <div className="flex-1">
                <div className="whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
                <div className="text-green-700 text-xs mt-1">
                  [{formatTimestamp(msg.timestamp)}]
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-green-500 flex items-center gap-2">
            <span className="text-green-600">>></span>
            <span className="matrix-cursor">Processing your request...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-green-500 px-4 py-3 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600 shrink-0">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder={isLoading ? 'Processing...' : 'Type your message...'}
            className="flex-1 bg-transparent text-green-400 outline-none placeholder-green-700 disabled:opacity-50"
            autoFocus
          />
          {isLoading && (
            <span className="text-green-500 text-sm">[LOADING]</span>
          )}
        </div>
        <div className="text-green-700 text-xs mt-1">
          Press ENTER to send • Shift+ENTER for new line (not supported in terminal mode)
        </div>
      </div>
    </div>
  );
}
