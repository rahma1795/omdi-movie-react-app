import "../global.scss";

export default function Loader({ white = false }) {
  return (
    <div className={`loader ${white ? "white" : ""}`}></div>
  );
}
