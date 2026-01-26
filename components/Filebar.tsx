"use client"

import React, { useState } from "react"
import { File, Folder, ChevronRight, ChevronDown, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
}

const mockFiles: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.tsx", type: "file" },
          { name: "Input.tsx", type: "file" },
        ],
      },
      { name: "App.tsx", type: "file" },
      { name: "index.tsx", type: "file" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "favicon.ico", type: "file" },
      { name: "logo.png", type: "file" },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
  { name: "tsconfig.json", type: "file" },
]

interface FileItemProps {
  node: FileNode
  level: number
  selectedFile?: string
  onFileSelect: (path: string) => void
  expandedFolders: Set<string>
  onToggleFolder: (path: string) => void
  path: string
}

const FileItem: React.FC<FileItemProps> = ({
  node,
  level,
  selectedFile,
  onFileSelect,
  expandedFolders,
  onToggleFolder,
  path,
}) => {
  const isExpanded = expandedFolders.has(path)
  const isSelected = selectedFile === path

  const handleClick = () => {
    if (node.type === "folder") {
      onToggleFolder(path)
    } else {
      onFileSelect(path)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-accent rounded-sm text-sm",
          isSelected && "bg-accent"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === "folder" && (
          <span className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </span>
        )}
        {node.type === "file" && <span className="w-4" />}
        {node.type === "folder" ? (
          <Folder className="w-4 h-4 text-blue-500" />
        ) : (
          <File className="w-4 h-4 text-gray-400" />
        )}
        <span className="ml-1 truncate">{node.name}</span>
      </div>
      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileItem
              key={child.name}
              node={child}
              level={level + 1}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
              path={`${path}/${child.name}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const Filebar: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>()
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["/src", "/src/components"])
  )
  const [searchQuery, setSearchQuery] = useState("")

  const handleToggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileSelect = (path: string) => {
    setSelectedFile(path)
  }

  return (
    <div className="w-64 h-full bg-[#1e1e1e] border-r border-border flex flex-col">
      <div className="p-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 bg-[#252526] border-border text-sm"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-2">
          {mockFiles.map((file) => (
            <FileItem
              key={file.name}
              node={file}
              level={0}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
              expandedFolders={expandedFolders}
              onToggleFolder={handleToggleFolder}
              path={`/${file.name}`}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
