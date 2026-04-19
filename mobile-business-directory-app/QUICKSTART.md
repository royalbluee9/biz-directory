# Quick Start Guide - BizDirectory

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit the URL shown in terminal (usually `http://localhost:5173`)

---

## 📱 Using the App

### Adding Your First Business

1. **Click "Add New Business"** button at the bottom of the screen

2. **Choose an Icon** - Pick an emoji that represents your business

3. **Fill in the Details**:
   - Business Name (Required) - e.g., "Joe's Pizza"
   - Category (Required) - Select from dropdown
   - Description (Required) - Brief description of your business
   - Phone (Required) - e.g., "+1 (555) 123-4567"
   - Email (Required) - e.g., "info@joespizza.com"
   - Website (Optional) - e.g., "www.joespizza.com"
   - Address (Required) - e.g., "123 Main St, City"
   - Hours (Optional) - e.g., "Mon-Fri: 9AM-5PM"

4. **Click "Add Business"** to save

### Searching for Businesses

1. **Use the search bar** at the top
2. Type any keyword (searches in name and description)
3. Results update automatically

### Filtering by Category

1. **Tap category pills** below the search bar
2. Swipe left/right to see all categories
3. Tap "All" to see everything

### Viewing Business Details

1. **Tap any business card** in the list
2. See full contact information
3. Use quick action buttons:
   - 📞 **Call** - Opens phone dialer
   - ✉️ **Email** - Opens email app
   - 🌐 **Website** - Opens in new tab

### Deleting a Business

1. Open business details
2. Scroll to bottom
3. Tap "Delete Business"
4. Confirm the action

---

## 💡 Tips & Tricks

### Best Practices for Adding Businesses

✅ **Use descriptive names** - Make it easy to identify
✅ **Write clear descriptions** - Help users understand what you offer
✅ **Include all contact info** - More ways to reach you
✅ **Choose the right category** - Makes filtering easier
✅ **Pick a relevant emoji** - Visual recognition at a glance

### Search Tips

- Search is **case-insensitive** (COFFEE = coffee)
- Searches in both **name and description**
- Combine with **category filters** for best results
- Clear search to see all businesses

### Mobile Usage

- **Swipe** through categories horizontally
- **Tap** business cards to view details
- **Pull down** to refresh (browser native)
- Works great on **any screen size**

---

## 🎨 Customization Ideas

### Change Color Scheme

Edit `src/App.tsx` and replace gradient colors:
```tsx
// Current: Blue to Purple
from-blue-500 to-purple-600

// Try: Green to Blue
from-green-500 to-blue-600

// Try: Pink to Orange
from-pink-500 to-orange-600
```

### Add More Emojis

Edit `src/components/BusinessForm.tsx`:
```tsx
const emojiOptions = ['☕', '💻', '🏪', '🏥', '📚', '🔧', 
                      '🍕', '🏋️', '💼', '🎨', '🚗', '✂️', 
                      '🏠', '📱', '🎵', '🌟',
                      // Add your own here!
                      '🎭', '🏨', '🎯', '🌮'];
```

### Add More Categories

Edit `src/App.tsx`:
```tsx
const categories = ['All', 'Restaurant', 'Technology', 
                    'Retail', 'Healthcare', 'Education', 
                    'Services', 'Other',
                    // Add your own here!
                    'Entertainment', 'Real Estate', 'Automotive'];
```

---

## 📦 Building for Production

### Create Production Build
```bash
npm run build
```

### Output Location
```
dist/index.html
```

### Deploy Anywhere
Upload `dist/index.html` to any web host:
- Netlify (drag & drop)
- Vercel (one-click deploy)
- GitHub Pages
- Any web server

---

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Build fails?
```bash
# Check for TypeScript errors
npm run build
# Errors will be shown in terminal
```

### Styles not loading?
```bash
# Restart dev server
Ctrl+C (stop)
npm run dev (start again)
```

---

## 📚 Need More Help?

- **README.md** - Full documentation
- **FEATURES.md** - Complete feature list
- **PROJECT_SUMMARY.md** - Technical overview

---

## 🎉 You're Ready!

Start adding businesses and building your directory. The app is designed to be intuitive - just explore and experiment!

**Happy Directory Building!** 🚀
