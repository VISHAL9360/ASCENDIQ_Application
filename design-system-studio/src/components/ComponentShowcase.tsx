import React, { useState } from 'react';
import { Theme } from '../types';
import { ArrowRight, Sparkles, Send, CheckCircle2, AlertTriangle, Moon, Sun, Monitor, Heart, ThumbsUp } from 'lucide-react';

interface ComponentShowcaseProps {
  currentTheme: Theme;
}

export default function ComponentShowcase({ currentTheme }: ComponentShowcaseProps) {
  const [inputText, setInputText] = useState('John Doe');
  const [toggleActive, setToggleActive] = useState(true);
  const [sliderValue, setSliderValue] = useState(72);
  const [activeSegment, setActiveSegment] = useState<'profile' | 'security' | 'billing'>('profile');

  // Map radius
  const getRadiusStyle = (radius: Theme['radius']) => {
    switch (radius) {
      case 'none': return '0px';
      case 'sm': return '4px';
      case 'md': return '8px';
      case 'lg': return '12px';
      case 'xl': return '16px';
      case '2xl': return '24px';
      case 'full': return '9999px';
      default: return '12px';
    }
  };

  // Map shadow
  const getShadowStyle = (shadow: Theme['shadow'], themeId: string) => {
    if (themeId === 'neo-brutalist') {
      return '4px 4px 0px #000000';
    }
    switch (shadow) {
      case 'none': return 'none';
      case 'sm': return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      case 'md': return '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)';
      case 'lg': return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      case 'xl': return '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05)';
      case '2xl': return '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      default: return 'none';
    }
  };

  const radiusVal = getRadiusStyle(currentTheme.radius);
  const shadowVal = getShadowStyle(currentTheme.shadow, currentTheme.id);
  const isNeoBrutalist = currentTheme.id === 'neo-brutalist';

  // Base styles to apply to showcase container elements
  const containerStyle: React.CSSProperties = {
    backgroundColor: currentTheme.containerBg,
    borderColor: currentTheme.borderColor,
    borderWidth: isNeoBrutalist ? '3px' : '1px',
    borderRadius: radiusVal,
    boxShadow: shadowVal,
    color: currentTheme.textColor,
  };

  const buttonPrimaryStyle: React.CSSProperties = {
    backgroundColor: currentTheme.primaryColor,
    color: currentTheme.backgroundColor,
    borderRadius: radiusVal,
    borderColor: isNeoBrutalist ? '#000' : 'transparent',
    borderWidth: isNeoBrutalist ? '2px' : '1px',
    boxShadow: isNeoBrutalist ? '2px 2px 0px #000000' : 'none',
  };

  const buttonAccentStyle: React.CSSProperties = {
    backgroundColor: currentTheme.accentColor,
    color: '#ffffff',
    borderRadius: radiusVal,
    borderColor: isNeoBrutalist ? '#000' : 'transparent',
    borderWidth: isNeoBrutalist ? '2px' : '1px',
    boxShadow: isNeoBrutalist ? '2px 2px 0px #000000' : 'none',
  };

  const inputStyle: React.CSSProperties = {
    borderColor: currentTheme.borderColor,
    borderWidth: isNeoBrutalist ? '2px' : '1px',
    borderRadius: radiusVal,
    color: currentTheme.textColor,
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: `${currentTheme.primaryColor}20`,
    color: currentTheme.primaryColor,
    borderRadius: '9999px',
    borderWidth: isNeoBrutalist ? '1.5px' : '0px',
    borderColor: currentTheme.primaryColor,
  };

  // Resolve the raw asset path based on filenames
  const getAssetPath = (filename: string) => {
    // If the image is minimal, show the minimalist image, otherwise its filename.
    // In our build environment, the generated files are placed relative to /src/assets/images
    // For direct preview in standard browser, we can map them dynamically
    if (filename.includes('minimalist_beige_hero')) {
      return `/src/assets/images/minimalist_beige_hero_1779631323524.png`;
    } else if (filename.includes('cosmic_slate_hero')) {
      return `/src/assets/images/cosmic_slate_hero_1779631346828.png`;
    } else if (filename.includes('vibrant_brutalist_hero')) {
      return `/src/assets/images/vibrant_brutalist_hero_1779631370567.png`;
    }
    return `/src/assets/images/minimalist_beige_hero_1779631323524.png`;
  };

  const activeHeroPath = getAssetPath(currentTheme.heroImageUrl);

  return (
    <div 
      className="p-6 transition-colors duration-300 relative border border-stone-200/50 rounded-2xl min-h-[500px]"
      style={{ backgroundColor: currentTheme.backgroundColor, fontFamily: currentTheme.fontSans }}
    >
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono text-stone-600 border border-stone-200 flex items-center gap-1">
        <Monitor className="w-3 h-3" /> Live Sandbox Canvas
      </div>

      <div className="space-y-6">
        {/* Style Unit 1: Hero Banner Component */}
        <div 
          className="relative overflow-hidden p-6 md:p-8 flex flex-col justify-end min-h-[180px] transition-all"
          style={{ 
            borderRadius: radiusVal, 
            boxShadow: shadowVal,
            borderColor: currentTheme.borderColor,
            borderWidth: isNeoBrutalist ? '3px' : '1px'
          }}
        >
          {/* Real Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src={activeHeroPath} 
              alt="Design System Hero" 
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette/overlay to maintain high contrast readability */}
            {currentTheme.id === 'cosmic-slate' ? (
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent/40" />
            ) : (
              <div className="absolute inset-0 bg-white/10" />
            )}
          </div>

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium backdrop-blur-md border border-white/20 rounded-full text-white bg-black/40">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Dynamic Typography pairing
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md">
              {currentTheme.name} Style Canvas
            </h1>
            <p className="text-stone-100 text-xs md:text-sm max-w-md drop-shadow-xs leading-relaxed opacity-95">
              Testing exact margins, letter spacing, line height, and color consistency. This ensures perfect UI synergy in your personal code base.
            </p>
          </div>
        </div>

        {/* Style Unit 2: Core Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card left: Buttons, Alerts & Input Forms */}
          <div className="p-5 transition-all space-y-4" style={containerStyle}>
            <div className="border-b pb-3" style={{ borderColor: currentTheme.borderColor }}>
              <h3 className="text-sm font-semibold tracking-tight uppercase font-mono mb-1 text-stone-400">
                Action Triggers
              </h3>
              <p className="text-xs opacity-70">
                Primary CTA, brand accents, input alignments, and form aesthetics.
              </p>
            </div>

            {/* Inputs & Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1 opacity-80 uppercase tracking-wider font-mono">
                  Input Form Field
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={inputStyle}
                    className="w-full text-xs py-2 px-3 pr-10 focus:outline-hidden bg-transparent"
                    placeholder="Enter key variable..."
                  />
                  <div className="absolute right-3 top-2.5 text-xs opacity-50 font-mono">ID</div>
                </div>
              </div>

              {/* Toggle Switch & Slider */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border bg-stone-50/20" style={{ borderColor: currentTheme.borderColor }}>
                <span className="text-xs font-semibold">Active State Indicator</span>
                <button
                  onClick={() => setToggleActive(!toggleActive)}
                  className={`w-10 h-6 shrink-0 rounded-full p-0.5 transition-colors relative flex items-center ${
                    toggleActive ? 'bg-emerald-500' : 'bg-stone-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                    toggleActive ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono opacity-80">
                  <span>Fluid Grid Scale</span>
                  <span>{sliderValue}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full accent-current h-1 text-xs cursor-pointer rounded-lg bg-stone-200"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button 
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                style={buttonPrimaryStyle}
              >
                <span>Call to Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button 
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                style={buttonAccentStyle}
              >
                <span>Accent trigger</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card right: Navigation, Info Blocks and Charts */}
          <div className="p-5 transition-all space-y-4" style={containerStyle}>
            <div className="border-b pb-3" style={{ borderColor: currentTheme.borderColor }}>
              <h3 className="text-sm font-semibold tracking-tight uppercase font-mono mb-1 text-stone-400">
                Segmented Tabs & States
              </h3>
              <p className="text-xs opacity-70">
                Interactive navigation menus and system status elements.
              </p>
            </div>

            {/* Segmented Control */}
            <div 
              className="flex p-1 bg-stone-100 border rounded-lg text-xs"
              style={{ borderColor: currentTheme.borderColor }}
            >
              {(['profile', 'security', 'billing'] as const).map((seg) => {
                const isActive = activeSegment === seg;
                return (
                  <button
                    key={seg}
                    onClick={() => setActiveSegment(seg)}
                    className="flex-1 py-1.5 px-2 rounded-md font-semibold font-sans capitalize transition-all"
                    style={{
                      backgroundColor: isActive ? currentTheme.primaryColor : 'transparent',
                      color: isActive ? currentTheme.backgroundColor : '#5b5b5b',
                    }}
                  >
                    {seg}
                  </button>
                );
              })}
            </div>

            {/* Standard Metrics Mock Block */}
            <div className="p-4 bg-stone-50/10 rounded-xl space-y-3.5 border" style={{ borderColor: currentTheme.borderColor }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                  style={{ backgroundColor: currentTheme.primaryColor, color: currentTheme.backgroundColor }}
                >
                  DS
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">{inputText || 'Theme Sandbox'}</h4>
                  <p className="text-[10px] opacity-70 font-mono">Last modified: 2026-05-24</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-stone-50/50" style={{ borderColor: currentTheme.borderColor }}>
                    v1.0.0
                  </span>
                </div>
              </div>

              {/* Status Alert Blocks */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 bg-emerald-500/10 rounded-lg text-emerald-600 border border-emerald-500/20 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] leading-none mb-0.5">Styles Synchronized</span>
                    <span className="text-[10px] leading-relaxed opacity-90 inline-block">Design components share the exact same CSS custom configurations.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 bg-amber-500/10 rounded-lg text-amber-600 border border-amber-500/20 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] leading-none mb-0.5">Font Pairing Enforced</span>
                    <span className="text-[10px] leading-relaxed opacity-90 inline-block">Ensure Google Fonts standard @import is added to index.css!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
