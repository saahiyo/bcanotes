import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'BCA YCMOU - Free Notes, E-Books, Question Papers & Solved Practicals';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.2) 0%, transparent 50%)',
          padding: '64px 72px',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '26px',
              fontWeight: 800,
            }}
          >
            B
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#e4e4e7',
            }}
          >
            www.bcanotes.tech
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '960px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(37, 99, 235, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              color: '#60a5fa',
              fontSize: '20px',
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            100% Free Forever • Semester 1 to 6
          </div>

          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>BCA YCMOU</span>
            <span style={{ color: '#3b82f6' }}>Learning Resources</span>
          </div>

          <div
            style={{
              fontSize: '28px',
              color: '#a1a1aa',
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            Unit-wise PDF Notes, Official E-Books, Previous Year Question Papers (2017–2024), and Solved Lab Practicals.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            fontSize: '20px',
            color: '#d4d4d8',
            fontWeight: 600,
          }}
        >
          <span>📝 100+ Unit Notes</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>📖 Digital Textbooks</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>📄 PYQ Archive</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>🧪 Solved Practicals</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
