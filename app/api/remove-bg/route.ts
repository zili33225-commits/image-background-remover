import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE',
            message: 'No image file provided',
          },
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE',
            message: 'Invalid image file type',
          },
        },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'API_KEY_MISSING',
            message: 'REMOVE_BG_API_KEY is not configured',
          },
        },
        { status: 500 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Call Remove.bg API
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: (() => {
        const formData = new FormData();
        formData.append('image_file', new Blob([buffer], { type: image.type }), image.name);
        formData.append('size', 'auto');
        formData.append('format', 'png');
        return formData;
      })(),
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      
      // Handle rate limiting
      if (removeBgResponse.status === 429) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'RATE_LIMIT',
              message: 'Rate limit exceeded. Please try again later.',
            },
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'API_ERROR',
            message: `Remove.bg API error: ${errorText}`,
          },
        },
        { status: removeBgResponse.status }
      );
    }

    // Convert response to base64
    const resultBuffer = await removeBgResponse.arrayBuffer();
    const base64 = Buffer.from(resultBuffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({
      success: true,
      data: {
        result: dataUrl,
      },
    });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}