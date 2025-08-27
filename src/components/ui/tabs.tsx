"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("bg-white rounded-lg border border-gray-200 overflow-hidden", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { children?: React.ReactNode }) {
  return (
    <div className="bg-gray-100 px-2 sm:px-4 py-2 border-b border-gray-200 flex items-center space-x-2 sm:space-x-4">
      {/* Window controls */}
      <div className="flex space-x-1 sm:space-x-2">
        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-400"></div>
        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-400"></div>
        <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-400"></div>
      </div>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn("flex space-x-1 overflow-x-auto", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </div>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "px-2 sm:px-4 py-1 rounded-t text-xs sm:text-sm font-medium transition-colors whitespace-nowrap data-[state=active]:bg-white data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-t data-[state=active]:border-gray-200 data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 hover:bg-gray-300",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("p-4 sm:p-6 lg:p-8", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
