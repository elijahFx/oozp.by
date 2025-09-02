import { NextRequest, NextResponse } from 'next/server';
import { fetchArticleById } from "../../../lib/api"

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article ID is required'
        },
        { status: 400 }
      );
    }

    const article = await fetchArticleById(id);
    
    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch article'
      },
      { status: 500 }
    );
  }
}