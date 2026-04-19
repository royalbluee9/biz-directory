import { useState, useEffect } from 'react';
import Login from './components/Login';
import BusinessList from './components/BusinessList';
import BusinessForm from './components/BusinessForm';
import BusinessDetail from './components/BusinessDetail';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';
import AdminDashboard from './components/AdminDashboard';
import { Business, User, Conversation, Message } from './types/Business';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Coffee Corner Cafe',
      category: 'Restaurant',
      description: 'Artisan coffee and fresh pastries in a cozy atmosphere',
      phone: '555-123-4567',
      countryCode: '+1',
      email: 'info@coffeecorner.com',
      website: 'www.coffeecorner.com',
      address: '123 Main Street, Downtown',
      hours: 'Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-9PM',
      image: '☕',
      createdAt: new Date().toISOString(),
      ownerId: '2',
      isVerified: true,
      verificationStatus: 'approved',
    },
    {
      id: '2',
      name: 'TechFix Solutions',
      category: 'Technology',
      description: 'Professional IT support and computer repair services',
      phone: '555-987-6543',
      countryCode: '+1',
      email: 'support@techfix.com',
      website: 'www.techfix.com',
      address: '456 Tech Avenue, Suite 200',
      hours: 'Mon-Fri: 9AM-6PM',
      image: '💻',
      createdAt: new Date().toISOString(),
      ownerId: '2',
      isVerified: false,
      verificationStatus: 'none',
    },
  ]);

  const [currentView, setCurrentView] = useState<'list' | 'add' | 'detail' | 'chat' | 'chatList' | 'admin'>('list');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChatBusinessId, setActiveChatBusinessId] = useState<string | null>(null);

  const categories = ['All', 'Restaurant', 'Technology', 'Retail', 'Healthcare', 'Education', 'Services', 'Other'];

  // Load users when component mounts
  useEffect(() => {
    if (currentUser && !users.find(u => u.id === currentUser.id)) {
      setUsers(prev => [...prev, currentUser]);
    }
  }, [currentUser, users]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setUsers(prev => {
      const existing = prev.find(u => u.id === user.id);
      if (existing) return prev;
      return [...prev, user];
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('list');
    setSelectedBusiness(null);
    setActiveChatBusinessId(null);
  };

  const handleAddBusiness = (business: Omit<Business, 'id' | 'createdAt'>) => {
    const newBusiness: Business = {
      ...business,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBusinesses([...businesses, newBusiness]);
    setCurrentView('list');
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses(businesses.filter(b => b.id !== id));
    setCurrentView('list');
    setSelectedBusiness(null);
  };

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setCurrentView('detail');
  };

  const handleRequestVerification = (businessId: string) => {
    setBusinesses(businesses.map(b => 
      b.id === businessId 
        ? { 
            ...b, 
            verificationStatus: 'pending' as const,
            verificationRequestDate: new Date().toISOString()
          }
        : b
    ));
  };

  const handleVerifyBusiness = (businessId: string, approve: boolean) => {
    setBusinesses(businesses.map(b => 
      b.id === businessId 
        ? { 
            ...b, 
            isVerified: approve,
            verificationStatus: approve ? 'approved' as const : 'rejected' as const
          }
        : b
    ));
  };

  const handleStartChat = (businessId: string) => {
    setActiveChatBusinessId(businessId);
    setCurrentView('chat');
    
    // Mark messages as read
    setConversations(prev =>
      prev.map(conv =>
        conv.businessId === businessId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (businessId: string, text: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (!business || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      businessId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: new Date().toISOString(),
      isFromBusiness: false,
    };

    setConversations(prev => {
      const existingConv = prev.find(c => c.businessId === businessId);
      
      if (existingConv) {
        return prev.map(conv =>
          conv.businessId === businessId
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        );
      } else {
        return [
          ...prev,
          {
            businessId,
            businessName: business.name,
            messages: [newMessage],
            unreadCount: 0,
          },
        ];
      }
    });

    // Auto-reply from business after 1 second
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        businessId,
        senderId: 'business',
        senderName: business.name,
        text: "Thanks for your message! We'll get back to you soon.",
        timestamp: new Date().toISOString(),
        isFromBusiness: true,
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.businessId === businessId
            ? {
                ...conv,
                messages: [...conv.messages, autoReply],
                unreadCount: currentView === 'chat' && activeChatBusinessId === businessId ? 0 : conv.unreadCount + 1,
              }
            : conv
        )
      );
    }, 1000);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBusiness(null);
    setActiveChatBusinessId(null);
  };

  // Filter businesses
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalUnreadMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  // Login screen
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentView !== 'list' && (
                <button
                  onClick={handleBackToList}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <h1 className="text-2xl font-bold">🏢 BizDirectory</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* User Info */}
              <div className="flex items-center gap-2 mr-2">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium">{currentUser.name}</div>
                  <div className="text-xs text-blue-100">{currentUser.role}</div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentUser.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Messages Button */}
              <button
                onClick={() => setCurrentView('chatList')}
                className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {totalUnreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalUnreadMessages}
                  </span>
                )}
              </button>

              {/* Admin Dashboard Button */}
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {currentView === 'admin' && currentUser.role === 'admin' && (
          <AdminDashboard
            businesses={businesses}
            users={users}
            onVerifyBusiness={handleVerifyBusiness}
            onClose={handleBackToList}
          />
        )}

        {currentView === 'chatList' && (
          <ChatList
            conversations={conversations}
            onSelectConversation={handleStartChat}
            onBack={handleBackToList}
          />
        )}

        {currentView === 'chat' && activeChatBusinessId && (
          <ChatWindow
            businessId={activeChatBusinessId}
            businessName={businesses.find(b => b.id === activeChatBusinessId)?.name || ''}
            messages={conversations.find(c => c.businessId === activeChatBusinessId)?.messages || []}
            onSendMessage={handleSendMessage}
            onBack={handleBackToList}
          />
        )}

        {currentView === 'list' && (
          <>
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search businesses..."
                  className="w-full px-4 py-3 pl-12 bg-white rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} found
              </div>
            </div>

            {/* Business List */}
            <BusinessList
              businesses={filteredBusinesses}
              onViewDetails={handleViewDetails}
              onChat={handleStartChat}
            />
          </>
        )}

        {currentView === 'add' && (
          <BusinessForm
            onSubmit={handleAddBusiness}
            onCancel={handleBackToList}
            categories={categories.filter(c => c !== 'All')}
            currentUserId={currentUser.id}
          />
        )}

        {currentView === 'detail' && selectedBusiness && (
          <BusinessDetail
            business={selectedBusiness}
            onDelete={handleDeleteBusiness}
            onClose={handleBackToList}
            onChat={handleStartChat}
            onRequestVerification={handleRequestVerification}
            currentUserId={currentUser.id}
          />
        )}
      </main>

      {/* Floating Add Button */}
      {currentView === 'list' && (
        <button
          onClick={() => setCurrentView('add')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
}
