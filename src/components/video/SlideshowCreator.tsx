import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Play } from "lucide-react";

const SlideshowCreator = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]);
  const [transition, setTransition] = useState("fade");
  const [duration, setDuration] = useState("3");
  const [isCreating, setIsCreating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      // Simulate slideshow creation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Slideshow Created",
        description: `Successfully created slideshow with ${images.length} images`,
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create slideshow",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="images" className="text-base font-semibold">
          Upload Images
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="images" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload images or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </label>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Images ({images.length})</Label>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transition">Transition Effect</Label>
          <Select value={transition} onValueChange={setTransition}>
            <SelectTrigger id="transition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fade">Fade</SelectItem>
              <SelectItem value="slide">Slide</SelectItem>
              <SelectItem value="zoom">Zoom</SelectItem>
              <SelectItem value="dissolve">Dissolve</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slide-duration">Slide Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="slide-duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 seconds</SelectItem>
              <SelectItem value="3">3 seconds</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
              <SelectItem value="10">10 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleCreate}
        disabled={isCreating || images.length === 0}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating Slideshow...
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Create Slideshow
          </>
        )}
      </Button>
    </div>
  );
};

export default SlideshowCreator;
