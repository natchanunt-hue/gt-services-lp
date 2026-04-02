'use client';
import { useEffect } from 'react';

export default function GoodTastePage() {
  const lineLink = "https://lin.ee/6i9N5Xf"; 

  useEffect(() => {
    const triggerRedirect = async () => {
      const eventId = "gt_auto_" + Date.now();

      // 1. ยิง Pixel (หน้าบ้าน) - ถ้ามีสคริปต์พื้นฐานใน layout.js แล้ว
      if (window.fbq) {
        window.fbq('track', 'Contact', { content_name: 'GoodTaste_Auto' }, { eventID: eventId });
      }

      // 2. ยิง CAPI (หลังบ้าน) - ผ่านท่อที่เราสร้างไว้
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName: 'Contact', eventId: eventId }),
      });

      // 3. ดีเลย์เล็กน้อยแล้วเด้งไป LINE
      setTimeout(() => {
        window.location.href = lineLink;
      }, 600); 
    };

    triggerRedirect();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <div className="space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06C755] mx-auto"></div>
        <h1 className="text-xl font-medium text-gray-800">กำลังพาคุณไปที่ LINE...</h1>
        <p className="text-sm text-gray-400">หากหน้าจอไม่เปลี่ยนไป <a href={lineLink} className="underline text-green-600">คลิกที่นี่</a></p>
      </div>
    </main>
  );
}