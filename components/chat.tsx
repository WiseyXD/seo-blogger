"use client";
import React from "react";
import { useChat } from "ai/react";
import { SendIcon, User, Bot, Globe2 } from "lucide-react";

export default function BlogChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const languages = [
    "English",
    "Hindi",
    "Russian",
    "Korean",
    "Japanese",
    "French",
    "Italian",
    "Chinese",
  ];

  const renderMessage = (message: any) => {
    if (message.role === "assistant") {
      try {
        // Attempt to parse the content as JSON to check if it contains multiple languages
        const content = JSON.parse(message.content);
        return (
          <div className="space-y-4">
            {languages.map((lang, index) => (
              <div
                key={lang}
                className="border-b border-gray-200 dark:border-zinc-700 pb-4 last:border-0"
              >
                <div className="font-medium flex items-center gap-2 mb-2">
                  <Globe2 className="w-4 h-4" />
                  {lang}
                </div>
                <div className="whitespace-pre-wrap">{content[lang]}</div>
              </div>
            ))}
          </div>
        );
      } catch {
        // If parsing fails, render as regular message
        return <div className="whitespace-pre-wrap">{message.content}</div>;
      }
    }
    return <div className="whitespace-pre-wrap">{message.content}</div>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-blue-500" />
            Multilingual Blog Generator
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Generate blog content in 8 different languages with a single prompt
          </p>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 pt-24 pb-24">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role !== "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-3 max-w-[85%] ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700"
                }`}
              >
                {renderMessage(message)}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 pl-12">
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-200" />
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              className="flex-1 rounded-lg px-4 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={input}
              placeholder="Enter a topic or keyword for your blog posts..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
