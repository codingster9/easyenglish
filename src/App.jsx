import React, { useState, useEffect, useRef } from 'react';
// Supabase & Animation Libraries
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Brain, Trophy, User, Settings, Volume2, Sparkles,
  ChevronRight, Flame, Lock, LayoutDashboard, Database, Sun, Moon,
  Zap, Calendar, FileText, Activity, PenTool, Globe, RefreshCw,
  Clock, CheckCircle, Trash2, TrendingUp, Users, Check, X, HelpCircle,
  AlertTriangle, Filter, MessageCircle, Send, Search, Image, Loader,
  Mic, MicOff, BookMarked, Copy, Share2, Eye, EyeOff
} from 'lucide-react';

// --- ⚠️ CRITICAL SETUP: FILL THESE FOR PUBLIC ACCESS ⚠️ ---
// Agar aap chahte hain ki SABKO data dikhe, to apni Supabase Keys YAHAN paste karein.
const DEFAULT_SB_URL = "https://wjmutbfnbeuqoxzpfkif.supabase.co";
const DEFAULT_SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbXV0YmZuYmV1cW94enBma2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5ODA5NzksImV4cCI6MjA4MDU1Njk3OX0.XJthls5k0Xj3cbWW5ivuwicog2gg4VwkOj1PNX8X2ns";

// --- ⚠️ GEMINI API KEY SETUP ⚠️ ---
// This is the default Gemini API key that all users will use.
// Sabhi users ke liye default Gemini API key.
const DEFAULT_GEMINI_KEY = "AIzaSyB5j1vaTP_YFqQFttoHN80CmsdepB0_QlQ";

const APP_NAME = "Easy English";
const ADMIN_PASS = "aryan17650";

// --- ANIMATION VARIANTS ---
const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

// --- COMPONENTS ---

