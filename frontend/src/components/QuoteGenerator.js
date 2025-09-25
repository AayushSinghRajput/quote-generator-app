import React, { useState } from "react";
import axios from "axios";

function QuoteGenerator() {
  const [category, setCategory] = useState("inspirational");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");

  const categories = [
    { value: "inspirational", label: "🌟 Inspirational", color: "from-purple-500 to-pink-500" },
    { value: "motivational", label: "💪 Motivational", color: "from-red-500 to-orange-500" },
    { value: "wisdom", label: "📚 Wisdom", color: "from-blue-500 to-cyan-500" },
    { value: "success", label: "🏆 Success", color: "from-amber-500 to-yellow-500" },
    { value: "life", label: "🌱 Life Lessons", color: "from-green-500 to-emerald-500" },
    { value: "love", label: "❤️ Love", color: "from-pink-500 to-rose-500" },
    { value: "friendship", label: "👫 Friendship", color: "from-teal-500 to-blue-500" },
    { value: "positive", label: "😊 Positive", color: "from-yellow-400 to-orange-400" },
    { value: "philosophical", label: "🤔 Philosophical", color: "from-indigo-500 to-purple-500" },
    { value: "spiritual", label: "✨ Spiritual", color: "from-violet-500 to-purple-600" },
    { value: "business", label: "💼 Business", color: "from-gray-600 to-blue-600" },
    { value: "leadership", label: "👑 Leadership", color: "from-amber-600 to-orange-600" },
    { value: "creativity", label: "🎨 Creativity", color: "from-fuchsia-500 to-purple-500" },
    { value: "technology", label: "💻 Technology", color: "from-blue-600 to-cyan-500" },
    { value: "science", label: "🔬 Science", color: "from-green-600 to-teal-500" },
    { value: "nature", label: "🌿 Nature", color: "from-emerald-500 to-green-500" },
    { value: "travel", label: "✈️ Travel", color: "from-sky-500 to-blue-500" },
    { value: "education", label: "🎓 Education", color: "from-orange-500 to-red-500" },
    { value: "health", label: "💚 Health", color: "from-lime-500 to-green-500" },
    { value: "mindfulness", label: "🧘 Mindfulness", color: "from-cyan-500 to-blue-500" },
    { value: "courage", label: "🦁 Courage", color: "from-orange-500 to-red-500" },
    { value: "perseverance", label: "💫 Perseverance", color: "from-purple-500 to-indigo-500" },
    { value: "humorous", label: "😂 Humorous", color: "from-yellow-500 to-red-500" },
    { value: "historical", label: "🏛️ Historical", color: "from-stone-600 to-gray-600" },
    { value: "futuristic", label: "🚀 Futuristic", color: "from-blue-700 to-purple-700" },
    { value: "poetic", label: "📝 Poetic", color: "from-rose-500 to-pink-500" },
    { value: "minimalist", label: "⚪ Minimalist", color: "from-gray-400 to-gray-600" },
    { value: "adventure", label: "🗺️ Adventure", color: "from-orange-500 to-yellow-500" },
    { value: "innovation", label: "💡 Innovation", color: "from-cyan-400 to-blue-500" },
    { value: "gratitude", label: "🙏 Gratitude", color: "from-green-400 to-emerald-500" }
  ];

  const fetchQuote = async () => {
    setLoading(true);
    setQuote("");
    setAuthor("");
    try {
      const { data } = await axios.post("https://quote-generator-app-dw77.onrender.com/api/quotes", {
        category,
      });
      let rawQuote = data.quote || "";
      //remove json...
      if(rawQuote.startsWith("```")){
        rawQuote = rawQuote.replace(/```json\n?/,"").replace(/```/,"").trim();
      }
      //try parsing JSON returned from gemini
      let parsed = {};
      try{
        parsed = JSON.parse(rawQuote);
      } catch{
        parsed = {quote : rawQuote || "No quote found",author:data.author || "Unknown"}
      }
      setQuote(parsed.quote || "No quote found");
      setAuthor(parsed.author || "Unknown");
    } catch (error) {
      setQuote("Failed to fetch quote. Please check your connection and try again.");
      setAuthor("System Error");
    }
    setLoading(false);
  };

  const getCurrentCategory = () => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-12 m-3 rounded-xl">
      <div className="w-full max-w-6xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Main Container */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Gradient Header */}
          <div className={`bg-gradient-to-r ${getCurrentCategory().color} p-8 text-center`}>
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="text-4xl">✨</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">AI Quote Generator</h1>
              <div className="text-4xl">💫</div>
            </div>
            <p className="text-white/90 text-lg md:text-xl">Powered by Gemini AI • {categories.length}+ Categories</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Category Selection */}
            <div className="mb-8">
              <label className="block text-white/80 text-lg font-medium mb-4 text-center">
                Select a category for your inspiration:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 min-h-[80px] flex flex-col items-center justify-center ${
                      category === cat.value
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105 ring-2 ring-white/50`
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.label.split(' ')[0]}</div>
                    <div className="text-xs font-medium text-center leading-tight">
                      {cat.label.split(' ').slice(1).join(' ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Category Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-2">
                <span className="text-white/80 text-sm">Selected:</span>
                <span className="text-white font-semibold">{getCurrentCategory().label}</span>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={fetchQuote}
              disabled={loading}
              className={`w-full max-w-md mx-auto py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 block ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : `bg-gradient-to-r ${getCurrentCategory().color} hover:shadow-2xl`
              } text-white shadow-lg mb-8`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg">Generating {getCurrentCategory().label.split(' ')[1]} Quote...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-lg">Generate {getCurrentCategory().label.split(' ')[1]} Quote</span>
                </div>
              )}
            </button>

            {/* Quote Display */}
            {quote && (
              <div className="max-w-4xl mx-auto bg-black/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-white/10 animate-fade-in">
                <div className="text-6xl text-white/20 mb-2">“</div>
                <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed italic mb-6 text-center">
                  {quote}
                </p>
                <div className="text-center">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-3"></div>
                  <p className="text-white/70 font-medium text-lg">— {author}</p>
                </div>
                <div className="text-6xl text-white/20 text-right mt-2">”</div>
              </div>
            )}

            {/* Empty State */}
            {!quote && !loading && (
              <div className="text-center py-8 md:py-12">
                <div className="text-6xl mb-4">💭</div>
                <p className="text-white/60 text-lg md:text-xl">Select a category and generate your first inspirational quote!</p>
                <p className="text-white/40 text-sm mt-2">Powered by Gemini AI technology</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-black/20 border-t border-white/10 p-4 text-center">
            <p className="text-white/50 text-sm">✨ {categories.length} categories available • 🌟 Gemini AI Powered • 💫 Spread positivity</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Custom scrollbar for category grid */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default QuoteGenerator;