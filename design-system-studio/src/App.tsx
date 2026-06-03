import React, { useState, useEffect } from 'react';
import { PRESET_THEMES, GOOGLE_FONTS_IMPORTS } from './data/themes';
import { Theme } from './types';
import ThemeSelector from './components/ThemeSelector';
import ComponentShowcase from './components/ComponentShowcase';
import CodeExporter from './components/CodeExporter';
import PromptGenerator from './components/PromptGenerator';
import AssetManager from './components/AssetManager';
import { Palette, Sparkles, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(PRESET_THEMES[0]);

  // Inject active theme's font imports dynamically into the head to allow proper preview on-the-fly
  useEffect(() => {
    // In order for the preview styles to work perfectly inside the sandbox,
    // we inject the consolidated Google Fonts link dynamically.
    const fontId = 'google-fonts-loader';
    let linkElement = document.getElementById(fontId) as HTMLLinkElement;
    
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = fontId;
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap';
      document.head.appendChild(linkElement);
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-stone-800 via-stone-400 to-stone-900" />

      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
        
        {/* App Title & Editorial Description */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-stone-200 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold backdrop-blur-md border border-stone-200/80 rounded-full text-stone-600 bg-stone-100">
              <Cpu className="w-3.5 h-3.5 text-stone-700 animate-spin-slow" />
              Unified UI Consistency Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-stone-900">
              Cohesive UI <span className="font-light text-stone-500">Architect</span>
            </h1>
            <p className="text-sm text-stone-500 max-w-2xl leading-relaxed">
              Design professional style guides, test theme uniformity inside a responsive component playground, and instantly synthesize copy-paste CSS spreadsheets, code snippets, and expert-engineered AI system prompts for your personal projects.
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
            <span>Last Updated: 2026-05-24</span>
          </div>
        </header>

        {/* Primary Interactive Columns Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Design Controllers (Col: 12 -> 5) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <Palette className="w-5 h-5 text-stone-700" />
              <h2 className="font-bold text-base text-stone-800 font-sans">
                Style Controller
              </h2>
            </div>
            
            {/* Custom Theme Configurator & Presets */}
            <ThemeSelector 
              currentTheme={currentTheme} 
              onThemeChange={setCurrentTheme} 
            />

            {/* AI Prompter Card Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pt-2">
                <Sparkles className="w-5 h-5 text-stone-700" />
                <h2 className="font-bold text-base text-stone-800 font-sans">
                  AI Prompt Copilot
                </h2>
              </div>
              <PromptGenerator currentTheme={currentTheme} />
            </div>
          </section>

          {/* Right Block: Live Sandbox Canvas Preview (Col: 12 -> 7) */}
          <section className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-stone-700" />
              <h2 className="font-bold text-base text-stone-800 font-sans">
                Real-Time Canvas Playground
              </h2>
            </div>
            
            {/* The actual live component board */}
            <ComponentShowcase currentTheme={currentTheme} />

            {/* Code Export block */}
            <CodeExporter currentTheme={currentTheme} />
          </section>
        </main>

        {/* Asset Hub Area: Full width at footer */}
        <section className="border-t border-stone-200 pt-8 space-y-4">
          <AssetManager currentHeroUrl={currentTheme.heroImageUrl} />
        </section>

        {/* Universal Footer */}
        <footer className="border-t border-stone-200/60 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-stone-500" />
            <span>Standardized under Cohesive Design Guidelines v1.4</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-700 font-mono">100% Client-Side Pure Playbook</span>
            <span className="hover:text-stone-700 font-sans">© 2026 Rajiv Vishal Cohesive UI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
