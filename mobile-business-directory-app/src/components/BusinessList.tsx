import { Business } from '../types/Business';

interface BusinessListProps {
  businesses: Business[];
  onViewDetails: (business: Business) => void;
  onChat?: (businessId: string) => void;
}

export default function BusinessList({ businesses, onViewDetails, onChat }: BusinessListProps) {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No businesses found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {businesses.map((business) => (
        <div
          key={business.id}
          onClick={() => onViewDetails(business)}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
        >
          <div className="flex items-start space-x-4">
            {/* Business Icon/Image */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl">
              {business.image}
            </div>

            {/* Business Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">{business.name}</h3>
                  {business.isVerified && (
                    <span className="text-blue-500" title="Verified Business">
                      ✓
                    </span>
                  )}
                </div>
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {business.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{business.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{business.phone}</span>
                </div>
                {onChat && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onChat(business.id);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
