import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AIVideoGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState([10]);
  const [style, setStyle] = useState("realistic");
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a video description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: {
          prompt,
          duration: duration[0],
          style,
          aspectRatio,
        },
      });

      if (error) throw error;

      toast({
        title: "Video Generation Started",
        description: "Your video is being generated. This may take a few minutes.",
      });

      console.log("Generation response:", data);
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate video",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-base font-semibold">
          Video Description
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe the video you want to create... e.g., 'A serene sunset over the ocean with waves gently crashing'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="style">Visual Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="style">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="cinematic">Cinematic</SelectItem>
              <SelectItem value="animated">Animated</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
          <Select value={aspectRatio} onValueChange={setAspectRatio}>
            <SelectTrigger id="aspect-ratio">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
              <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
              <SelectItem value="1:1">1:1 (Square)</SelectItem>
              <SelectItem value="4:3">4:3 (Classic)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">
          Duration: {duration[0]} seconds
        </Label>
        <Slider
          id="duration"
          min={5}
          max={30}
          step={5}
          value={duration}
          onValueChange={setDuration}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Video...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Video
          </>
        )}
      </Button>
    </div>
  );
};

export default AIVideoGenerator;
