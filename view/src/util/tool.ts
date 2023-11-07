export const createCanvasImage = (
  width: number = 0,
  height: number = 0,
  hideSize: boolean = false,
) => {
  const canvasEL = document.createElement('canvas') as HTMLCanvasElement;
  canvasEL.width = width || 0;
  canvasEL.height = height || 0;
  const ctx = canvasEL.getContext('2d') as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvasEL.width, canvasEL.height);
  ctx.fillStyle = '#56565656';
  ctx.fillRect(0, 0, canvasEL.width, canvasEL.height);

  if (!hideSize) {
    const displayText = `${width} X ${height}`;
    ctx.textAlign = 'center';
    ctx.font = `bold ${
      Math.min(canvasEL.width, canvasEL.height) * 0.1
    }px sans-serif`;
    ctx.fillText(displayText, canvasEL.width / 2, canvasEL.height / 2);
  }
  ctx.save();
  const dataURL = canvasEL.toDataURL('image/png');
  return dataURL;
};
