import React from 'react';
import { ImageIcon, ArrowDownToLine } from 'lucide-react';

// Import our beautiful pre-generated design assets to ensure Vite bundles them perfectly
import minimalistBeigeHero from '../assets/images/minimalist_beige_hero_1779631323524.png';
import cosmicSlateHero from '../assets/images/cosmic_slate_hero_1779631346828.png';
import vibrantBrutalistHero from '../assets/images/vibrant_brutalist_hero_1779631370567.png';

interface AssetManagerProps {
  currentHeroUrl: string;
}

export default function AssetManager({ currentHeroUrl }: AssetManagerProps) {
  
  const assets = [
    {
      id: 'minimalist-beige',
      title: 'Warm Minimalist Sand Banner',
      filename: 'minimalist_beige_hero_1779631323524.png',
      src: minimalistBeigeHero,
      description: 'Serene sand dunes, rich dark charcoal lines, and high-fashion editorial cream textures. Perfect for high-contrast warm light modes.',
      tag: 'Minimal / Editorial',
      size: '16:9 Widescreen',
    },
    {
      id: 'cosmic-slate',
      title: 'Cosmic Teal Slate Banner',
      filename: 'cosmic_slate_hero_1779631346828.png',
      src: cosmicSlateHero,
      description: 'Charcoal space canvas featuring neon teal nebulae, violet stars, and ambient gradient lighting. Best for software platforms and dark interfaces.',
      tag: 'Cosmic Slate Dark',
      size: '16:9 Widescreen',
    },
    {
      id: 'neo-brutalist',
      title: 'Vibrant Brutalist Memphis Banner',
      filename: 'vibrant_brutalist_hero_1779631370567.png',
      src: vibrantBrutalistHero,
      description: 'Loud, impactful block layout presenting retro shapes, sand beige backgrounds, and thick borders. Excellent for creative agency sites.',
      tag: 'Modern Neo-Brutalist',
      size: '16:9 Widescreen',
    }
  ];

  const handleDownload = async (src: string, filename: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback: direct download link trigger
      const link = document.createElement('a');
      link.href = src;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-hidden">
      {/* Header title block */}
      <div className="bg-stone-50 border-b border-stone-200/60 px-5 py-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-stone-600" />
          <div>
            <h3 className="font-bold text-sm text-stone-800 font-sans leading-none">
              Cohesive UI Art Asset Hub
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Download-ready PNG illustrations</span>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-900 text-white font-mono shrink-0">
          3 HD PNG Assets
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs text-stone-500 mb-4 font-sans leading-relaxed">
          The following custom illustration banners were created programmatically specifically for your design system projects. Use them as beautiful hero overlays, card media, or static app illustrations.
        </p>

        {/* Gallery grid list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assets.map((asset) => {
            const isActiveInTheme = currentHeroUrl.includes(asset.filename.split('_hero')[0]);
            return (
              <div 
                key={asset.id} 
                className={`flex flex-col rounded-xl border overflow-hidden bg-stone-50/20 transition-all group ${
                  isActiveInTheme ? 'border-stone-900 ring-1 ring-stone-900/10' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                {/* Image card wrapper */}
                <div className="relative h-32 overflow-hidden bg-stone-100 border-b border-stone-100">
                  <img
                    src={asset.src}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Aspect tag and theme indicators */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="text-[9px] font-mono bg-black/60 backdrop-blur-xs text-white px-1.5 py-0.5 rounded">
                      {asset.size}
                    </span>
                    {isActiveInTheme && (
                      <span className="text-[9px] font-sans font-semibold bg-emerald-500 text-white px-1.5 py-0.5 rounded shadow-sm">
                        Selected Vibe Image
                      </span>
                    )}
                  </div>
                </div>

                {/* Info and download actions card footer */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-stone-800 font-sans leading-snug">
                        {asset.title}
                      </h4>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-normal mt-1 min-h-[36px]">
                      {asset.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase text-stone-400 font-medium">
                      {asset.tag}
                    </span>
                    <button
                      onClick={() => handleDownload(asset.src, asset.filename)}
                      className="text-[10px] font-bold text-white bg-stone-950 hover:bg-stone-800 py-1.5 px-3 rounded-md flex items-center gap-1 cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      Download PNG
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
