import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ success: false, message: 'Google Apps Script URL missing in backend' }, { status: 500 });
    }

    // Convert file to Base64 String
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    const payload = new URLSearchParams();
    payload.append('fileName', file.name);
    payload.append('mimeType', file.type || 'application/octet-stream');
    payload.append('fileData', base64Data);

    // Send payload to the Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: payload
    });

    const data = await response.json();
    
    if (data.success) {
      return NextResponse.json({ success: true, fileId: data.fileId });
    } else {
      return NextResponse.json({ success: false, message: data.error || 'Apps Script failed to create file.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Apps Script Upload Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Unknown error occurred' }, { status: 500 });
  }
}
