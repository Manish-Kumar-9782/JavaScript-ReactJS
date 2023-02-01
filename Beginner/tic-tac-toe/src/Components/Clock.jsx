const Clock = (props) => {
  return (
    <div className="clock">
      <p>
        <span>Time: </span> <span>{props.time}</span>
      </p>
    </div>
  );
};

export default Clock;
