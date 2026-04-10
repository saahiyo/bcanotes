import { google } from 'googleapis';

async function run() {
  const GOOGLE_DRIVE_CLIENT_EMAIL = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const GOOGLE_DRIVE_PRIVATE_KEY = process.env.GOOGLE_DRIVE_PRIVATE_KEY;

  console.log("Email:", GOOGLE_DRIVE_CLIENT_EMAIL);
  console.log("Key length:", GOOGLE_DRIVE_PRIVATE_KEY?.length);
  console.log("Key begins with:", GOOGLE_DRIVE_PRIVATE_KEY?.substring(0, 30));
  
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_DRIVE_CLIENT_EMAIL,
      private_key: GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const res = await drive.files.list({ pageSize: 5 });
    console.log("Success! Files:", res.data.files?.length);
  } catch (err) {
    console.error("Error:", err.message, err);
  }
}

run();
