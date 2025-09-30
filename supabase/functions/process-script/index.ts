import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { script, voiceType, addMusic, addSubtitles } = await req.json();
    
    console.log('Script processing request:', { 
      scriptLength: script.length, 
      voiceType, 
      addMusic, 
      addSubtitles 
    });

    // Parse script into scenes
    const scenes = script
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string, index: number) => ({
        id: index + 1,
        text: line.trim(),
        duration: Math.ceil(line.length / 10), // Rough duration calculation
      }));

    const processMetadata = {
      id: crypto.randomUUID(),
      totalScenes: scenes.length,
      voiceType,
      addMusic,
      addSubtitles,
      status: 'processing',
      scenes,
      createdAt: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Script processing started',
        data: processMetadata,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in process-script:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
