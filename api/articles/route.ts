import { NextRequest, NextResponse } from 'next/server';
import { fetchArticles } from '../lib/api';

export async function GET(request: NextRequest) {
  try {
    const articles = await fetchArticles();
    
    return NextResponse.json({
      success: true,
      data: articles,
      count: articles.length
    });
  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch articles',
        data: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}