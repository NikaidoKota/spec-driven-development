// Elemental Survivors - Entry Point
// Phase 0: Initial Setup

console.log('Elemental Survivors - Phase 0: Setup Complete');

// Canvas setup
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
if (canvas) {
  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Draw a simple test pattern
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Elemental Survivors', canvas.width / 2, canvas.height / 2);
    ctx.font = '16px sans-serif';
    ctx.fillText('Phase 0: Setup Complete', canvas.width / 2, canvas.height / 2 + 40);

    console.log('Canvas initialized successfully');
  }
}
