import "./globals.css";
import Script from "next/script"; // นำเข้าตัวช่วยรัน Script ของ Next.js

export const metadata = {
  // [สำคัญ] เปลี่ยนชื่อ Title ให้เป็นชื่อแบรนด์ Good Taste เพื่อความเนียน
  title: "Good Taste Official",
  description: "Good Taste Online Store",
};

export default function RootLayout({ children }) {
  const PIXEL_ID = "2302102800316332"; // เลขพิกเซลเดิมของคุณ

  return (
    <html lang="en">
      <head>
        {/* 1. Meta Pixel Base Code (หน้าบ้าน) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}