"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string().min(10, "Please tell us more about your interest (minimum 10 characters)"),
  experience: z.string().optional(),
  newsletter: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [activeTab, setActiveTab] = useState("solution")
  const [formTab, setFormTab] = useState("application")

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interest: "",
      experience: "",
      newsletter: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log("Application submitted successfully:", result)
        setSubmitted(true)
        // Show success popup and switch to community tab
        setShowSuccessPopup(true)
        setFormTab("community")
        // Hide popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 3000)
      } else {
        console.error("Submission failed:", result)
        // You could add error handling here if needed
        alert("There was an error submitting your application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Success Dialog */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <DialogTitle className="text-center font-mono">
              Application Submitted!
            </DialogTitle>
            <DialogDescription className="text-center font-mono">
                              Thank you for your interest. We&apos;ll be in touch soon!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <main className="container mx-auto px-4 py-12">
        {/* Organization Header - Clean Style */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 font-mono">
              &gt; Thinkin&apos; Rocks
            </h1>
                          <span className="bg-green-400 w-3 h-12 md:h-16 animate-blink ml-2"></span>
          </div>
          <p className="text-lg text-gray-600 font-mono max-w-2xl mx-auto">
            {/* Democratizing access to technology infrastructure */}
          </p>
        </header>

        {/* Problem & Solution Window */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200  overflow-hidden">
              {/* Window Header with Tabs */}
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    className={`px-4 py-1 rounded-t text-sm font-medium transition-colors ${
                      activeTab === "problem" 
                        ? "bg-white border-l border-r border-t border-gray-200" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("problem")}
                  >
                    problem.md
                  </button>
                  <button 
                    className={`px-4 py-1 rounded-t text-sm font-medium transition-colors ${
                      activeTab === "solution" 
                        ? "bg-white border-l border-r border-t border-gray-200" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("solution")}
                  >
                    solution.md
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="h-96 overflow-y-auto">
                <div className="p-8">
                  {/* Tab Content */}
                  {activeTab === "problem" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-mono">
                        # The Problem
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                          Today&apos;s technology landscape is dominated by monopolies. <strong>Cloud & compute resources</strong> are controlled by big tech, 
                          while <strong>robotics & lab infrastructure</strong> remain locked behind university and corporate walls. Even community-driven 
                          hacklabs and makerspaces struggle with sustainability and limited resources.
                        </p>
                        
                        <p className="text-lg text-gray-700 leading-relaxed">
                          <strong>Individuals, students, startups, and small researchers</strong> have no sustainable way to co-own the advanced 
                          infrastructure they need to innovate, learn, and build the future.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "solution" && (
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-mono">
                        # Our Solution
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                          Thinkin&apos; Rocks is a <strong>member-owned organization</strong> that acquires, operates, and maintains the infrastructure 
                          our community needs. We provide access to high-end computational & GPU servers, robotics equipment, sensors, 
                          fabrication tools, and shared collaborative spaces.
                        </p>
                        
                        <p className="text-lg text-gray-700 leading-relaxed">
                          Through workshops, build sessions, and public events, we&apos;re creating an ecosystem where open-source software, 
                          automation, and documentation flourish. We support open innovation, education, and community-led projects that 
                          shape our technological future.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Technology Showcase */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 font-mono text-center">
               Our Vision 
            </h2>
            <div className="mb-12">
              <p className="text-lg text-gray-700 font-mono text-center">
                An open hardware/software hub for Finland and beyond — democratizing access to technology, 
                enabling community-led projects & startups, and supporting education and innovation ecosystems everywhere.
              </p>
            </div>
          </div>
          
          <div className="max-w-full overflow-hidden">
            {/* Infinite Scrolling Gallery */}
            <div className="relative">
              <div className="flex animate-scroll">
                {/* First set */}
                <div className="flex space-x-6 flex-shrink-0">
                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Servers</h3>
                    <p className="text-xs text-gray-500 text-center">High-performance computing infrastructure for demanding workloads</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">GPUs</h3>
                    <p className="text-xs text-gray-500 text-center">AI training, machine learning, and parallel processing power</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Robots</h3>
                    <p className="text-xs text-gray-500 text-center">Robotics platforms, sensors, and automation systems</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Experimental Hardware</h3>
                    <p className="text-xs text-gray-500 text-center">Cutting-edge prototyping tools and research equipment</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Open Source</h3>
                    <p className="text-xs text-gray-500 text-center">Collaborative software development and shared knowledge</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Community</h3>
                    <p className="text-xs text-gray-500 text-center">Collaborative spaces for learning, building, and innovation</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0 mr-6">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Workshops</h3>
                    <p className="text-xs text-gray-500 text-center">Hands-on learning sessions and skill-building events</p>
                  </div>
                </div>

                {/* Second set */}
                <div className="flex space-x-6 flex-shrink-0">
                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Servers</h3>
                    <p className="text-xs text-gray-500 text-center">High-performance computing infrastructure for demanding workloads</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">GPUs</h3>
                    <p className="text-xs text-gray-500 text-center">AI training, machine learning, and parallel processing power</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Robots</h3>
                    <p className="text-xs text-gray-500 text-center">Robotics platforms, sensors, and automation systems</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Experimental Hardware</h3>
                    <p className="text-xs text-gray-500 text-center">Cutting-edge prototyping tools and research equipment</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Open Source</h3>
                    <p className="text-xs text-gray-500 text-center">Collaborative software development and shared knowledge</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Community</h3>
                    <p className="text-xs text-gray-500 text-center">Collaborative spaces for learning, building, and innovation</p>
                  </div>

                  <div className="bg-white rounded-lg p-6  border border-gray-200 flex flex-col items-center w-48 flex-shrink-0 mr-6">
                    <h3 className="font-semibold text-gray-800 font-mono text-sm text-center mb-2">Workshops</h3>
                    <p className="text-xs text-gray-500 text-center">Hands-on learning sessions and skill-building events</p>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Years above timeline */}
                <div className="flex justify-between items-end mb-4">
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 font-mono">
                      Fall 2025
                    </h3>
                  </div>
                  <div className="flex-1 text-center px-8">
                    <h3 className="text-lg font-semibold text-gray-800 font-mono">
                      2026
                    </h3>
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 font-mono">
                      2027+
                    </h3>
                  </div>
                </div>

                {/* Main horizontal timeline line with ticks */}
                <div className="relative h-px bg-gray-400 mb-8">
                  {/* Timeline ticks positioned under years */}
                  <div className="flex justify-between">
                    <div className="flex-1 relative">
                      <div className="absolute left-1/2 top-0 w-px h-4 bg-gray-400 -translate-x-1/2"></div>
                    </div>
                    <div className="flex-1 relative px-8">
                      <div className="absolute left-1/2 top-0 w-px h-4 bg-gray-400 -translate-x-1/2"></div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute left-1/2 top-0 w-px h-4 bg-gray-400 -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  {/* 2024 Activities */}
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Register organization</div>
                      <div>• Acquire first assets</div>
                      <div>• Form early community</div>
                    </div>
                  </div>

                  {/* 2025 Activities */}
                  <div className="flex-1 text-center px-8">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Connect with hardware companies</div>
                      <div>• Expand equipment library</div>
                      <div>• Apply for funding</div>
                      
                    </div>
                  </div>

                  {/* 2026+ Activities */}
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600 space-y-1">
                    <div>• Comprehensive infrastructure</div>
                      <div>• Recognized innovation hub</div>
                      <div>• Sustainable ecosystem</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Application Form - IDE Style */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200  overflow-hidden">
              {/* IDE-style tab bar */}
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex space-x-1">
                  {!submitted && (
                    <button 
                      className={`px-3 py-1 rounded-t text-sm font-medium transition-colors ${
                        formTab === "application" 
                          ? "bg-white border-l border-r border-t border-gray-200" 
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                      onClick={() => setFormTab("application")}
                    >
                      application.js
                    </button>
                  )}
                  <button 
                    className={`px-3 py-1 rounded-t text-sm font-medium transition-colors ${
                      formTab === "community" 
                        ? "bg-white border-l border-r border-t border-gray-200" 
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    onClick={() => setFormTab("community")}
                  >
                    community.md
                  </button>
                </div>
              </div>
              
              <div className="h-[750px] overflow-y-auto">
                <div className="p-8">
                {/* Application Tab */}
                {formTab === "application" && !submitted && (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 font-mono mb-2">
                        Show Your Interest
                      </h2>
                      <p className="text-gray-600 font-mono text-sm">
                        {/* Help us build a community that democratizes technology */}
                      </p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telegram Username</FormLabel>
                              <FormControl>
                                <Input type="text" required placeholder="Enter your Telegram username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="interest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>How would you like to contribute to building this community? *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your interest in democratizing technology access, ideas you have, skills you can contribute, or how you&apos;d like to help build this vision..."
                                  rows={4}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Technical Background & Interests</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Share your experience with computing, robotics, fabrication, research, or other relevant areas..."
                                  rows={3}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="newsletter"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="mt-1"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Keep me updated on community building progress and opportunities to contribute
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-gray-800 hover:bg-gray-700 text-green-400 font-mono border border-gray-600 py-3"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "$ processing..." : "$ Show interest"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}

                {/* Community Tab */}
                {(formTab === "community" || submitted) && (
                  <div>
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 font-mono mb-2">
                        Building Together
                      </h2>
                      <p className="text-gray-600 font-mono text-sm mb-6">
                        {/* Community-driven, member-owned, sustainable */}
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 text-left">
                        <p className="text-gray-700 leading-relaxed">
                          We&apos;re building something special in Finland and beyond. Together, we can create a member-owned cooperative that operates on the principles of 
                          <strong> transparency, sustainability, accessibility, education, engagement, and loyalty</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 font-mono mb-4">
                          # Member Ownership
                        </h3>
                        <div className="bg-gray-50 rounded p-4">
                          <p className="text-gray-700 mb-4">
                            As a <strong>member-owned organization</strong>, every member has a voice in how we operate and grow. 
                            We believe in democratic governance and shared ownership of the infrastructure we build together.
                          </p>
                          <p className="text-gray-700 font-mono text-sm">
                            <span className="text-green-600">{'//'}</span> Member happiness is our top priority
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 font-mono mb-4">
                          # What to Expect
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <span className="text-green-600 font-mono">→</span>
                            <p className="text-gray-700">Regular workshops and build sessions</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="text-green-600 font-mono">→</span>
                            <p className="text-gray-700">Access to shared infrastructure and tools</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="text-green-600 font-mono">→</span>
                            <p className="text-gray-700">Collaborative community projects</p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <span className="text-green-600 font-mono">→</span>
                            <p className="text-gray-700">Democratic decision-making process</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </div>
            </div>
        </div>
        </section>
      </main>

                  {/* Contact Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 font-mono">
              {/* Get in Touch */}
            </h3>
            
            <div className="mb-12">
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Have questions? Reach out to us at{' '}
                <a 
                  href="mailto:milana.begantsova@aaltoes.com" 
                  className="text-green-400 hover:text-white transition-colors font-semibold underline"
                >
                  milana.begantsova@aaltoes.com
                </a>
              </p>
            </div>

            <div className="flex justify-center space-x-8 mb-8">
              <a 
                href="https://github.com/aaltoes-tech" 
                                                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
              >
                GitHub
        </a>
        <a
                href="https://discord.gg/sbeqNTUj" 
                className="text-gray-300 hover:text-green-400 transition-colors font-medium"
              >
                Discord
              </a>
            </div>


          </div>
        </div>
      </footer>
    </div>
  )
}