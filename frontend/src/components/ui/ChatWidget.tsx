/**
 * RAG Chatbot Widget
 * Connects to backend API for Q&A about book content
 */

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    chapter: string;
    section: string;
    score: number;
  }>;
}

interface ChatWidgetProps {
  chapterId?: string;
  backendUrl?: string;
}

export function ChatWidget({ chapterId, backendUrl = 'http://localhost:7860' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for text selection
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim() || '';
      
      if (selectedText.length > 10) {
        setSelectedText(selectedText);
      }
    };

    document.addEventListener('selectionchange', handleTextSelection);
    return () => document.removeEventListener('selectionchange', handleTextSelection);
  }, []);

  const sendMessage = async (messageText: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          selected_text: selectedText || undefined,
          chapter_context: chapterId || undefined,
          chat_history: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          sources: data.sources,
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please make sure the backend is running and try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
      setSelectedText('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    sendMessage(input);
  };

  const handleAskAboutSelection = () => {
    if (!selectedText) return;
    
    const question = `Can you explain this passage: "${selectedText.substring(0, 100)}..."`;
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    sendMessage(question);
  };

  return (
    <div className={styles.chatWidget}>
      {/* Chat Toggle Button */}
      <button
        className={clsx(styles.toggleButton, isOpen && styles.isOpen)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className={styles.icon}>✕</span>
        ) : (
          <span className={styles.icon}>💬</span>
        )}
        {!isOpen && <span className={styles.badge}>AI</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.title}>📚 Book Assistant</h3>
            <p className={styles.subtitle}>Ask me anything about this chapter</p>
          </div>

          {/* Selected Text Prompt */}
          {selectedText && (
            <div className={styles.selectionPrompt}>
              <p className={styles.selectionText}>
                Text selected: "{selectedText.substring(0, 80)}..."
              </p>
              <button
                className={styles.askButton}
                onClick={handleAskAboutSelection}
              >
                Ask about this
              </button>
            </div>
          )}

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyIcon}>👋</p>
                <p className={styles.emptyText}>
                  Hi! I'm your AI assistant for this book.
                </p>
                <p className={styles.emptySubtext}>
                  Ask me questions or select text to get explanations.
                </p>
                <div className={styles.suggestions}>
                  <button
                    className={styles.suggestion}
                    onClick={() => sendMessage('What are the key points of this chapter?')}
                  >
                    What are the key points?
                  </button>
                  <button
                    className={styles.suggestion}
                    onClick={() => sendMessage('Can you give me a practical example?')}
                  >
                    Give me an example
                  </button>
                  <button
                    className={styles.suggestion}
                    onClick={() => sendMessage('How do I apply this in real life?')}
                  >
                    How to apply this?
                  </button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={clsx(
                      styles.message,
                      message.role === 'user' && styles.messageUser,
                      message.role === 'assistant' && styles.messageAssistant
                    )}
                  >
                    <div className={styles.messageContent}>{message.content}</div>
                    {message.sources && message.sources.length > 0 && (
                      <div className={styles.sources}>
                        <p className={styles.sourcesTitle}>Sources:</p>
                        {message.sources.map((source, i) => (
                          <div key={i} className={styles.source}>
                            <span className={styles.sourceChapter}>{source.chapter}</span>
                            <span className={styles.sourceSection}>{source.section}</span>
                            <span className={styles.sourceScore}>
                              {(source.score * 100).toFixed(0)}% match
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className={clsx(styles.message, styles.messageAssistant)}>
                    <div className={styles.loadingDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Form */}
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about the book..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className={clsx(styles.sendButton, isLoading && styles.disabled)}
              disabled={isLoading || !input.trim()}
            >
              <span>➤</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
