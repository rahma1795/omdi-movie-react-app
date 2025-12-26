import "../global.scss";

export default function MovieModal({ poster, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-close" onClick={onClose}>X Close</div>
      <div className="modal">
        <img src={poster} alt="poster" />
      </div>
    </div>
  );
}