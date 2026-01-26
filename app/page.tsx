"use client"

import { Filebar } from "@/components/Filebar"
import { Toolbar } from "@/components/Toolbar"
import { AICopilot } from "@/components/AICopilot"
import { Browser } from "@/components/Browser"

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#1e1e1e]">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <Filebar />
        <Browser />
        <AICopilot />
      </div>
    </div>
  )
}
