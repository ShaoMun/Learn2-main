import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FloatingBalance from './FloatingBalance';
import FloatingLoginButton from './FloatingLoginButton';

const GamePlay = () => {
  const mapWidth = 4240;
  const mapHeight = 2660;
  const scale = 0.4;
  const router = useRouter();

  const [position, setPosition] = useState({ x: 2350, y: 840 });
  const [sprite, setSprite] = useState('S.png');
  const [direction, setDirection] = useState('S');
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMapPosition({
        x: -2800 * scale + window.innerWidth / 2,
        y: -1300 * scale + window.innerHeight / 2,
      });
      setIsMounted(true);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === '1') {
      router.push('/tutorial');
      return;
    }

    if (e.key === '2') {
      router.push('/bank');
      return;
    }

    if (e.key === '3') {
      router.push('/shop');
      return;
    }

    if (e.key === '4') {
      router.push('/showcase');
      return;
    }

    if (e.key === '5') {
      router.push('/simulation');
      return;
    }

    let newPos = { ...position };
    let newMapPos = { ...mapPosition };
    switch (e.key) {
      case 'w':
      case 'W':
        newPos.y -= 20;
        setSprite('W.gif');
        setDirection('W');
        newMapPos.y += 20 * scale;
        break;
      case 'a':
      case 'A':
        newPos.x -= 20;
        setSprite('A.gif');
        setDirection('A');
        break;
      case 's':
      case 'S':
        newPos.y += 20;
        setSprite('S.gif');
        setDirection('S');
        newMapPos.y -= 20 * scale;
        break;
      case 'd':
      case 'D':
        newPos.x += 20;
        setSprite('D.gif');
        setDirection('D');
        break;
      default:
        break;
    }
    setPosition(newPos);
    setMapPosition({
      ...newMapPos,
      x: mapPosition.x, // Keep the horizontal position fixed
    });
  };

  const handleKeyUp = () => {
    setSprite(`${direction}.png`);
  };

  useEffect(() => {
    if (isMounted) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [direction, position, isMounted]);

  return (
    <div className="gameContainer">
      <FloatingLoginButton />
      <div className="mapWrapper">
        <div className="mapContainer">
          <Image src="/assets/map.png" alt="Map" layout="fill" />
          <div className="character">
            <Image src={`/assets/${sprite}`} alt="Character" width={188} height={188} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .gameContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 95vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }

        .mapWrapper {
          width: 80%;
          height: 80%;
          position: relative;
          overflow: hidden;
          border: 2px solid black;
          background-image: url('/assets/sea.png');
          background-size: cover;
        }

        .mapContainer {
          position: absolute;
          width: ${mapWidth}px;
          height: ${mapHeight}px;
          left: ${mapPosition.x}px;
          top: ${mapPosition.y}px;
          transition: top 0.1s, left 0.1s;
          transform: scale(${scale});
          transform-origin: top left;
        }

        .character {
          position: absolute;
          left: ${position.x}px;
          top: ${position.y}px;
          width: 128px;
          height: 128px;
        }
      `}</style>
    </div>
  );
};

export default GamePlay;
