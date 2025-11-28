import './styles/main.css';
import { Game } from '@core/Game';
import { Logger } from '@utils/Logger';
import { GameConfig } from '@config/GameConfig';

// Elemental Survivors - Entry Point
Logger.info('Elemental Survivors - Starting...');

// Canvas取得
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
if (!canvas) {
  Logger.error('Canvas element not found');
  throw new Error('Canvas element not found');
}

// Canvasサイズ設定
canvas.width = GameConfig.CANVAS_WIDTH;
canvas.height = GameConfig.CANVAS_HEIGHT;

// ゲーム初期化
const game = new Game(canvas);

// ゲーム開始
game.start();

Logger.info('Elemental Survivors - Phase 1: Core Engine Running');
