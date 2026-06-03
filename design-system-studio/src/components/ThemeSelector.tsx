import React, { useState } from 'react';
import { PRESET_THEMES } from '../data/themes';
import { Theme } from '../types';
import { Palette, Sliders, Check, RotateCcw, Type, ShieldAlert } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  const handlePresetSelect = (preset: Theme) => {
    onThemeChange(preset);
  };

  const handleCustomParamChange = (key: keyof Theme, value: string) => {
    onThemeChange({
      ...currentTheme,
      id: 'custom-theme',
      name: currentTheme.id === 'custom-theme' ? currentTheme.name : 'Custom Designed System',
      [key]: value
    });
  };

  const resetToPreset = () => {
    onThemeChange(PRESET_THEMES[0]);
  };

  // Convert theme colors and fonts to a clean summary to display
  return (
    <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-hidden divide-y divide-stone-100">
      {/* Header Tabs */}
      <div className="flex bg-stone-50 p-1">
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'presets'
              ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-900/5'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Palette className="w-4 h-4" />
          Predefined Vibe Presets
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'custom'
              ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-900/5'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Style Customization
        </button>
      </div>

      <div className="p-5">
        {activeTab === 'presets' ? (
          <div className="space-y-4">
            <p className="text-xs text-stone-500 mb-2 font-sans">
              Choose a design aesthetic. All colors, shadows, rounded corners, and fonts will adapt instantly to represent that theme's design guidelines.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {PRESET_THEMES.map((preset) => {
                const isSelected = currentTheme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    className={`group relative text-left p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50/50 ring-1 ring-stone-900/20'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-stone-800 text-sm font-sans flex items-center gap-2">
                        {preset.name}
                        {isSelected && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-950 text-white">
                            Active
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed mb-3">
                      {preset.description}
                    </p>
                    
                    {/* Tiny Color Palette Preview */}
                    <div className="flex justify-between items-center bg-stone-50 group-hover:bg-stone-100 p-2 rounded-lg border border-stone-200/50">
                      <div className="flex gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.backgroundColor }}
                          title="Background"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.containerBg }}
                          title="Container"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.primaryColor }}
                          title="Primary color"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: preset.accentColor }}
                          title="Accent color"
                        />
                      </div>
                      
                      <div className="text-[10px] font-mono text-stone-400 uppercase">
                        {preset.fontSans.split(',')[0].replace(/"/g, '')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-mono">Fine-Tune Variable Controls</span>
              <button
                onClick={resetToPreset}
                className="text-[10px] text-stone-500 hover:text-stone-900 flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            {/* Typography Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
                <Type className="w-3 h-3 text-stone-400" />
                Primary Font Pairing
              </label>
              <select
                value={currentTheme.fontSans}
                onChange={(e) => handleCustomParamChange('fontSans', e.target.value)}
                className="w-full text-xs font-sans p-2 rounded-lg border border-stone-200 outline-none focus:ring-1 focus:ring-stone-400 bg-white cursor-pointer"
              >
                <option value='"Inter", sans-serif'>Inter (Corporate, Modern Sans)</option>
                <option value='"Space Grotesk", sans-serif'>Space Grotesk (Tech, Crisp Geometric)</option>
                <option value='"Playfair Display", serif'>Playfair Display (Premium Editorial Serif)</option>
                <option value='system-ui, sans-serif'>System UI Default (Minimal Native)</option>
              </select>
            </div>

            {/* Colors Section Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Brand Primary</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.primaryColor}
                    onChange={(e) => handleCustomParamChange('primaryColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.primaryColor}
                    onChange={(e) => handleCustomParamChange('primaryColor', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Accent Accent</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.accentColor}
                    onChange={(e) => handleCustomParamChange('accentColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.accentColor}
                    onChange={(e) => handleCustomParamChange('accentColor', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Main Canvas Bg</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.backgroundColor}
                    onChange={(e) => handleCustomParamChange('backgroundColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.backgroundColor}
                    onChange={(e) => handleCustomParamChange('backgroundColor', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Card Container</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.containerBg}
                    onChange={(e) => handleCustomParamChange('containerBg', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.containerBg}
                    onChange={(e) => handleCustomParamChange('containerBg', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Text Ink Color</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.textColor}
                    onChange={(e) => handleCustomParamChange('textColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.textColor}
                    onChange={(e) => handleCustomParamChange('textColor', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-stone-600 block">Outline Border</label>
                <div className="flex items-center gap-1.5 border border-stone-200 rounded-lg p-1 bg-white">
                  <input
                    type="color"
                    value={currentTheme.borderColor}
                    onChange={(e) => handleCustomParamChange('borderColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentTheme.borderColor}
                    onChange={(e) => handleCustomParamChange('borderColor', e.target.value)}
                    className="text-[10px] font-mono text-stone-700 w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Corner Curvature (Border Radius) Control */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-medium text-stone-600 display">Corner Curvature (Border-Radius)</label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-50 border border-stone-200/60 rounded-lg text-center">
                {['none', 'sm', 'lg', 'xl'].map((r) => (
                  <button
                    key={r}
                    onClick={() => handleCustomParamChange('radius', r as Theme['radius'])}
                    className={`py-1.5 text-[10px] font-semibold rounded capitalize transition-all ${
                      currentTheme.radius === r
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-500 hover:text-stone-900 bg-white/20'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Shadows Depth Control */}
            <div className="space-y-1 pt-1">
              <label className="text-[11px] font-medium text-stone-600 block">Elevations & Shadow Depth</label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-50 border border-stone-200/60 rounded-lg text-center">
                {['none', 'sm', 'md', 'lg'].map((sh) => (
                  <button
                    key={sh}
                    onClick={() => handleCustomParamChange('shadow', sh as Theme['shadow'])}
                    className={`py-1.5 text-[10px] font-semibold rounded capitalize transition-all ${
                      currentTheme.shadow === sh
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-500 hover:text-stone-900 bg-white/20'
                    }`}
                  >
                    {sh === 'none' ? 'flat' : sh}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-stone-50/50 rounded-lg border border-stone-200/60 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <p className="text-[10px] line-clamp-3 text-stone-500 leading-relaxed">
                <strong>Consistency Tip:</strong> Standardizing a set of 3 background variants and 1 roundness system prevents design friction in future app releases.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
