const MessageSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
  
            {/* Message Content Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-10 w-48 bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeleton;
  