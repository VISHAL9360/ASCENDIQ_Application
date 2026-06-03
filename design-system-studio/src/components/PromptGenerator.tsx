import React, { useState, useEffect } from 'react';
import { Theme, PromptConfig } from '../types';
import { Sparkles, Copy, Check, ShieldCheck, Terminal, HelpCircle } from 'lucide-react';

interface PromptGeneratorProps {
  currentTheme: Theme;
}

export default function PromptGenerator({ currentTheme }: PromptGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState<PromptConfig>({
    appName: 'FocusFlow',
    appType: 'Mobile Meditation & Breathing App',
    vibe: '',
    brandColors: '',
    borderRadius: '',
    extraRequirements: 'Ensure there is high-contrast text accessibility and soft micro-animations using motion/react.'
  });

  // Sync state with selected pre-defined themes in real-time
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      vibe: currentTheme.name,
      brandColors: `Primary: ${currentTheme.primaryColor}, Accent: ${currentTheme.accentColor}, Background: ${currentTheme.backgroundColor}, Card Container: ${currentTheme.containerBg}`,
      borderRadius: `${currentTheme.radius} corners (border-radius: ${currentTheme.radius === 'none' ? '0px' : currentTheme.radius})`
    }));
  }, [currentTheme]);

  // Construct a masterfully engineered prompt targeting Gemini/Coding Assist LLMs
  const masterPrompt = `Act as an expert frontend software engineer and UI designer. Build a complete, highly-cohesive, and professional "${config.appName}" (which is a ${config.appType}) following an absolute standardized design system framework.

You MUST execute the layout and styles with strict consistency across all pages and views using the following visual theme constraints:

1. THEME VIBE & MOOD:
   - Aesthetic Theme: ${config.vibe}
   - Font Pairing Constraints: Use Google Fonts URL for importing typography. Specifically, pair custom sans-serif fonts (or custom serifs if applicable) for all display titles, and clean monospace fonts for badges, parameters, and metadata numbers.
   - Exact Font Stack: Sans Font: ${currentTheme.fontSans} (Primary layout) | Mono Font: ${currentTheme.fontMono} (Data metrics & codes).

2. STANDARDIZED COLOR SCHEME (No unsolicited inline coloring or random gradients):
   - ${config.brandColors}
   - Text/Ink Color: ${currentTheme.textColor}
   - Borders Color: ${currentTheme.borderColor}
   - Every card, form list, and sidebar container must share the exact same container color, outline width, and line offsets.

3. CORNER DETAILS & ELEVATIONS:
   - Corner Radius: ${config.borderRadius}
   - Border Thicknesses: ${currentTheme.id === 'neo-brutalist' ? '3px solid #000' : '1px'}
   - Shadows & Depth: ${
     currentTheme.id === 'neo-brutalist' 
       ? 'Offset thick flat shadows: box-shadow: 4px 4px 0px #000000; (do not use soft CSS blur shadows)' 
       : `Standard custom elevation shadow: shadow-${currentTheme.shadow}`
   }

4. SPECIAL DESIGN SYSTEM REQUIREMENTS:
   - ${config.extraRequirements || 'Keep consistent borders, crisp typography pairing, and zero unrequested telemetry or logs.'}

5. CORE OUTPUT SPECIFICATION:
   - Render all layouts, charts, panels, and forms inside a single cohesive structure to maintain screen consistency.
   - All interactive state handlers (buttons, toggles, sliders, text inputs) must share identical focus states, active micro-scaling, and border colors.
   - Do not larp technical status lines or add random logs in the margins. Make it feel humble and human-polished.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(masterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-hidden divide-y divide-stone-100">
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-1 px-1.5 rounded-md bg-stone-900 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-stone-800 font-sans leading-none">
              Cohesive UI AI Prompt Synthesizer
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Generates structural guidance for other LLMs</span>
          </div>
        </div>
        <p className="text-xs text-stone-500 mb-4 pb-2 border-b border-stone-100 font-sans leading-relaxed">
          Tweak the details below. Our builder will automatically assemble a highly detailed CSS blueprint prompt. Copy and paste it directly into any AI assistant to build consistent pages in seconds.
        </p>

        {/* Input variables form */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block font-mono uppercase">App Project Name</label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-200 outline-none focus:ring-1 focus:ring-stone-400 bg-white"
                placeholder="e.g. TaskBoard"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-600 block font-mono uppercase">App Category / Purpose</label>
              <input
                type="text"
                value={config.appType}
                onChange={(e) => setConfig({ ...config, appType: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-stone-200 outline-none focus:ring-1 focus:ring-stone-400 bg-white"
                placeholder="e.g. Analytics Dashboard"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-stone-600 block font-mono uppercase">Custom Project Goals / Instructions</label>
            <textarea
              value={config.extraRequirements}
              onChange={(e) => setConfig({ ...config, extraRequirements: e.target.value })}
              rows={2}
              className="w-full text-xs p-2 rounded-lg border border-stone-200 outline-none focus:ring-1 focus:ring-stone-400 bg-white resize-none"
              placeholder="e.g. Focus on screen spacing, minimal layouts, or high-contrast styles."
            />
          </div>
        </div>
      </div>

      {/* Generated output prompt display */}
      <div className="p-5 bg-stone-50/50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
            <Terminal className="w-3.5 h-3.5 text-stone-500" />
            Synthesized Prompt Output
          </div>
          <button
            onClick={handleCopy}
            className="text-xs bg-stone-900 hover:bg-stone-800 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Prompt!' : 'Copy Prompt'}
          </button>
        </div>

        <div className="relative">
          <textarea
            readOnly
            value={masterPrompt}
            className="w-full text-[11px] font-mono p-4 rounded-xl bg-stone-950 text-stone-300 h-[190px] border border-stone-800 leading-relaxed outline-none focus:ring-0 resize-none select-all"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] leading-relaxed">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>
            <strong>Prompt Optimized!</strong> This template guarantees consistent theme compliance by locking color constants and matching fonts explicitly.
          </span>
        </div>
      </div>
    </div>
  );
}
