/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Target, 
  Phone, 
  Mail, 
  ShieldAlert, 
  ChevronRight, 
  Loader2, 
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSalesStrategy, SalesStrategy } from "./services/geminiService";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<SalesStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateSalesStrategy(input);
      setStrategy(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate strategy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="border-bottom border-[#E5E7EB] bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">LeadCloser <span className="text-blue-600">AI</span></h1>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider opacity-60">
            v1.0.0-beta
          </Badge>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight mb-4 sm:text-5xl"
          >
            Turn Cold Leads into <br />
            <span className="text-blue-600">High-Paying Clients</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#6B7280] max-w-2xl mx-auto"
          >
            Enter a business name, niche, or website URL to generate a custom B2B sales strategy, 
            cold call hooks, and professional email templates.
          </motion.p>
        </div>

        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-[#E5E7EB]">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <Input 
                placeholder="e.g. 'Apex Dental Clinic' or 'Local HVAC companies in Austin'" 
                className="pl-12 h-14 border-none shadow-none text-lg focus-visible:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Generate Strategy
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="absolute -bottom-8 left-4 text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 rounded-2xl" />
                <Skeleton className="h-48 rounded-2xl" />
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </motion.div>
          ) : strategy ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pb-20"
            >
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-12 bg-white border border-[#E5E7EB] p-1 rounded-xl mb-8">
                  <TabsTrigger value="analysis" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                    <Briefcase className="w-4 h-4 mr-2 hidden sm:inline" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="pitch" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                    <Phone className="w-4 h-4 mr-2 hidden sm:inline" />
                    The Pitch
                  </TabsTrigger>
                  <TabsTrigger value="proposal" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                    <Mail className="w-4 h-4 mr-2 hidden sm:inline" />
                    Proposal
                  </TabsTrigger>
                  <TabsTrigger value="objections" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                    <ShieldAlert className="w-4 h-4 mr-2 hidden sm:inline" />
                    Objections
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-none shadow-lg shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                      <CardHeader className="bg-red-50/50 border-b border-red-100">
                        <CardTitle className="text-red-700 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Pain Points
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {strategy.analysis.painPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                      <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
                        <CardTitle className="text-emerald-700 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Growth Opportunities
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          {strategy.analysis.opportunities.map((opp, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                              <CheckCircle2 className="mt-1 w-4 h-4 text-emerald-500 shrink-0" />
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="pitch" className="mt-0">
                  <Card className="border-none shadow-lg shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                      <CardTitle className="text-blue-700 flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        The 3-Sentence Hook
                      </CardTitle>
                      <CardDescription>Focus on value, not code.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8 pb-10 px-8">
                      <p className="text-2xl font-medium leading-relaxed text-[#1F2937] italic">
                        "{strategy.pitch.hook}"
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="proposal" className="mt-0">
                  <Card className="border-none shadow-lg shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
                      <CardTitle className="text-indigo-700 flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email Proposal Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 font-mono text-sm">
                        <div className="pb-4 mb-4 border-b border-[#E5E7EB]">
                          <span className="text-[#9CA3AF]">Subject:</span> {strategy.proposal.subject}
                        </div>
                        <div className="whitespace-pre-wrap text-[#374151] leading-relaxed">
                          {strategy.proposal.body}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-4 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        onClick={() => {
                          navigator.clipboard.writeText(`Subject: ${strategy.proposal.subject}\n\n${strategy.proposal.body}`);
                        }}
                      >
                        Copy to Clipboard
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="objections" className="mt-0">
                  <div className="space-y-4">
                    {strategy.objections.map((obj, i) => (
                      <Card key={i} className="border-none shadow-lg shadow-blue-900/5 bg-white rounded-2xl overflow-hidden">
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3">
                            <Badge variant="secondary" className="mb-2 bg-red-100 text-red-700 hover:bg-red-100 border-none">
                              The Objection
                            </Badge>
                            <p className="font-bold text-[#1F2937]">"{obj.objection}"</p>
                          </div>
                          <div className="flex-1 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                              The Rebuttal
                            </Badge>
                            <p className="text-[#374151] leading-relaxed">{obj.rebuttal}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]"
            >
              <div className="bg-white p-6 rounded-full shadow-inner mb-6">
                <Target className="w-12 h-12 opacity-20" />
              </div>
              <p className="text-lg">Enter a lead above to start your agency growth strategy.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-[#9CA3AF] text-sm">
          <p>© 2026 LeadCloser AI. Built for Agency Growth Hackers.</p>
          <p className="mt-2 font-medium text-[#4B5563]">A Kumar Technologies Creation</p>
        </div>
      </footer>
    </div>
  );
}

