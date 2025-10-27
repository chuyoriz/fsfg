import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AniFlix - Stream Your World of Anime',
  description: 'Premium anime streaming platform with latest episodes and series',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://vjs.zencdn.net/8.0.0/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/8.0.0/video.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // SUPPRESS ALL THIRD-PARTY EMBED AND CORS ERRORS
              (function() {
                'use strict';
                
                // 1. Override console.error completely
                const _error = console.error;
                console.error = function() {
                  const args = Array.from(arguments);
                  const errorString = args.join(' ');
                  
                  // Block embed/channel/CORS/HLS errors
                  if (errorString.includes('embed-') || 
                      errorString.includes('channel') ||
                      errorString.includes('Cannot set properties of undefined') ||
                      errorString.includes('CORS') ||
                      errorString.includes('Access to XMLHttpRequest') ||
                      errorString.includes('HLS Error') ||
                      errorString.includes('net::ERR_FAILED') ||
                      errorString.includes('manifestLoadError') ||
                      errorString.includes('ads')) {
                    return; // Completely ignore
                  }
                  
                  return _error.apply(console, args);
                };
                
                // 2. Override console.log to filter noise
                const _log = console.log;
                console.log = function() {
                  const args = Array.from(arguments);
                  const logString = args.join(' ');
                  
                  // Block HLS/CORS related logs
                  if (logString.includes('Network error') || 
                      logString.includes('CORS') ||
                      logString.includes('fallback player')) {
                    return; // Ignore
                  }
                  
                  return _log.apply(console, args);
                };

                // 2. Block all errors globally
                window.addEventListener('error', function(event) {
                  const msg = event.message || '';
                  const src = event.filename || '';
                  
                  if (src.includes('embed') || 
                      src.includes('ads') || 
                      msg.includes('channel') ||
                      msg.includes('Cannot set properties')) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                  }
                }, true);
                
                // 3. Block unhandled rejections
                window.addEventListener('unhandledrejection', function(event) {
                  const reason = String(event.reason || '');
                  if (reason.includes('channel')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                });

                // 4. Monkey-patch Object.defineProperty to catch the 'channel' error at source
                const _defineProperty = Object.defineProperty;
                Object.defineProperty = function(obj, prop, descriptor) {
                  try {
                    return _defineProperty.call(this, obj, prop, descriptor);
                  } catch (e) {
                    // Silently fail for embed errors
                    if (String(e).includes('channel')) {
                      return obj;
                    }
                    throw e;
                  }
                };
              })();
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}