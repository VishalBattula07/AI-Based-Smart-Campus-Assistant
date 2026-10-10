import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  History,
  Trash2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { campusService } from '../services/campusService';
import { useAuth } from '../context/AuthContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef(null);

  const initialPrompts = [
    { title: 'Show my timetable', desc: 'Today’s lectures, room numbers & timings' },
    { title: 'Check my attendance', desc: 'Subject-wise breakdown and 75% cutoff status' },
    { title: 'Upcoming examinations', desc: 'Ratified dates, venue blocks and seat numbers' },
    { title: 'Find a faculty member', desc: 'Office room numbers and consultation hours' },
    { title: 'What events are happening?', desc: 'Hackathons, guest seminars and deadlines' },
    { title: 'Central Library status', desc: '24/7 hours and study pod occupancy' },
  ];

  const [historySessions, setHistorySessions] = useState([
    { id: 'sess_1', title: 'Midterm Timetable & Venues', date: 'Today' },
    { id: 'sess_2', title: 'Cybersecurity Attendance Shortfall', date: 'Yesterday' },
    { id: 'sess_3', title: 'Dr. Evelyn Reed Office Consultation', date: 'Oct 08' },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I am **CampusIQ**, your university AI copilot. I am directly synchronized with your university's Student Information System, Academic ERP, and examination cell.\n\nAsk me anything about your lectures, faculty cabins, attendance, or upcoming campus events!`,
      verified: true,
      source: 'Campus Academic Knowledge Graph v2.4',
      time: 'Just now',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Auto handle query param if navigated with ?q=...
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      handleSendMessage(query);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: text,
      time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const response = await campusService.queryAIAssistant(text, messages);

      const aiMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'assistant',
        text: response.answer,
        verified: response.verified !== false,
        source: response.source || 'Campus Knowledge System',
        suggestedActions: response.suggestedActions || [],
        time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date()),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: 'msg_err_' + Date.now(),
        sender: 'assistant',
        text: 'I could not connect to the campus reasoning service. Please check your network and retry.',
        isError: true,
        verified: false,
        time: 'Error',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg_reset',
        sender: 'assistant',
        text: 'Chat history cleared. How can I help you next?',
        verified: true,
        source: 'Campus Knowledge Core',
        time: 'Just now',
      },
    ]);
  };

  // Basic markdown-like parser for clean presentation
  const renderFormattedText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="md-h3">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={idx} className="md-quote">{line.replace('> ', '')}</blockquote>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <li key={idx} className="md-list-item">
            {formatBold(content)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="md-ordered-item">
            {formatBold(line)}
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="md-spacing"></div>;
      }
      return <p key={idx} className="md-p">{formatBold(line)}</p>;
    });
  };

  const formatBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="md-inline-code">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="ai-chat-interface">
      {/* Collapsible Chat History Sidebar */}
      <aside className={`chat-history-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="history-sidebar-header">
          <div className="history-title-wrap">
            <History size={16} />
            <span>Chat Sessions</span>
          </div>
          <button
            className="history-toggle-btn"
            onClick={() => setSidebarOpen(false)}
            title="Collapse history"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <button className="new-chat-btn" onClick={clearChat}>
          <Sparkles size={15} />
          <span>Start New Conversation</span>
        </button>

        <div className="history-sessions-list">
          <span className="history-group-tag">Recent Inquiries</span>
          {historySessions.map((session) => (
            <div key={session.id} className="history-session-item">
              <span className="session-title">{session.title}</span>
              <span className="session-date">{session.date}</span>
            </div>
          ))}
        </div>

        <div className="history-sidebar-footer">
          <button className="clear-history-action" onClick={clearChat}>
            <Trash2 size={14} />
            <span>Clear active chat</span>
          </button>
        </div>
      </aside>

      {/* Main Conversational Container */}
      <div className="chat-main-container">
        {/* Chat Header */}
        <header className="chat-interface-header">
          <div className="chat-header-left">
            {!sidebarOpen && (
              <button
                className="reopen-sidebar-btn"
                onClick={() => setSidebarOpen(true)}
                title="Expand chat history"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}

            <div className="chat-ai-avatar">
              <Bot size={20} />
              <span className="online-indicator"></span>
            </div>
            <div>
              <div className="chat-agent-title">
                CampusIQ Autonomous Copilot
                <span className="badge badge-indigo">v2.4 Live</span>
              </div>
              <div className="chat-agent-meta">
                Verified against Fall 2026 ERP, SIS & Faculty Database
              </div>
            </div>
          </div>

          <div className="chat-header-actions">
            <button className="btn btn-outline btn-sm" onClick={clearChat}>
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="chat-messages-scroll">
          {messages.length === 1 && (
            <div className="chat-welcome-suggested">
              <div className="suggested-intro">
                <Sparkles size={22} className="sparkle-accent" />
                <h3>What would you like to check today?</h3>
                <p>Click on any prompt or type your query in natural language.</p>
              </div>

              <div className="suggested-prompts-matrix">
                {initialPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    className="suggested-card"
                    onClick={() => handleSendMessage(p.title)}
                  >
                    <div className="s-card-title">{p.title}</div>
                    <div className="s-card-desc">{p.desc}</div>
                    <ChevronRight size={14} className="s-card-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`message-bubble-row ${isUser ? 'user-row' : 'assistant-row'}`}
              >
                <div className="message-avatar">
                  {isUser ? (
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt="User"
                    />
                  ) : (
                    <div className="ai-icon-circle">
                      <Sparkles size={16} />
                    </div>
                  )}
                </div>

                <div className="message-content-wrapper">
                  <div className="message-bubble">
                    <div className="message-body">
                      {renderFormattedText(msg.text)}
                    </div>

                    {!isUser && msg.verified !== undefined && (
                      <div className="message-verification-bar">
                        {msg.verified ? (
                          <div className="verification-pill verified">
                            <ShieldCheck size={13} />
                            <span>Verified from: {msg.source}</span>
                          </div>
                        ) : (
                          <div className="verification-pill unverified">
                            <AlertCircle size={13} />
                            <span>Cannot verify against live SIS: Estimated query</span>
                          </div>
                        )}

                        <button
                          className="copy-btn"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                        >
                          {copiedId === msg.id ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                      </div>
                    )}

                    {!isUser && msg.suggestedActions?.length > 0 && (
                      <div className="suggested-actions-row">
                        {msg.suggestedActions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            className="sub-action-chip"
                            onClick={() => handleSendMessage(act)}
                          >
                            <span>{act}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="message-timestamp">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="message-bubble-row assistant-row">
              <div className="message-avatar">
                <div className="ai-icon-circle">
                  <Sparkles size={16} />
                </div>
              </div>
              <div className="message-bubble loading-bubble">
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
                <span className="loading-text">CampusIQ is synthesizing verified campus records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="chat-input-form"
          >
            <textarea
              className="chat-textarea"
              placeholder="Ask about timetable, attendance cutoff, faculty cabin, exam dates... (Press Enter to send)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="chat-footer-disclaimer">
            CampusIQ uses verified academic schemas. For official grade appeals, refer to the Controller of Examinations.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
