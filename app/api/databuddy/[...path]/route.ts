import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    // Construct the backend target URL
    const targetUrl = new URL(`https://basket.databuddy.cc/${path}`);
    
    // Forward any query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    const body = await request.text();
    const headers = new Headers(request.headers);

    // Set standard forward headers
    headers.set('host', 'basket.databuddy.cc');
    
    // Avoid caching and fetch from the source
    const response = await fetch(targetUrl.toString(), {
      method: 'POST',
      headers: headers,
      body: body,
      cache: 'no-store',
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Error proxying to Databuddy:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    const targetUrl = new URL(`https://basket.databuddy.cc/${path}`);
    
    request.nextUrl.searchParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    const headers = new Headers(request.headers);
    headers.set('host', 'basket.databuddy.cc');

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: headers,
      cache: 'no-store',
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Error proxying to Databuddy:', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

// Handle preflight OPTIONS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
