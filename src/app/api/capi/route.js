import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const PIXEL_ID = '2302102800316332'; 
    const ACCESS_TOKEN = 'EAARGKuVqqFwBRJolxn1BfaeUsBuixXIRcX9DNf2cgLzlEKZBgZBwfBTZBO6Jo7IFae4nNs6dZCNr2KBOUWi1bLv7LDmiQSoqocZBGH8NtED9Y6WBRMKBTwaWanFFDBncgzZAzCTpx8R38UQ22A6cUafJxvDxGZCE0ISDICkewZCFWIY3g71SC2mR2kaJ1b6NTJFxmAZDZD';

    const fbRequest = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Contact',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: request.url, // [เพิ่ม] บอก Facebook ว่ามาจากหน้าไหน
          user_data: {
            // [ปรับ] ดึง IP ให้แม่นยำขึ้นเมื่อรันบน Vercel
            client_ip_address: request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1',
            client_user_agent: request.headers.get('user-agent'),
          },
          event_id: body.eventId, // สำคัญมาก! ต้องตรงกับหน้าบ้านเพื่อลบตัวซ้ำ
        }],
        // [เพิ่ม] ใส่ Test Code ตรงนี้ถ้าคุณกำลังเปิดหน้า Events Manager ดูอยู่
      }),
    });

    const result = await fbRequest.json();
    console.log('CAPI Result:', result); // ไว้เช็คใน Log ของ Vercel ว่าส่งผ่านไหม

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('CAPI Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}