// 1. Navigation
const Navigation = ({ activeTab, setActiveTab, darkMode, toggleChatbot, showChatbot }) => {
  const tabs = [
    { id: 'home', icon: BookOpen, label: 'Home' },
    { id: 'timeline', icon: Activity, label: 'Timeline' },
    { id: 'flashcards', icon: Zap, label: 'Cards' },
    { id: 'quiz', icon: Brain, label: 'Quiz' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'admin', icon: LayoutDashboard, label: 'Admin' },
  ];

  return (
    <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${darkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-2 md:py-0">
          <div className="flex items-center gap-2 mb-2 md:mb-0 py-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
            >
              L
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">{APP_NAME}</span>
          </div>
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 md:gap-2 min-w-max px-1 pb-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                  <tab.icon size={16} /><span>{tab.label}</span>
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChatbot} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${showChatbot ? 'bg-green-600 text-white shadow-md shadow-green-500/20' : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
              >
                <MessageCircle size={16} /><span>AI Chat</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Header
const Header = ({ user, darkMode, toggleTheme, setShowLogin }) => (
  <div className="max-w-5xl mx-auto px-4 py-6 flex justify-between items-center">
    <div>
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user ? `Hi, ${user.name.split(' ')[0]}!` : 'Welcome Guest'}</h1>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Let's learn something new today.</p>
    </div>
    <div className="flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme} className={`p-2.5 rounded-full border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>
      {user ? (
        <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-orange-400' : 'bg-white border-orange-100 text-orange-500'}`}>
          <Flame size={16} className="fill-current animate-pulse" /><span className="font-bold text-sm">{user.streak || 1} Day Streak</span>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLogin(true)} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg">Login</motion.button>
      )}
    </div>
  </div>
);

// 3. Login Modal
const LoginModal = ({ onClose, onLogin, darkMode }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`w-full max-w-sm p-8 rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-900 text-white border border-gray-800' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-2">Login / Signup</h2>
        <div className="space-y-4 mt-6">
          <motion.input whileFocus={{ scale: 1.02 }} value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={`w-full p-4 rounded-xl border outline-none font-medium ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
          <motion.input whileFocus={{ scale: 1.02 }} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className={`w-full p-4 rounded-xl border outline-none font-medium ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onLogin(name, email)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20">Start Journey</motion.button>
          <button onClick={onClose} className="w-full py-2 text-gray-500 text-sm hover:text-gray-800">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// 4. Word Card
const WordCard = ({ word, darkMode, onBookmark, onGetAIDetails, isBookmarked }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [aiDetails, setAiDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageUrl = word.image_url || `https://image.pollinations.ai/prompt/abstract%20minimalist%20representation%20of%20${word.word}%20concept%20art?width=800&height=600&nologo=true&seed=${word.id}`;

  const speak = () => {
    setIsPlaying(true);
    const u = new SpeechSynthesisUtterance(word.word);
    u.lang = 'en-US';
    u.rate = 0.8;
    u.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const handleGetAIDetails = async () => {
    if (aiDetails) {
      setShowDetails(!showDetails);
      return;
    }

    setLoading(true);
    try {
      const details = await onGetAIDetails(word.word);
      setAiDetails(details);
      setShowDetails(true);
    } catch (error) {
      console.error("Error getting AI details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-3xl shadow-lg border group transition-all hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
    >
      <div className="h-52 w-full overflow-hidden relative">
        <img src={imageUrl} alt={word.word} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest mb-2 inline-block shadow-sm">{word.category}</span>
          <h2 className="text-3xl font-bold tracking-tight">{word.word}</h2>
          <div className="flex items-center gap-2 text-gray-300 font-mono text-xs mt-1">
            <span>{word.pronunciation}</span>
            {word.hindi_meaning && <span className="text-green-400 font-sans font-bold bg-green-900/30 px-1 rounded">• {word.hindi_meaning}</span>}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={speak} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all active:scale-90"
          >
            <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmark(word.id)} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all active:scale-90"
          >
            <BookMarked size={20} className={isBookmarked ? 'fill-current' : ''} />
          </motion.button>
        </div>
      </div>
      <div className="p-6">
        <p className={`text-base font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{word.meaning}</p>
        <div className={`mt-4 p-4 rounded-2xl italic text-sm border-l-4 ${darkMode ? 'bg-gray-900 border-blue-500 text-gray-400' : 'bg-blue-50/50 border-blue-500 text-blue-900'}`}>"{word.example}"</div>

        <div className="mt-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetAIDetails} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />}
            AI Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <Share2 size={16} />
            Share
          </motion.button>
        </div>

        <AnimatePresence>
          {showDetails && aiDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
            >
              <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Insights</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{aiDetails}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// 5. Blog Card
const BlogCard = ({ blog, darkMode, onRead }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`rounded-3xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
  >
    <div className="h-48 bg-gray-200 relative">
      {blog.image_url ? <img src={blog.image_url} className="w-full h-full object-cover" alt="Blog" /> : <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white"><FileText size={48} opacity={0.5} /></div>}
    </div>
    <div className="p-6">
      <h3 className={`text-lg font-bold mb-3 line-clamp-2 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{blog.title}</h3>
      <p className={`text-sm mb-5 line-clamp-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{blog.excerpt || blog.content}</p>
      <motion.button
        whileHover={{ x: 5 }}
        onClick={() => onRead(blog)} className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all group"
      >
        Read Article <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  </motion.div>
);

// 6. Blog Reader Modal
const BlogReader = ({ blog, onClose, darkMode, apiKey }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [grammarIssues, setGrammarIssues] = useState([]);
  const [showGrammar, setShowGrammar] = useState(false);

  useEffect(() => {
    if (blog && apiKey) {
      generateSummary();
    }
  }, [blog, apiKey]);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Summarize this blog in 3 bullet points: ${blog.content}` }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setSummary(text);
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkGrammar = async () => {
    if (!apiKey) return;

    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Check grammar issues in this text and list them with corrections: ${blog.content}` }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setGrammarIssues(text.split('\n').filter(item => item.trim()));
      setShowGrammar(true);
    } catch (error) {
      console.error("Error checking grammar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col ${darkMode ? 'bg-gray-900 text-white border border-gray-800' : 'bg-white text-gray-900'}`}
      >
        <div className={`p-6 border-b flex justify-between items-center ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <X size={24} />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className={`mb-6 ${blog.image_url ? '' : 'hidden'}`}>
            <img src={blog.image_url} alt={blog.title} className="w-full h-64 object-cover rounded-xl" />
          </div>

          <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            {blog.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>

          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-8 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" />
                  AI Summary
                </h3>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {summary.split('\n').map((point, idx) => (
                    <p key={idx} className="mb-2">{point}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showGrammar && grammarIssues.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-8 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  Grammar Suggestions
                </h3>
                <ul className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {grammarIssues.map((issue, idx) => (
                    <li key={idx} className="mb-2">{issue}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`p-4 border-t flex gap-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkGrammar}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <CheckCircle size={16} />}
            Check Grammar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateSummary}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Regenerate Summary
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// 7. Word Explorer
const WordExplorer = ({ darkMode, apiKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordDetails, setWordDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const searchWord = async () => {
    if (!searchTerm.trim() || !apiKey) return;

    setLoading(true);
    try {
      // Get word details from Gemini
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Provide detailed information about the word "${searchTerm}" including: definition, pronunciation, part of speech, synonyms, antonyms, etymology, usage examples, and common phrases. Format as JSON with keys: word, pronunciation, part_of_speech, definition, synonyms, antonyms, etymology, examples, phrases` }] }]
        })
      });

      const data = await response.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      // Extract JSON from response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        text = jsonMatch[1];
      }

      const wordData = JSON.parse(text);
      setWordDetails(wordData);

      // Generate image for the word
      setImageUrl(`https://image.pollinations.ai/prompt/${searchTerm}%20concept%20illustration?width=800&height=600&nologo=true`);
    } catch (error) {
      console.error("Error searching word:", error);
      alert("Failed to get word details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-3xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}>
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <Search className="text-blue-500" /> Word Explorer
      </h2>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchWord()}
            placeholder="Enter a word to explore..."
            className={`w-full p-4 rounded-xl border outline-none font-medium ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {isListening ? <MicOff size={18} className="text-red-500" /> : <Mic size={18} />}
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={searchWord}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Search size={18} />}
          Explore
        </motion.button>
      </div>

      <AnimatePresence>
        {wordDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
          >
            {imageUrl && (
              <div className="h-64 overflow-hidden">
                <img src={imageUrl} alt={wordDetails.word} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-3xl font-bold">{wordDetails.word}</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const u = new SpeechSynthesisUtterance(wordDetails.word);
                    u.lang = 'en-US';
                    window.speechSynthesis.speak(u);
                  }}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-800'}`}
                >
                  <Volume2 size={18} />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pronunciation</h4>
                  <p className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.pronunciation}</p>
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Part of Speech</h4>
                  <p className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.part_of_speech}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Definition</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.definition}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Synonyms</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.synonyms?.join(', ')}</p>
                </div>
                <div>
                  <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Antonyms</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.antonyms?.join(', ')}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Etymology</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{wordDetails.etymology}</p>
              </div>

              <div className="mb-4">
                <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Examples</h4>
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {wordDetails.examples?.map((example, idx) => (
                    <li key={idx} className="mb-1">{example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`font-bold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Common Phrases</h4>
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {wordDetails.phrases?.map((phrase, idx) => (
                    <li key={idx} className="mb-1">{phrase}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 8. Flashcard Game
const FlashcardGame = ({ words, darkMode }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);

  if (!words.length) return <div className="text-center p-10 opacity-50">No cards available. Add words in Admin.</div>;
  const current = words[index];

  const next = (known) => {
    if (known) {
      setKnownWords([...knownWords, current.id]);
    } else {
      setUnknownWords([...unknownWords, current.id]);
    }

    setFlipped(false);
    setTimeout(() => {
      if (index + 1 < words.length) {
        setIndex(index + 1);
      }
    }, 200);
  };

  const reset = () => {
    setIndex(0);
    setFlipped(false);
    setKnownWords([]);
    setUnknownWords([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] px-4">
      {index >= words.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center p-12 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2 }}
          >
            <Trophy size={64} className="mx-auto text-yellow-400 mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
          <p className="text-xl opacity-70 mb-8">You reviewed {words.length} words</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className="text-green-500 font-bold text-2xl">{knownWords.length}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Known</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <p className="text-red-500 font-bold text-2xl">{unknownWords.length}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Need Practice</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Start Over
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress:</span>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((index + 1) / words.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{index + 1}/{words.length}</span>
          </div>

          <div className="w-full max-w-sm aspect-[3/4] perspective-1000 cursor-pointer relative" onClick={() => setFlipped(!flipped)}>
            <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }} className="w-full h-full relative preserve-3d" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front */}
              <div className={`absolute inset-0 backface-hidden rounded-[2rem] shadow-2xl border p-8 flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6">{current.category}</span>
                <h2 className="text-4xl font-bold mb-2">{current.word}</h2>
                <p className="opacity-50 font-mono">{current.pronunciation}</p>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute bottom-8 text-xs opacity-50"
                >
                  Tap to flip
                </motion.p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 backface-hidden rounded-[2rem] shadow-2xl p-8 flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-blue-600 to-purple-600" style={{ transform: "rotateY(180deg)" }}>
                <h3 className="text-xl font-bold mb-4">{current.meaning}</h3>
                {current.hindi_meaning && <p className="text-yellow-300 font-bold mb-6">{current.hindi_meaning}</p>}
                <div className="bg-white/20 p-4 rounded-xl italic text-sm">"{current.example}"</div>
              </div>
            </motion.div>
          </div>

          <div className="flex gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => next(false)} className="p-4 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition"
            >
              <X size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => next(true)} className="p-4 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition"
            >
              <Check size={24} />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

// 9. Quiz Game
const QuizGame = ({ quizzes, darkMode }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!quizzes.length) return <div className="text-center p-10 opacity-50">No quizzes available yet. Add some in Admin!</div>;

  const currentQ = quizzes[qIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);

    if (option === currentQ.correct_option) setScore(score + 1);

    setTimeout(() => {
      if (qIndex + 1 < quizzes.length) {
        setQIndex(qIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`text-center p-12 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 2 }}
      >
        <Trophy size={64} className="mx-auto text-yellow-400 mb-6" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
      <p className="text-xl opacity-70 mb-8">You scored {score} out of {quizzes.length}</p>
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Score</span>
          <span className="text-sm font-medium">{Math.round((score / quizzes.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(score / quizzes.length) * 100}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setQIndex(0); setScore(0); setShowResult(false); setSelectedOption(null); setShowFeedback(false); }} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
      >
        Play Again
      </motion.button>
    </motion.div>
  );

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between mb-4 opacity-60 font-bold text-sm">
        <span>Question {qIndex + 1}/{quizzes.length}</span>
        <span>Score: {score}</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-8 rounded-3xl border mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}
      >
        <h3 className="text-xl font-bold mb-6">{currentQ.question}</h3>
        <div className="grid gap-3">
          {[currentQ.option_1, currentQ.option_2, currentQ.option_3, currentQ.option_4].map((opt, i) => {
            const isCorrect = opt === currentQ.correct_option;
            const isSelected = opt === selectedOption;

            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showFeedback && handleAnswer(opt)} disabled={showFeedback}
                className={`p-4 rounded-xl border text-left font-medium transition-all ${
                  showFeedback && isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : showFeedback && isSelected && !isCorrect
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : darkMode
                        ? 'border-gray-600 hover:bg-gray-700'
                        : 'border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 p-3 rounded-lg text-sm ${selectedOption === currentQ.correct_option ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {selectedOption === currentQ.correct_option ? 'Correct!' : `Incorrect. The correct answer is: ${currentQ.correct_option}`}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// 10. UNIFIED TIMELINE (WORDS + BLOGS)
const Timeline = ({ words, blogs, darkMode }) => {
  // 1. Merge and Tag Data
  const allItems = [
    ...words.map(w => ({ ...w, type: 'word', dateObj: new Date(w.created_at) })),
    ...blogs.map(b => ({ ...b, type: 'blog', dateObj: new Date(b.created_at) }))
  ];

  // 2. Sort Descending (Newest First)
  allItems.sort((a, b) => b.dateObj - a.dateObj);

  // 3. Group by Readable Date
  const groupedItems = allItems.reduce((acc, item) => {
    const dateStr = item.dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(item);
    return acc;
  }, {});

  const dates = Object.keys(groupedItems);

  if (dates.length === 0) return <div className="text-center p-10 opacity-50">Abhi tak kuch naya nahi hua.</div>;

  return (
    <div className="max-w-3xl mx-auto pl-2 md:pl-4">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Activity className="text-blue-500" /> Timeline History
      </h2>

      <div className="space-y-8">
        {dates.map((date, dateIdx) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dateIdx * 0.1 }}
            className="relative"
          >
            {/* Sticky Header */}
            <div className={`sticky top-24 z-10 inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
              {date}
            </div>

            <div className="ml-4 border-l-2 border-dashed border-gray-300 dark:border-gray-800 space-y-6 pb-6">
              {groupedItems[date].map((item, idx) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8"
                >
                  {/* Icon Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, repeatDelay: 2 }}
                    className={`absolute -left-[11px] top-0 w-6 h-6 rounded-full border-4 flex items-center justify-center shadow-sm z-10 ${
                      item.type === 'word'
                        ? 'bg-purple-100 border-purple-500 text-purple-600 dark:bg-purple-900 dark:border-purple-600 dark:text-purple-300'
                        : 'bg-blue-100 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-300'
                    }`}
                  >
                    {item.type === 'word' ? <Sparkles size={10} fill="currentColor" /> : <FileText size={10} fill="currentColor" />}
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`p-5 rounded-2xl border transition-all hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide ${
                        item.type === 'word' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300' : 'bg-blue-500/10 text-blue-600 dark:text-blue-300'
                      }`}>
                        {item.type === 'word' ? 'New Word' : 'Blog Post'}
                      </span>
                      <span className="text-xs font-mono opacity-40">
                        {item.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {item.type === 'word' ? (
                      <div>
                        <h4 className="text-xl font-bold">{item.word}</h4>
                        <p className={`text-sm mt-1 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.meaning}</p>
                        {item.hindi_meaning && <p className="text-sm font-medium text-green-500 mt-2 bg-green-500/10 px-2 py-1 rounded inline-block">🇮🇳 {item.hindi_meaning}</p>}
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-xl font-bold">{item.title}</h4>
                        <p className={`text-sm mt-1 line-clamp-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.excerpt || "Click to read full article..."}</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 11. AI Chatbot
const AIChatbot = ({ darkMode, apiKey, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your AI language assistant. I can help you with grammar, vocabulary, and more. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: "You are a helpful English language tutor. Provide clear, concise answers about grammar, vocabulary, pronunciation, and language learning. If asked to check grammar, identify errors and provide corrections." }] },
            ...messages.map(msg => ({ parts: [{ text: `${msg.role}: ${msg.content}` }] })),
            { parts: [{ text: `user: ${input}` }] }
          ]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-20 right-4 w-80 h-96 rounded-2xl shadow-2xl border flex flex-col ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-50`}
    >
      <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="font-bold flex items-center gap-2">
          <MessageCircle size={18} className="text-blue-500" />
          AI Assistant
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose} className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <X size={18} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Loader size={16} className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className={`flex-1 p-2 rounded-full border outline-none text-sm ${darkMode ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            disabled={loading}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// --- ADMIN PANEL ---
const AdminDashboard = ({ apiKey, setApiKey, onAutoGenerate, addWordManual, addBlogManual, addQuizManual, deleteData, dbStatus, refreshDb, darkMode, words, blogs, quizzes }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [adminTab, setAdminTab] = useState('words');

  // Forms
  const [manualWord, setManualWord] = useState({ word: '', meaning: '', hindi_meaning: '', example: '', category: 'General' });
  const [manualBlog, setManualBlog] = useState({ title: '', excerpt: '', content: '', image_url: '' });
  const [manualQuiz, setManualQuiz] = useState({ question: '', option_1: '', option_2: '', option_3: '', option_4: '', correct_option: '' });

  const handleLogin = (e) => { e.preventDefault(); if (password === ADMIN_PASS) setIsUnlocked(true); else alert("Wrong password!"); };

  if (!isUnlocked) return (
    <div className="flex flex-col items-center justify-center h-[50vh] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-sm p-8 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-xl'}`}
      >
        <Lock className="mx-auto mb-4 text-blue-500" size={40} />
        <h2 className="text-2xl font-bold text-center mb-6">Admin Locked</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" placeholder="Pass: aryan1717" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-4 rounded-xl border outline-none text-center tracking-widest ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`} />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-4 rounded-xl font-bold"
          >
            Unlock
          </motion.button>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center gap-2 border-b pb-4 overflow-x-auto border-gray-200 dark:border-gray-800">
        {['words', 'blogs', 'quizzes', 'settings'].map(t => (
          <motion.button
            key={t}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAdminTab(t)} className={`px-6 py-2 rounded-full font-bold capitalize whitespace-nowrap transition-all ${adminTab === t ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
          >
            {t === 'words' ? 'Flashcards Manager' : t}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {adminTab === 'words' && (
          <motion.div
            key="words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl border h-fit ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-purple-50 border-purple-100'}`}
            >
              <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles size={20} className="text-purple-500" /> AI Auto-Gen</h3>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAutoGenerate} className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-transform active:scale-95"
              >
                <RefreshCw size={20} /> Generate Words
              </motion.button>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <h3 className="font-bold mb-6 flex items-center gap-2"><PenTool size={20} /> Add Flashcard (Manual)</h3>
              <div className="space-y-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Word"
                  value={manualWord.word}
                  onChange={e => setManualWord({ ...manualWord, word: e.target.value })}
                  className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Meaning"
                  value={manualWord.meaning}
                  onChange={e => setManualWord({ ...manualWord, meaning: e.target.value })}
                  className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Example"
                  value={manualWord.example}
                  onChange={e => setManualWord({ ...manualWord, example: e.target.value })}
                  className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { addWordManual(manualWord); setManualWord({ word: '', meaning: '', hindi_meaning: '', example: '', category: 'General' }) }} className="w-full bg-black text-white py-3 rounded-xl font-bold"
                >
                  Add Flashcard
                </motion.button>
              </div>
            </motion.div>
            <div className="md:col-span-2 max-h-96 overflow-y-auto border rounded-3xl">
              {words.map((w, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={w.id} className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <span className="font-bold">{w.word}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteData('words', w.id)} className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {adminTab === 'quizzes' && (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <h3 className="font-bold mb-6 flex items-center gap-2"><Brain size={20} /> Create Quiz Question</h3>
              <div className="space-y-4 max-w-2xl">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Question?"
                  value={manualQuiz.question}
                  onChange={e => setManualQuiz({ ...manualQuiz, question: e.target.value })}
                  className={`input-field font-bold ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Option 1"
                    value={manualQuiz.option_1}
                    onChange={e => setManualQuiz({ ...manualQuiz, option_1: e.target.value })}
                    className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Option 2"
                    value={manualQuiz.option_2}
                    onChange={e => setManualQuiz({ ...manualQuiz, option_2: e.target.value })}
                    className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Option 3"
                    value={manualQuiz.option_3}
                    onChange={e => setManualQuiz({ ...manualQuiz, option_3: e.target.value })}
                    className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    placeholder="Option 4"
                    value={manualQuiz.option_4}
                    onChange={e => setManualQuiz({ ...manualQuiz, option_4: e.target.value })}
                    className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                  />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Correct Option (Copy exact text)"
                  value={manualQuiz.correct_option}
                  onChange={e => setManualQuiz({ ...manualQuiz, correct_option: e.target.value })}
                  className={`input-field border-green-500 ${darkMode ? 'bg-gray-900' : ''}`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { addQuizManual(manualQuiz); setManualQuiz({ question: '', option_1: '', option_2: '', option_3: '', option_4: '', correct_option: '' }) }} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
                >
                  Add Question
                </motion.button>
              </div>
            </motion.div>
            <div className="max-h-96 overflow-y-auto border rounded-3xl">
              {quizzes.map((q, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={q.id} className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <span className="font-bold truncate max-w-xs">{q.question}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteData('quizzes', q.id)} className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {adminTab === 'blogs' && (
          <motion.div
            key="blogs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              <h3 className="font-bold mb-6">Write Article</h3>
              <div className="space-y-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Title"
                  value={manualBlog.title}
                  onChange={e => setManualBlog({ ...manualBlog, title: e.target.value })}
                  className={`input-field ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Content"
                  value={manualBlog.content}
                  onChange={e => setManualBlog({ ...manualBlog, content: e.target.value })}
                  className={`input-field h-32 ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { addBlogManual(manualBlog); setManualBlog({ title: '', excerpt: '', content: '', image_url: '' }) }} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
                >
                  Publish
                </motion.button>
              </div>
            </motion.div>
            <div className="max-h-96 overflow-y-auto border rounded-3xl">
              {blogs.map((b, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={b.id} className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}
                >
                  <span className="font-bold">{b.title}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteData('blogs', b.id)} className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {adminTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-6 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}
          >
            <h3 className="font-bold mb-4">Settings (Preserved)</h3>
            <p className="text-sm opacity-50 mb-4">You can set your keys here, but for public access, please edit the code file variables.</p>
            <input id="sb_url" defaultValue={localStorage.getItem('sb_url')} placeholder="URL" className={`input-field mb-2 ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`} />
            <input id="sb_key" defaultValue={localStorage.getItem('sb_key')} type="password" placeholder="Key" className={`input-field mb-2 ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`} />
            <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" placeholder="Gemini Key" className={`input-field mb-4 ${darkMode ? 'bg-gray-900 border-gray-600' : ''}`} />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { localStorage.setItem('sb_url', document.getElementById('sb_url').value); localStorage.setItem('sb_key', document.getElementById('sb_key').value); refreshDb(); }} className="btn-primary w-full bg-black text-white py-3 rounded-xl font-bold"
            >
              Save Settings
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [user, setUser] = useState(null);
  const [words, setWords] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supabase, setSupabase] = useState(null);
  // Use the default Gemini API key if no key is in localStorage
    // Use the default Gemini API key if no key is in localStorage
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || DEFAULT_GEMINI_KEY);
  const [libsLoaded, setLibsLoaded] = useState(false);
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [showBlogReader, setShowBlogReader] = useState(false);

  useEffect(() => {
    const loadLibs = async () => {
      if (window.supabase) {
        setLibsLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.onload = () => setLibsLoaded(true);
      document.body.appendChild(script);
    };
    loadLibs();
    const savedUser = localStorage.getItem('lexi_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedBookmarks = localStorage.getItem('bookmarked_words');
    if (savedBookmarks) setBookmarkedWords(JSON.parse(savedBookmarks));
  }, []);

  useEffect(() => { if (libsLoaded) initSupabase(); }, [libsLoaded]);
  useEffect(() => { localStorage.setItem('gemini_key', apiKey); }, [apiKey]);
  useEffect(() => { document.body.className = darkMode ? 'bg-gray-950' : 'bg-gray-50'; }, [darkMode]);
  useEffect(() => { localStorage.setItem('bookmarked_words', JSON.stringify(bookmarkedWords)); }, [bookmarkedWords]);

  const initSupabase = () => {
    // Priority: Code Variables -> Local Storage
    const url = DEFAULT_SB_URL || localStorage.getItem('sb_url');
    const key = DEFAULT_SB_KEY || localStorage.getItem('sb_key');

    if (url && key && window.supabase) {
      const client = window.supabase.createClient(url, key);
      setSupabase(client);
      fetchData(client);
    } else {
      setLoading(false);
    }
  };

  const fetchData = async (client) => {
    setLoading(true);
    try { const { data } = await client.from('words').select('*').order('created_at', { ascending: false }); if (data) setWords(data); } catch (e) { }
    try { const { data } = await client.from('blogs').select('*').order('created_at', { ascending: false }); if (data) setBlogs(data); } catch (e) { }
    try { const { data } = await client.from('quizzes').select('*').order('created_at', { ascending: false }); if (data) setQuizzes(data); } catch (e) { }
    setLoading(false);
  };

  const generateWordsViaAI = async (clientToUse = supabase) => {
    if (!apiKey) return alert("Missing API Key");
    try {
      const prompt = `Generate 2 advanced words. JSON array: { "word": "...", "meaning": "...", "hindi_meaning": "...", "pronunciation": "/.../", "example": "...", "category": "..." }`;
      const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
      const res = await result.json();
      let txt = res.candidates?.[0]?.content?.parts?.[0]?.text.replace(/```json/g, '').replace(/```/g, '');
      const { data, error } = await clientToUse.from('words').insert(JSON.parse(txt)).select();
      if (!error && data) { setWords([...data, ...words]); alert("Generated!"); }
    } catch (e) { alert("AI Error"); }
  };

  const getWordAIDetails = async (word) => {
    if (!apiKey) return "No API key provided";

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Provide interesting facts and etymology about the word "${word}" in 2-3 sentences.also in hindi and english ` }] }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No information available";
    } catch (error) {
      console.error("Error getting word details:", error);
      return "Failed to get information";
    }
  };

  const addWordManual = async (d) => {
    if (!supabase) return;
    const { data, error } = await supabase.from('words').insert([d]).select();
    if (!error) setWords([data[0], ...words]);
  };

  const addBlogManual = async (d) => {
    if (!supabase) return;
    const { data, error } = await supabase.from('blogs').insert([d]).select();
    if (!error) setBlogs([data[0], ...blogs]);
  };

  const addQuizManual = async (d) => {
    if (!supabase) return;
    const { data, error } = await supabase.from('quizzes').insert([d]).select();
    if (!error) setQuizzes([data[0], ...quizzes]);
  };

  const deleteData = async (table, id) => {
    if (!supabase || !window.confirm("Sure?")) return;
    await supabase.from(table).delete().eq('id', id);
    fetchData(supabase);
  };

  const handleUserLogin = async (name, email) => {
    if (!supabase) return alert("Database Disconnected. Please add keys.");
    try {
      let { data, error } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
      if (!data) {
        const { data: newUser, error: createError } = await supabase.from('users').insert([{ name, email }]).select().single();
        if (createError) throw createError;
        data = newUser;
      }
      setUser(data);
      localStorage.setItem('lexi_user', JSON.stringify(data));
      setShowLogin(false);
    } catch (e) {
      console.error(e);
      alert("Login Failed: " + e.message);
    }
  };

  const toggleBookmark = (wordId) => {
    if (bookmarkedWords.includes(wordId)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== wordId));
    } else {
      setBookmarkedWords([...bookmarkedWords, wordId]);
    }
  };

  const handleReadBlog = (blog) => {
    setCurrentBlog(blog);
    setShowBlogReader(true);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'text-white bg-gray-950' : 'text-gray-900 bg-gray-50'}`}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap'); body { font-family: 'Outfit', sans-serif; } .input-field { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #374151; outline: none; transition: all 0.2s; } .no-scrollbar::-webkit-scrollbar { display: none; } .preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; }`}</style>
      <AnimatePresence>{showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleUserLogin} darkMode={darkMode} />}</AnimatePresence>
      <AnimatePresence>{showBlogReader && <BlogReader blog={currentBlog} onClose={() => setShowBlogReader(false)} darkMode={darkMode} apiKey={apiKey} />}</AnimatePresence>
      <AnimatePresence>{showChatbot && <AIChatbot darkMode={darkMode} apiKey={apiKey} onClose={() => setShowChatbot(false)} />}</AnimatePresence>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} toggleChatbot={() => setShowChatbot(!showChatbot)} showChatbot={showChatbot} />
      <Header user={user} darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} setShowLogin={() => setShowLogin(true)} />

      <main className="px-4 pb-20 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" {...pageTransition} className="space-y-12">
              {/* Hero */}
              <div className={`p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-2xl ${darkMode ? 'bg-indigo-900' : 'bg-indigo-600'} text-white`}>
                <div className="relative z-10 max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Master English,<br/>One Day at a Time.</h1>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('flashcards')} className="bg-white text-indigo-700 px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                      Start Learning
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('word-explorer')} className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                      Explore Words
                    </motion.button>
                  </div>
                </div>
              </div>

              {!supabase && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 text-red-500 p-4 rounded-xl border border-red-500/30 flex items-center gap-3"
                >
                  <AlertTriangle />
                  <div>
                    <strong>Database Disconnected!</strong><br />
                    Please edit <code>lexiflow_ultimate.jsx</code> and add your <code>DEFAULT_SB_URL</code> and <code>DEFAULT_SB_KEY</code> at the top.
                  </div>
                </motion.div>
              )}

              {/* Word Explorer */}
              <WordExplorer darkMode={darkMode} apiKey={apiKey} />

              {/* Daily Words */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Sparkles className="text-amber-500" /> Today's Picks</h2>
                {loading ? <div className="opacity-50">Loading...</div> : <div className="grid md:grid-cols-2 gap-6">{words.slice(0, 2).map((w, i) => <WordCard key={w.id || i} word={w} darkMode={darkMode} onBookmark={toggleBookmark} isBookmarked={bookmarkedWords.includes(w.id)} onGetAIDetails={getWordAIDetails} />)}</div>}
              </div>
              {/* Blogs */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Globe className="text-blue-500" /> Reads</h2>
                <div className="grid md:grid-cols-3 gap-6">{blogs.slice(0, 3).map(b => <BlogCard key={b.id} blog={b} darkMode={darkMode} onRead={handleReadBlog} />)}</div>
              </div>
            </motion.div>
          )}
          {activeTab === 'word-explorer' && <motion.div key="word-explorer" {...pageTransition}><WordExplorer darkMode={darkMode} apiKey={apiKey} /></motion.div>}
          {activeTab === 'blogs' && <motion.div key="blogs" {...pageTransition} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{blogs.map(b => <BlogCard key={b.id} blog={b} darkMode={darkMode} onRead={handleReadBlog} />)}</motion.div>}
          {activeTab === 'flashcards' && <motion.div key="fc" {...pageTransition}><FlashcardGame words={words} darkMode={darkMode} /></motion.div>}
          {activeTab === 'timeline' && <motion.div key="tl" {...pageTransition}><Timeline words={words} blogs={blogs} darkMode={darkMode} /></motion.div>}
          {activeTab === 'quiz' && <motion.div key="quiz" {...pageTransition}><QuizGame quizzes={quizzes} darkMode={darkMode} /></motion.div>}
          {activeTab === 'admin' && <motion.div key="admin" {...pageTransition}><AdminDashboard apiKey={apiKey} setApiKey={setApiKey} onAutoGenerate={() => generateWordsViaAI(supabase)} addWordManual={addWordManual} addBlogManual={addBlogManual} addQuizManual={addQuizManual} deleteData={deleteData} words={words} blogs={blogs} quizzes={quizzes} dbStatus={!!supabase} refreshDb={initSupabase} darkMode={darkMode} /></motion.div>}
        </AnimatePresence>
      </main>
    </div>
  );
}