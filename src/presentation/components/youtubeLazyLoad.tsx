import { useState } from 'react';
import NextImage from 'next/image';

interface IProps {
  youtubeID: string;
  title: string;
}

export default function YouTubeLazyLoad({ youtubeID, title }: IProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      {showVideo ? (
        <iframe
          width={384}
          height={216}
          src={`https://www.youtube-nocookie.com/embed/${youtubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title || 'Youtube video'}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowVideo(true)}
          style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent', padding: 0 }}
          aria-label={`Play video ${title}`}
        >
          <NextImage src={`https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`} alt="" loading="lazy" height={216} width={384} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', fontSize: '100px', transform: 'translate(-50%, -50%)', color: '#6c8ffc' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
              className=""
            >
              <path fill="currentColor" d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28Z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
