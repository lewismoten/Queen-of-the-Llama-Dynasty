import {useEffect, useRef, useState} from 'react';

const TileGrid = () => {

  const canvasRef = useRef(null);
  const drawRequest = useRef();
  const lastDrawn = useRef(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const draw = time => {
    if(canvasRef.current) {
      const delta = time - lastDrawn.current;

      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#440044';
      ctx.fillRect(0, 0, 50, 50);

      lastDrawn.current = time;
    }
    drawRequest.current = requestAnimationFrame(draw);
  }

  useEffect(() => {
    drawRequest.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(drawRequest.current);
  }, [])



    return <canvas ref={canvasRef} width="100%" height="100%" />
  }

export default TileGrid;
