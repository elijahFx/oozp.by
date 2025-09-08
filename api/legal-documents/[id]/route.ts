import { NextRequest, NextResponse } from 'next/server';
import { fetchLegalDocumentById } from "../../../../lib/legal-api";

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
          error: 'Document ID is required'
        },
        { status: 400 }
      );
    }

    const document = await fetchLegalDocumentById(id);
    
    if (!document) {
      return NextResponse.json(
        {
          success: false,
          error: 'Document not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Legal Document API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch legal document'
      },
      { status: 500 }
    );
  }
}