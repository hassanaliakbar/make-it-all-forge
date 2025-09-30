import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoIcon, Wand2Icon, ImageIcon, FileTextIcon } from "lucide-react";
import AIVideoGenerator from "@/components/video/AIVideoGenerator";
import SlideshowCreator from "@/components/video/SlideshowCreator";
import ScriptToVideo from "@/components/video/ScriptToVideo";

const Index = () => {
  const [activeTab, setActiveTab] = useState("ai-video");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
            <VideoIcon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Video Generation Workflow
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning videos with AI-powered tools. Choose your workflow and start generating.
          </p>
        </div>

        {/* Main Content */}
        <Card className="max-w-5xl mx-auto shadow-2xl border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Choose Your Workflow</CardTitle>
            <CardDescription>
              Select a video generation method that fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="ai-video" className="flex items-center gap-2">
                  <Wand2Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Video</span>
                </TabsTrigger>
                <TabsTrigger value="slideshow" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Slideshow</span>
                </TabsTrigger>
                <TabsTrigger value="script" className="flex items-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Script to Video</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai-video" className="space-y-4">
                <AIVideoGenerator />
              </TabsContent>

              <TabsContent value="slideshow" className="space-y-4">
                <SlideshowCreator />
              </TabsContent>

              <TabsContent value="script" className="space-y-4">
                <ScriptToVideo />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <Card className="border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <Wand2Icon className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate videos from text prompts using advanced AI models
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <ImageIcon className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">Image Slideshows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create professional slideshows from your images with transitions
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <FileTextIcon className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">Script Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Convert scripts and storyboards into engaging video content
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
