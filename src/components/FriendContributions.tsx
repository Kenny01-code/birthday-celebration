import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, Heart, Star, Send, Users, Share2 } from 'lucide-react';

interface FriendContribution {
  id: string;
  name: string;
  message: string;
  media?: string;
  type: 'image' | 'video' | 'text';
  timestamp: number;
}

interface FriendContributionsProps {
  onComplete: () => void;
}

export function FriendContributions({ onComplete }: FriendContributionsProps) {
  const [contributions, setContributions] = useState<FriendContribution[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMemoryWall, setShowMemoryWall] = useState(false);

  // Load contributions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('graciaMemories');
    if (saved) {
      setContributions(JSON.parse(saved));
    }
  }, []);

  // Save contributions to localStorage
  useEffect(() => {
    if (contributions.length > 0) {
      localStorage.setItem('graciaMemories', JSON.stringify(contributions));
    }
  }, [contributions]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (friendName && message) {
      const newContribution: FriendContribution = {
        id: Date.now().toString(),
        name: friendName,
        message,
        media: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
        type: selectedFile ? (selectedFile.type.startsWith('video') ? 'video' : 'image') : 'text',
        timestamp: Date.now()
      };
      
      setContributions(prev => [...prev, newContribution]);
      setFriendName('');
      setMessage('');
      setSelectedFile(null);
      setShowUploadForm(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{
      background: `
        radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)
      `
    }}>
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        
        <motion.h2
          className="text-7xl text-center mb-8 luxury-text font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Friends Memory Wall 👫✨
        </motion.h2>

        <motion.p
          className="text-center text-3xl text-white mb-8 font-light"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Share your birthday wishes and memories for Gracia!
        </motion.p>

        {/* Shareable Link */}
        <motion.div
          className="diamond-border rounded-2xl p-6 mb-8 velvet-texture backdrop-blur-md max-w-2xl mx-auto"
          style={{ background: 'rgba(255, 215, 0, 0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Share with Friends
              </h3>
              <p className="text-white text-sm">Send this link so friends can add their memories!</p>
            </div>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900 rounded-full font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied! Share with friends so they can add memories!');
              }}
            >
              <Share2 className="w-5 h-5" />
              Copy Link
            </motion.button>
          </div>
        </motion.div>

        {/* Upload Button */}
        <div className="flex justify-center mb-12">
          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900 rounded-full shadow-2xl border-4 border-purple-600 font-bold text-2xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadForm(true)}
          >
            <Upload className="w-8 h-8 inline mr-3" />
            Add Your Memory
          </motion.button>
        </div>

        {/* Memory Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contributions.length === 0 && (
            <div className="col-span-full text-center py-12">
              <motion.div
                className="diamond-border rounded-2xl p-8 velvet-texture backdrop-blur-md"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl text-white font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  No memories yet...
                </h3>
                <p className="text-lg text-gray-300" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Be the first to share a birthday memory for Gracia! 💖
                </p>
              </motion.div>
            </div>
          )}
          <AnimatePresence>
            {contributions.map((contribution, index) => (
              <motion.div
                key={contribution.id}
                className="diamond-border rounded-2xl p-6 velvet-texture backdrop-blur-md"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {contribution.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {new Date(contribution.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {contribution.media && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    {contribution.type === 'image' ? (
                      <img src={contribution.media} alt="Friend memory" className="w-full h-48 object-cover" />
                    ) : (
                      <video src={contribution.media} controls className="w-full h-48 object-cover" />
                    )}
                  </div>
                )}

                <p className="text-white text-lg leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {contribution.message}
                </p>

                <div className="flex justify-end mt-4">
                  <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <motion.button
            className="px-16 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full shadow-2xl border-4 border-yellow-400 font-bold text-3xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
          >
            Continue to Birthday Cake →
          </motion.button>
        </div>
      </div>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="diamond-border rounded-3xl p-8 velvet-texture backdrop-blur-sm max-w-2xl w-full"
              style={{ background: 'rgba(0, 0, 0, 0.8)' }}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
            >
              <h3 className="text-4xl text-center mb-8 luxury-text font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Share Your Memory
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border-2 border-yellow-400/50 text-white text-lg"
                    placeholder="Enter your name..."
                  />
                </div>

                <div>
                  <label className="block text-white text-xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Birthday Message:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/10 border-2 border-yellow-400/50 text-white text-lg h-32 resize-none"
                    placeholder="Write your birthday message for Gracia..."
                  />
                </div>

                <div>
                  <label className="block text-white text-xl mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Add Photo/Video (Optional):
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="w-full p-4 rounded-xl bg-white/10 border-2 border-yellow-400/50 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-8">
                <motion.button
                  className="px-8 py-4 bg-gray-600 text-white rounded-full font-bold text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900 rounded-full font-bold text-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!friendName || !message}
                >
                  <Send className="w-6 h-6 inline mr-2" />
                  Share Memory
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .luxury-text {
          background: linear-gradient(45deg, #ffd700, #ffed4e, #fff700, #ffd700);
          background-size: 400% 400%;
          animation: luxuryGlow 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
        }
        @keyframes luxuryGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .diamond-border {
          position: relative;
          background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .diamond-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #ffd700, #fff, #ffd700, #fff, #ffd700);
          background-size: 400% 400%;
          border-radius: inherit;
          z-index: -1;
          animation: diamondShine 2s linear infinite;
        }
        @keyframes diamondShine {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
        .velvet-texture {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}