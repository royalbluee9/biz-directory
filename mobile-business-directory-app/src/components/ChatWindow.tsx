import { useState, useEffect, useRef } from 'react';
import { Message } from '../types/Business';

interface ChatWindowProps {
  businessId: string;
  businessName: string;
  messages: Message[];
  onSendMessage: (businessId: string, text: string) => void;
  onBack: () => void;
}

export default function ChatWindow({ businessId, businessName, messages, onSendMessage, onBack }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(businessId, messageText);
      setMessageText('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between rounded-t-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h3 className="font-semibold">{businessName}</h3>
            <p className="text-xs text-blue-100">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-2">💬</div>
            <p>Start a conversation</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isFromBusiness ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.isFromBusiness
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                }`}
              >
                {message.isFromBusiness && (
                  <div className="text-xs font-semibold mb-1 text-gray-600">
                    {message.senderName}
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isFromBusiness ? 'text-gray-500' : 'text-blue-100'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
