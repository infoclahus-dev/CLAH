/*
  Blueprint Canvas Component
  Integrates p5.js "Living Blueprint" animation with React
  Creates animated technical drawing lines on a grid as background
*/

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    p5: any;
  }
}

const BlueprintCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const sketch = (p: any) => {
      let walkers: any[] = [];
      const GRID_SIZE = 50;
      const MAX_WALKERS = 80;
      const BG_COLOR = [20, 24, 30];
      const ORANGE_ACCENT = [230, 81, 0];

      // Blueprint Walker Class
      class BlueprintWalker {
        startPos: any;
        currentPos: any;
        targetPos: any;
        isAccent: boolean;
        progress: number;
        speed: number;
        strokeColor: any;
        strokeWeight: number;

        constructor(x: number, y: number, isAccent: boolean) {
          this.startPos = p.createVector(snapToGrid(x), snapToGrid(y));
          this.currentPos = this.startPos.copy();
          this.targetPos = this.pickNewTarget();
          this.isAccent = isAccent;
          this.progress = 0;

          if (isAccent) {
            this.speed = p.random(0.05, 0.1);
            this.strokeColor = p.color(ORANGE_ACCENT[0], ORANGE_ACCENT[1], ORANGE_ACCENT[2], 200);
            this.strokeWeight = 2.5;
          } else {
            this.speed = p.random(0.005, 0.02);
            this.strokeColor = p.color(255, 255, 255, 30);
            this.strokeWeight = 1;
          }
        }

        pickNewTarget() {
          let r = p.floor(p.random(4));
          let length = GRID_SIZE * p.floor(p.random(2, 6));
          let dx = 0;
          let dy = 0;

          switch (r) {
            case 0: dx = length; break;
            case 1: dx = -length; break;
            case 2: dy = length; break;
            case 3: dy = -length; break;
          }

          return p.createVector(this.startPos.x + dx, this.startPos.y + dy);
        }

        update() {
          this.progress += this.speed;
          this.currentPos = p5.Vector.lerp(this.startPos, this.targetPos, this.progress);
        }

        display() {
          p.stroke(this.strokeColor);
          p.strokeWeight(this.strokeWeight);
          p.line(this.startPos.x, this.startPos.y, this.currentPos.x, this.currentPos.y);

          if (this.progress < 1.0) {
            p.noStroke();
            p.fill(this.strokeColor);
            let size = this.isAccent ? this.strokeWeight * 2 : this.strokeWeight * 1.5;
            p.ellipse(this.currentPos.x, this.currentPos.y, size);
          }
        }

        isDead() {
          return this.progress >= 1.0;
        }
      }

      function snapToGrid(val: number) {
        return p.floor(val / GRID_SIZE) * GRID_SIZE;
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current);
        p.background(BG_COLOR);
        p.strokeCap(p.SQUARE);

        for (let i = 0; i < 20; i++) {
          walkers.push(new BlueprintWalker(p.random(p.width), p.random(p.height), false));
        }
      };

      p.draw = () => {
        p.noStroke();
        p.fill(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2], 30);
        p.rect(0, 0, p.width, p.height);

        if (walkers.length < MAX_WALKERS && p.frameCount % 15 === 0) {
          walkers.push(new BlueprintWalker(p.random(p.width), p.random(p.height), false));
        }

        for (let i = walkers.length - 1; i >= 0; i--) {
          walkers[i].update();
          walkers[i].display();
          if (walkers[i].isDead()) {
            walkers.splice(i, 1);
          }
        }
      };

      p.mouseMoved = () => {
        if (p.frameCount % 3 === 0) {
          walkers.push(new BlueprintWalker(p.mouseX, p.mouseY, true));
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(BG_COLOR);
      };
    };

    // Wait for p5 to be available
    const initP5 = () => {
      if (window.p5) {
        p5Instance.current = new window.p5(sketch);
      } else {
        setTimeout(initP5, 100);
      }
    };

    initP5();

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default BlueprintCanvas;
