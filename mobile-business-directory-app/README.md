# 🏢 BizDirectory - Mobile Business Directory App

A modern, mobile-first business directory application with **user authentication**, **role-based access control**, **business verification system**, and **real-time messaging**. Built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication & User Management
- **Login/Signup System** - Secure user authentication
- **Role-Based Access Control** - Admin and regular user roles
- **User Profile** - Personal profile with role display
- **Demo Accounts** - Pre-configured test accounts for quick access

### 👥 User Roles

#### Regular User
- Add and manage their own businesses
- Request verification for their businesses
- Chat with any business
- Search and browse all businesses
- View verified businesses with badges

#### Admin User
- **Admin Dashboard** with comprehensive analytics
- View all users and their roles
- **Approve or reject** business verification requests
- See pending verifications count
- Monitor total businesses and verified count
- Full system oversight

### 🏪 Business Management
- **Add Businesses** with detailed information
- **Country Code Selection** - 30+ countries with flags and dial codes
- **Phone Number** with international format
- **Business Categories** - 7 categories (Restaurant, Technology, Retail, Healthcare, Education, Services, Other)
- **16 Emoji Icons** to choose from
- **Complete Contact Information** (phone, email, website, address, hours)
- **Edit/Delete** owned businesses
- **Verified Business Badge** - Blue checkmark for verified businesses

### ✅ Verification System
- **Get Verified** button for business owners
- **Verification Status** tracking:
  - None (not requested)
  - Pending (awaiting admin review)
  - Approved (verified with badge)
  - Rejected (verification denied)
- **Admin Verification Panel** in dashboard
- **Timestamp** for verification requests

### 💬 Real-Time Messaging
- **Chat with businesses** directly from the app
- **Conversation history** for all chats
- **Unread message** indicators
- **Auto-responses** from businesses
- **Message timestamps** with time formatting
- **Messages icon** in header with unread count
- **Chat List** view showing all conversations

### 🔍 Search & Filter
- **Real-time search** by name or description
- **Category filters** - Filter by business category
- **Combined filtering** - Search + category
- **Result count** display
- **Swipeable categories** on mobile

### 📱 Mobile-Optimized Design
- **Responsive layout** - Works on all screen sizes
- **Touch-friendly** interface with large tap targets
- **Sticky header** navigation
- **Floating action button** for quick business addition
- **Bottom action buttons** for easy access
- **Smooth animations** and transitions
- **Beautiful gradients** throughout

### 🎯 Quick Actions
- **Call** businesses directly (phone dialer)
- **Email** businesses (email client)
- **Visit website** (opens in new tab)
- **Chat** with businesses inline
- **View details** for full information

## 🚀 Demo Accounts

### Admin Account
- **Email:** admin@bizdirectory.com
- **Name:** Admin User
- **Access:** Full admin dashboard, user management, verification approval

### User Accounts
- **Email:** john@example.com
- **Name:** John Doe

- **Email:** jane@example.com
- **Name:** Jane Smith

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **LocalStorage** - Data persistence (demo)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd biz-directory

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deployment

### GitHub Pages (Automated)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**
- Go to repository → Settings → Pages
- Source: Select **"GitHub Actions"**
- Wait 2-3 minutes for deployment

3. **Your app is live!**
- URL: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Manual Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for various platforms.

## 📱 Usage

### For Users

1. **Login/Signup**
   - Use demo accounts or create a new account
   - Login with your email

2. **Browse Businesses**
   - Search by name or description
   - Filter by category
   - Tap to view details

3. **Add Your Business**
   - Tap the + button
   - Fill in business details
   - Select country code for phone
   - Choose an icon
   - Submit

4. **Get Verified**
   - Open your business details
   - Tap "Get Verified" button
   - Wait for admin approval
   - Receive verified badge when approved

5. **Chat with Businesses**
   - Tap "Chat" button on any business
   - Send messages
   - View conversation history in Messages

### For Admins

1. **Login as Admin**
   - Use admin@bizdirectory.com demo account

2. **Access Admin Dashboard**
   - Tap the settings icon (⚙️) in header
   - View comprehensive analytics

3. **Manage Verifications**
   - Switch to "Verifications" tab
   - Review pending requests
   - Approve or reject businesses
   - View verified businesses

4. **Monitor Users**
   - Switch to "Users" tab
   - See all registered users
   - View user roles and join dates

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Login.tsx              # Authentication
│   ├── AdminDashboard.tsx     # Admin panel
│   ├── BusinessList.tsx       # Business cards
│   ├── BusinessForm.tsx       # Add business form
│   ├── BusinessDetail.tsx     # Business details
│   ├── ChatWindow.tsx         # Chat interface
│   └── ChatList.tsx           # Conversation list
├── types/
│   └── Business.ts            # TypeScript interfaces
├── data/
│   └── countryCodes.ts        # Country codes with flags
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🎨 Color Scheme

- **Primary:** Blue (#3B82F6) to Purple (#9333EA) gradient
- **Success:** Green (#10B981)
- **Warning:** Orange (#F59E0B)
- **Danger:** Red (#EF4444)
- **Neutral:** Gray shades

## 📊 Statistics

- **Build Size:** 265.70 KB
- **Gzipped:** 75.51 KB
- **Components:** 7
- **Country Codes:** 30+
- **Business Categories:** 7
- **Emoji Icons:** 16

## 🔒 Security Note

This is a demo application. In production:
- Implement proper authentication (JWT, OAuth)
- Use a backend database (Firebase, MongoDB, PostgreSQL)
- Add API endpoints for data management
- Implement proper authorization checks
- Use HTTPS for all communications
- Add rate limiting and input validation

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
