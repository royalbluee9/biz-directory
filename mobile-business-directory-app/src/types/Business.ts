export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  countryCode: string;
  email: string;
  website: string;
  address: string;
  hours: string;
  image: string; // emoji or image URL
  createdAt: string;
  ownerId: string; // user who created this business
  isVerified: boolean;
  verificationStatus: 'none' | 'pending' | 'approved' | 'rejected';
  verificationRequestDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Message {
  id: string;
  businessId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFromBusiness: boolean;
}

export interface Conversation {
  businessId: string;
  businessName: string;
  messages: Message[];
  unreadCount: number;
}
