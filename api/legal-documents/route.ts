import { NextRequest, NextResponse } from 'next/server';
import { fetchLegalDocuments } from '@/lib/legal-api';

export async function GET(request: NextRequest) {
  try {
    const documents = await fetchLegalDocuments();
    
    return NextResponse.json({
      success: true,
      data: documents,
      count: documents.length
    });
  } catch (error) {
    console.error('Legal Documents API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch legal documents',
        data: []
      },
      { status: 500 }
    );
  }
}
