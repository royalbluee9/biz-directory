import { Conversation } from '../types/Business';

interface ChatListProps {
  conversations: Conversation[];
  onSelectConversation: (businessId: string) => void;
  onBack: () => void;
}

export default function ChatList({ conversations, onSelectConversation, onBack }: ChatListProps) {
  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-xl">
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
            <h2 className="text-2xl font-bold">Messages</h2>
            <p className="text-indigo-100 text-sm">
              {conversations.length} {conversations.length === 1 ? 'conversation' : 'conversations'}
            </p>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y">
        {conversations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No conversations yet</h3>
            <p className="text-sm">Start chatting with businesses to see your messages here</p>
          </div>
        ) : (
          conversations.map((conversation) => {
            const lastMessage = conversation.messages[conversation.messages.length - 1];

            return (
              <div
                key={conversation.businessId}
                onClick={() => onSelectConversation(conversation.businessId)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {conversation.businessName}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    {lastMessage && (
                      <p className="text-sm text-gray-600 truncate">
                        {lastMessage.isFromBusiness ? '' : 'You: '}
                        {lastMessage.text}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                    {lastMessage && formatLastMessageTime(lastMessage.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
