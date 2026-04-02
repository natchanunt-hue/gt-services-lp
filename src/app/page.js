'use client';
import { useEffect } from 'react';

export default function GoodTastePage() {
  const lineLink = "https://lin.ee/6i9N5Xf"; 

  useEffect(() => {
    const triggerRedirect = async () => {
      const eventId = "gt_auto_" + Date.now();

      // 1. ยิง Pixel (หน้าบ้าน)
      if (window.fbq) {
        window.fbq('track', 'Contact', { content_name: 'GoodTaste_Auto' }, { eventID: eventId });
      }

      // 2. ยิง CAPI (หลังบ้าน)
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName: 'Contact', eventId: eventId }),
      });

      // 3. หน่วงเวลา 2.5 วินาที
      setTimeout(() => {
        window.location.href = lineLink;
      }, 2500); 
    };

    triggerRedirect();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 space-y-8 animate-in fade-in zoom-in duration-700">
        
        {/* 🟢 ดึงโลโก้ Good Taste มาแสดง (แก้ image เป็น images ถ้าโฟลเดอร์มี s) */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-6">
           <img 
             src="/image/goodtaste-logo.png" 
             alt="Good Taste Logo" 
             className="object-contain w-full h-full" 
           />
        </div>

        <div className="space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#06C755] mx-auto"></div>
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            กำลังพาคุณไปที่ LINE
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            กรุณารอสักครู่ ระบบกำลังพาท่านไปทำรายการต่อที่หน้าแชท<br/>
            เพื่อรับสิทธิพิเศษและบริการโดยตรง
          </p>
        </div>

        <a 
          href={lineLink} 
          className="inline-block w-full bg-[#06C755] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-[#05b34c] transition-all tracking-wider mt-4"
        >
          คลิกที่นี่หากหน้าจอไม่เปลี่ยนไป
        </a>
      </div>
    </main>
  );
}