import React, { useState } from 'react';
import { Theme } from '../types';
import { Copy, Check, Terminal, FileCode, CheckCircle2, Info } from 'lucide-react';
import { GOOGLE_FONTS_IMPORTS } from '../data/themes';

interface CodeExporterProps {
  currentTheme: Theme;
}

export default function CodeExporter({ currentTheme }: CodeExporterProps) {
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'components'>('css');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const displayCopyMessage = (sectionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const cleanFontName = (font: string) => {
    return font.split(',')[0].replace(/"/g, '');
  };

  // 1. Tailwind v4 Raw CSS Code Block
  const cssCode = `${GOOGLE_FONTS_IMPORTS}

@theme {
  --font-sans: "${cleanFontName(currentTheme.fontSans)}", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "${cleanFontName(currentTheme.fontMono)}", ui-monospace, SFMono-Regular, monospace;
  
  /* System Primary Theme Colors */
  --color-primary: ${currentTheme.primaryColor};
  --color-accent: ${currentTheme.accentColor};
  --color-background-custom: ${currentTheme.backgroundColor};
  --color-container-custom: ${currentTheme.containerBg};
  --color-text-custom: ${currentTheme.textColor};
  --color-border-custom: ${currentTheme.borderColor};
  
  /* System Border Radius Rules */
  --radius-custom: ${currentTheme.radius === 'none' ? '0px' : currentTheme.radius === 'sm' ? '0.25rem' : currentTheme.radius === 'md' ? '0.375rem' : currentTheme.radius === 'lg' ? '0.5rem' : currentTheme.radius === 'xl' ? '0.75rem' : '1rem'};
}
`;

  // 2. React Tailwind CSS standard Component Class List configurations
  const componentCode = `import React from 'react';

// Design System Rules applied perfectly for absolute consistency
export function ConsistentCard({ children, title }) {
  return (
    <div 
      className="p-6 transition-all duration-300 bg-[${currentTheme.containerBg}] border-[${currentTheme.borderColor}] border rounded-[${currentTheme.radius === 'none' ? '0px' : currentTheme.radius}] shadow-${currentTheme.shadow === 'none' ? 'none' : currentTheme.shadow}"
      style={{ 
        fontFamily: '${currentTheme.fontSans}',
        color: '${currentTheme.textColor}' 
      }}
    >
      <h3 className="text-lg font-bold tracking-tight mb-2">{title}</h3>
      <div className="text-sm opacity-90 leading-relaxed">{children}</div>
    </div>
  );
}

export function ConsistentButton({ children, onClick, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 font-bold text-xs transition duration-200 cursor-pointer active:scale-95 \${
        isPrimary 
          ? 'bg-[${currentTheme.primaryColor}] text-[${currentTheme.backgroundColor}]' 
          : 'bg-[${currentTheme.accentColor}] text-white'
      } rounded-[${currentTheme.radius === 'none' ? '0px' : currentTheme.radius}] hover:opacity-90\`}
      style={{ fontFamily: '${currentTheme.fontSans}' }}
    >
      {children}
    </button>
  );
}
`;

  // 3. Tailwind v3 Configuration
  const tailwindV3Config = `/** @type {import('tailwindcss').Config} */
// Place this inside your tailwind.config.js for Tailwind CSS v3 projects
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "${currentTheme.primaryColor}",
          accent: "${currentTheme.accentColor}",
          background: "${currentTheme.backgroundColor}",
          container: "${currentTheme.containerBg}",
          text: "${currentTheme.textColor}",
          border: "${currentTheme.borderColor}",
        }
      },
      borderRadius: {
        custom: "${currentTheme.radius === 'none' ? '0px' : currentTheme.radius === 'sm' ? '4px' : currentTheme.radius === 'md' ? '8px' : currentTheme.radius === 'lg' ? '12px' : '16px'}"
      },
      fontFamily: {
        sans: ["${cleanFontName(currentTheme.fontSans)}", "sans-serif"],
        mono: ["${cleanFontName(currentTheme.fontMono)}", "monospace"],
      }
    },
  },
  plugins: [],
}`;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-hidden">
      {/* Header tabs selector */}
      <div className="bg-stone-50 border-b border-stone-200/60 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-stone-600" />
          <h3 className="font-bold text-sm text-stone-800 font-sans">
            Style Sheet & Configuration Code
          </h3>
        </div>
        
        {/* Tab switch buttons */}
        <div className="flex gap-1 p-0.5 bg-stone-200/50 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'css'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Tailwind v4 (CSS)
          </button>
          
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'tailwind'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Tailwind v3 (JS Config)
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'components'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            React Components
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Copy guide panel */}
        <div className="flex gap-2.5 p-3 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-xs leading-relaxed mb-4">
          <Info className="w-4.5 h-4.5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Using this code in your personal project:</p>
            <p className="opacity-90 mt-0.5 text-[11px]">
              Copy the selected code below. Ensure that you have imported the Google Font URL in your project and configured Tailwind CSS. This enforces a beautifully locked, cohesive system.
            </p>
          </div>
        </div>

        {/* Code Content Box */}
        <div className="relative">
          {activeTab === 'css' && (
            <div>
              <button
                onClick={() => displayCopyMessage('css', cssCode)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1 shadow-sm transition-all"
              >
                {copiedSection === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === 'css' ? 'Copied!' : 'Copy Code'}
              </button>
              <pre className="text-[11px] font-mono p-4 rounded-xl bg-stone-950 text-stone-200 overflow-x-auto max-h-[300px] leading-relaxed">
                {cssCode}
              </pre>
            </div>
          )}

          {activeTab === 'tailwind' && (
            <div>
              <button
                onClick={() => displayCopyMessage('tailwind', tailwindV3Config)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1 shadow-sm transition-all"
              >
                {copiedSection === 'tailwind' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === 'tailwind' ? 'Copied!' : 'Copy Config'}
              </button>
              <pre className="text-[11px] font-mono p-4 rounded-xl bg-stone-950 text-stone-200 overflow-x-auto max-h-[300px] leading-relaxed">
                {tailwindV3Config}
              </pre>
            </div>
          )}

          {activeTab === 'components' && (
            <div>
              <button
                onClick={() => displayCopyMessage('components', componentCode)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1 shadow-sm transition-all"
              >
                {copiedSection === 'components' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === 'components' ? 'Copied!' : 'Copy Snippets'}
              </button>
              <pre className="text-[11px] font-mono p-4 rounded-xl bg-stone-950 text-stone-200 overflow-x-auto max-h-[300px] leading-relaxed">
                {componentCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
