import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileVideo } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ScriptToVideo = () => {
  const { toast } = useToast();
  const [script, setScript] = useState("");
  const [voiceType, setVoiceType] = useState("neutral");
  const [addMusic, setAddMusic] = useState(false);
  const [addSubtitles, setAddSubtitles] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    if (!script.trim()) {
      toast({
        title: "Script Required",
        description: "Please enter a script",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-script', {
        body: {
          script,
          voiceType,
          addMusic,
          addSubtitles,
        },
      });

      if (error) throw error;

      toast({
        title: "Script Processing Started",
        description: "Your video is being created from the script",
      });

      console.log("Processing response:", data);
    } catch (error: any) {
      toast({
        title: "Processing Failed",
        description: error.message || "Failed to process script",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="script" className="text-base font-semibold">
          Video Script
        </Label>
        <Textarea
          id="script"
          placeholder="Enter your video script here... Each line will be a separate scene."
          value={script}
          onChange={(e) => setScript(e.target.value)}
          className="min-h-[200px] resize-none font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Tip: Use clear scene descriptions and timing cues for best results
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="voice">Voice Type</Label>
          <Select value={voiceType} onValueChange={setVoiceType}>
            <SelectTrigger id="voice">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="energetic">Energetic</SelectItem>
              <SelectItem value="calm">Calm</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="music">Background Music</Label>
            <p className="text-xs text-muted-foreground">
              Add instrumental background music
            </p>
          </div>
          <Switch
            id="music"
            checked={addMusic}
            onCheckedChange={setAddMusic}
          />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="subtitles">Auto Subtitles</Label>
            <p className="text-xs text-muted-foreground">
              Generate subtitles from script
            </p>
          </div>
          <Switch
            id="subtitles"
            checked={addSubtitles}
            onCheckedChange={setAddSubtitles}
          />
        </div>
      </div>

      <Button
        onClick={handleProcess}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Script...
          </>
        ) : (
          <>
            <FileVideo className="mr-2 h-5 w-5" />
            Process Script
          </>
        )}
      </Button>
    </div>
  );
};

export default ScriptToVideo;
