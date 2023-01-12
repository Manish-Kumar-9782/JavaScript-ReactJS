const Navigator = ({ onLeftClick, onRightClick }) => {
  return (
    <div className="navigator flex-row jc-around w-20">
      <button onClick={onLeftClick}>
        <i class="bi bi-caret-left-fill"></i>
      </button>
      <button onClick={onRightClick}>
        <i class="bi bi-caret-right-fill"></i>
      </button>
    </div>
  );
};

export default Navigator;
