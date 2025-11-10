import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Clock } from 'lucide-react';

interface SocialMediaScrollProps {
  onComplete: () => void;
}

const posts = [
  {
    user: '@perfect_life',
    content: 'Just got straight A\'s again! 📚 Study tips coming soon!',
    likes: '2.3K',
    image: true,
  },
  {
    user: '@fitgoals',
    content: 'Morning workout complete! Feeling amazing! 💪',
    likes: '5.1K',
    image: true,
  },
  {
    user: '@travel_teen',
    content: 'Weekend in Paris! Living my best life! ✈️',
    likes: '8.7K',
    image: true,
  },
  {
    user: '@popular_kid',
    content: 'Best party ever! Love my friends! 🎉',
    likes: '3.4K',
    image: true,
  },
];

export default function SocialMediaScroll({ onComplete }: SocialMediaScrollProps) {
  const [timeSpent, setTimeSpent] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
      if (timeSpent >= 20) {
        setShowWarning(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeSpent]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <h3 className="text-white font-bold text-xl">Social Feed</h3>
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5" />
            <span className="font-mono">{formatTime(timeSpent)}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-2xl mx-auto space-y-4 p-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                <span className="text-white font-semibold">{post.user}</span>
              </div>

              <p className="text-white mb-3">{post.content}</p>

              {post.image && (
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 h-64 rounded-lg mb-3" />
              )}

              <div className="flex items-center gap-6 text-gray-400">
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>234</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {posts.map((post, index) => (
            <div key={`repeat-${index}`} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
                <span className="text-white font-semibold">{post.user}</span>
              </div>

              <p className="text-white mb-3">{post.content}</p>

              {post.image && (
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 h-64 rounded-lg mb-3" />
              )}

              <div className="flex items-center gap-6 text-gray-400">
                <button className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>234</span>
                </button>
                <button className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all"
            >
              You've been scrolling for {formatTime(timeSpent)}. Take a break?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
