"use client"

import React, { useState } from "react"
import { ArrowLeft, ArrowRight, RefreshCw, Home, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Tab {
  id: string
  title: string
  content: string
  type: "code" | "browser"
}

export const Browser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "1",
      title: "App.tsx",
      content: `import React from 'react';

export default function App() {
  return (
    <div className="container">
      <h1>Welcome to Cursor Clone</h1>
      <p>This is a code editor view.</p>
    </div>
  );
}`,
      type: "code",
    },
  ])
  const [activeTab, setActiveTab] = useState("1")
  const [url, setUrl] = useState("https://example.com")

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="flex-1 h-full flex flex-col bg-[#1e1e1e]">
      <div className="h-10 bg-[#2d2d30] border-b border-border flex items-center gap-2 px-2">
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs rounded-t-md border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1e1e1e] border-blue-500 text-white"
                  : "bg-[#2d2d30] border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Code className="w-3 h-3" />
                {tab.title}
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowLeft className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowRight className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Home className="w-3 h-3" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {activeTabData?.type === "code" ? (
          <div className="h-full bg-[#1e1e1e] p-4">
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
              <code>{activeTabData.content}</code>
            </pre>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-12 bg-[#2d2d30] border-b border-border flex items-center gap-2 px-4">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 h-8 bg-[#3c3c3c] border-border text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Handle navigation
                  }
                }}
              />
            </div>
            <div className="flex-1 bg-white p-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Example Domain</h1>
                <p className="text-gray-700 mb-4">
                  This is a placeholder browser view. In a real implementation,
                  this would render actual web content.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
