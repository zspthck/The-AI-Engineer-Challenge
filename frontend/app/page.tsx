'use client';

import { useState, useRef, useEffect } from 'react';
import MatrixTerminal from '@/components/MatrixTerminal';

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <MatrixTerminal />
    </main>
  );
}
