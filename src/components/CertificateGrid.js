import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function CertificateItem({cert, onClick}) {
  const imgSrc = useBaseUrl(cert.imageSrc);

  return (
    <div
      className="cert-item"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${cert.title} certificate`}
    >
      <img src={imgSrc} alt={cert.title} loading="lazy" />
      <div className="cert-title">{cert.title}</div>
    </div>
  );
}

function Lightbox({cert, onClose}) {
  const imgSrc = useBaseUrl(cert.imageSrc);

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      role="dialog"
      aria-label={`${cert.title} certificate full view`}
    >
      <button
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        &times;
      </button>
      <img
        src={imgSrc}
        alt={cert.title}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function CertificateGrid({certificates}) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="cert-grid">
        {certificates.map((cert, index) => (
          <CertificateItem
            key={index}
            cert={cert}
            onClick={() => setSelectedImage(cert)}
          />
        ))}
      </div>

      {selectedImage && (
        <Lightbox cert={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
