import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const { GOOGLE_DRIVE_CLIENT_EMAIL, GOOGLE_DRIVE_PRIVATE_KEY } = process.env;

    if (!GOOGLE_DRIVE_CLIENT_EMAIL || !GOOGLE_DRIVE_PRIVATE_KEY) {
      return NextResponse.json({ success: false, message: 'Google Drive credentials missing in backend' }, { status: 500 });
    }

    // Initialize Google API Client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_DRIVE_CLIENT_EMAIL,
        // Ensure private key respects new lines
        private_key: GOOGLE_DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Convert Blob/File to a readable stream for Google Drive
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    // The Submissions Folder ID
    const folderId = '1YCCUCxF6RYsez5LjOSmYdAjgRcx4zWWB'; 

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [folderId],
      },
      media: {
        mimeType: file.type || 'application/octet-stream',
        body: stream,
      },
    });

    return NextResponse.json({ success: true, fileId: driveResponse.data.id });
  } catch (error: any) {
    console.error('Drive Upload Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Unknown error occurred' }, { status: 500 });
  }
}
