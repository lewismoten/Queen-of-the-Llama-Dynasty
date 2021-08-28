import {useEffect, useRef} from 'react';

const TileGrid = () => {

  let ref = useRef(null);

  useEffect(() => {
    draw();
  }, [])

  const draw = () => {
    const ctx = ref.current.getContext('2d');
    ctx.fillStyle = '#440044';
    ctx.fillRect(0, 0, 50, 50);
  }

  return <canvas ref={ref} width="100%" height="100%" />
}

export default TileGrid;
