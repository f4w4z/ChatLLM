
'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { Settings2 } from 'lucide-react';
import type { ChatSettings } from '@/app/actions';

interface SettingsPanelProps {
  settings: ChatSettings;
  onSettingsChange: (settings: ChatSettings) => void;
}

export default function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  
  const handleSettingsChange = (newSettings: Partial<ChatSettings>) => {
    onSettingsChange({ ...settings, ...newSettings });
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Settings2 className="text-primary w-6 h-6" />
          <h2 className="text-xl font-headline font-bold">AI Settings</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
            <div>
                <p className="text-sm text-sidebar-foreground/70 mb-4">Tune the AI's responses to your liking.</p>
                <SidebarGroupContent className="space-y-6">
                    <div className="space-y-3">
                    <Label htmlFor="temperature" className="font-semibold">Temperature: <span className="font-mono text-primary">{settings.temperature.toFixed(1)}</span></Label>
                    <p className="text-xs text-sidebar-foreground/70">Controls randomness. Lower is more deterministic.</p>
                    <Slider
                        id="temperature"
                        min={0}
                        max={1}
                        step={0.1}
                        value={[settings.temperature]}
                        onValueChange={(value) => handleSettingsChange({ temperature: value[0] })}
                    />
                    </div>
                    
                    <div className="space-y-2">
                    <Label htmlFor="response-length" className="font-semibold">Response Length</Label>
                    <Select
                        value={settings.responseLength}
                        onValueChange={(value: 'short' | 'medium' | 'long') => handleSettingsChange({ responseLength: value })}
                    >
                        <SelectTrigger id="response-length" className="w-full bg-sidebar-accent">
                        <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    
                    <div className="space-y-2">
                    <Label htmlFor="response-style" className="font-semibold">Response Style</Label>
                    <Select
                        value={settings.responseStyle}
                        onValueChange={(value: 'formal' | 'casual' | 'poetic') => handleSettingsChange({ responseStyle: value })}
                    >
                        <SelectTrigger id="response-style" className="w-full bg-sidebar-accent">
                        <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="poetic">Poetic</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </SidebarGroupContent>
            </div>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
