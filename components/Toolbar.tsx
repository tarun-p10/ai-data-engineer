"use client"

import React from "react"
import { Menu, Minimize2, Maximize2, X, Settings, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Toolbar: React.FC = () => {
  return (
    <div className="h-12 bg-[#2d2d30] border-b border-border flex items-center justify-between px-4 drag-region">
      <div className="flex items-center gap-2 flex-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Menu className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search or run command..."
            className="h-8 bg-[#3c3c3c] border-border text-sm flex-1"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-0 ml-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-[#3c3c3c]">
            <Minimize2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-[#3c3c3c]">
            <Maximize2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none hover:bg-red-600">
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
