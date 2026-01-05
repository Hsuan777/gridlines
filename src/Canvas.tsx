import { useEffect, useRef } from 'react';

interface CanvasProps {
  files: FileList | null;
  rows?: number;
  cols?: number;
  linesColor?: string;
}

function Canvas({ files, rows = 3, cols = 3, linesColor = 'rgba(255, 255, 255, 0.5)' }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (files && files[0] && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = URL.createObjectURL(files[0]);
      img.onload = () => {
        // 設置 canvas 尺寸
        canvas.width = img.width;
        canvas.height = img.height;

        // 繪製圖片
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // 繪製格線
        const rowsCount = rows;
        const colsCount = cols;
        const cellWidth = img.width / colsCount;
        const cellHeight = img.height / rowsCount;

        ctx.strokeStyle = linesColor;
        ctx.lineWidth = 2.5;

        // 畫垂直線
        for (let i = 1; i < cols; i++) {
          const x = i * cellWidth;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, img.height);
          ctx.stroke();
        }

        // 畫水平線
        for (let i = 1; i < rows; i++) {
          const y = i * cellHeight;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(img.width, y);
          ctx.stroke();
        }
      };
    }
  }, [files, rows, cols, linesColor]);
  return <canvas ref={canvasRef} className="object-contain h-full w-full" />;
}
export default Canvas;