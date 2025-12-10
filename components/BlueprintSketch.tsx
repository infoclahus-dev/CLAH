import React, { useEffect, useRef } from 'react';

const BlueprintSketch: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadSketch = async () => {
      const p5Module = await import('p5');
      const p5Instance = p5Module.default;

      const sketch = (p: any) => {
        let walkers: any[] = [];
        const GRID_SIZE = 50;
        const MAX_WALKERS = 80;
        const BG_COLOR = [20, 24, 30];
        const ORANGE_ACCENT = [230, 81, 0];

        const snapToGrid = (val: number) => {
          return Math.floor(val / GRID_SIZE) * GRID_SIZE;
        };

        class BlueprintWalker {
          startPos: { x: number; y: number };
          currentPos: { x: number; y: number };
          targetPos: { x: number; y: number };
          isAccent: boolean;
          progress: number;
          speed: number;
          strokeColor: any;
          strokeWeight: number;

          constructor(x: number, y: number, isAccent: boolean) {
            this.startPos = { x: snapToGrid(x), y: snapToGrid(y) };
            this.currentPos = { x: this.startPos.x, y: this.startPos.y };
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
            const r = Math.floor(p.random(4));
            const length = GRID_SIZE * Math.floor(p.random(2, 6));
            let dx = 0;
            let dy = 0;

            switch (r) {
              case 0: dx = length; break;
              case 1: dx = -length; break;
              case 2: dy = length; break;
              case 3: dy = -length; break;
            }

            return { x: this.startPos.x + dx, y: this.startPos.y + dy };
          }

          update() {
            this.progress += this.speed;
            this.currentPos.x = p.lerp(this.startPos.x, this.targetPos.x, this.progress);
            this.currentPos.y = p.lerp(this.startPos.y, this.targetPos.y, this.progress);
          }

          display() {
            p.stroke(this.strokeColor);
            p.strokeWeight(this.strokeWeight);
            p.line(this.startPos.x, this.startPos.y, this.currentPos.x, this.currentPos.y);

            if (this.progress < 1.0) {
              p.noStroke();
              p.fill(this.strokeColor);
              const size = this.isAccent ? this.strokeWeight * 2 : this.strokeWeight * 1.5;
              p.ellipse(this.currentPos.x, this.currentPos.y, size);
            }
          }

          isDead() {
            return this.progress >= 1.0;
          }
        }

        p.setup = function() {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.background(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
          p.strokeCap(p.SQUARE);

          for (let i = 0; i < 20; i++) {
            walkers.push(new BlueprintWalker(p.random(p.width), p.random(p.height), false));
          }
        };

        p.draw = function() {
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

        p.mouseMoved = function() {
          if (p.frameCount % 3 === 0) {
            walkers.push(new BlueprintWalker(p.mouseX, p.mouseY, true));
          }
        };

        p.windowResized = function() {
          if (p.windowWidth > 0 && p.windowHeight > 0) {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            p.background(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]);
          }
        };
      };

      sketchRef.current = new p5Instance(sketch, containerRef.current);
    };

    loadSketch();

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default BlueprintSketch;
