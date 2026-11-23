import { useEffect, useRef } from 'react';

type Node = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
};

export default function NeuralCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let nodes: Node[] = [];
        const mouse = { x: -999, y: -999 };
        let animId: number;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            width = parent.clientWidth;
            height = parent.clientHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.max(
                24,
                Math.min(46, Math.floor((width * height) / 18000)),
            );
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                r: 1.5 + Math.random() * 1.8,
            }));
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -999;
            mouse.y = -999;
        };

        const parent = canvas.parentElement;
        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }

        const render = () => {
            if (width > 0 && height > 0) {
                ctx.clearRect(0, 0, width, height);

                for (let i = 0; i < nodes.length; i++) {
                    const n = nodes[i];
                    n.x += n.vx;
                    n.y += n.vy;

                    if (n.x < 0 || n.x > width) n.vx *= -1;
                    if (n.y < 0 || n.y > height) n.vy *= -1;

                    for (let j = i + 1; j < nodes.length; j++) {
                        const m = nodes[j];
                        const dx = n.x - m.x;
                        const dy = n.y - m.y;
                        const dist = Math.hypot(dx, dy);

                        if (dist < 130) {
                            ctx.strokeStyle = `rgba(98, 205, 0, ${(1 - dist / 130) * 0.22})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(n.x, n.y);
                            ctx.lineTo(m.x, m.y);
                            ctx.stroke();
                        }
                    }

                    const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
                    if (mDist < 150) {
                        ctx.strokeStyle = `rgba(175, 240, 158, ${(1 - mDist / 150) * 0.42})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }

                    ctx.fillStyle =
                        mDist < 150
                            ? 'rgba(175, 240, 158, 0.95)'
                            : 'rgba(98, 205, 0, 0.65)';
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            animId = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener('resize', resize);
        render();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
        />
    );
}
