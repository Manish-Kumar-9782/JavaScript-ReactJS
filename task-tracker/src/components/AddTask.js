const AddTask = () => {
  return (
    <form>
      <div className="form-control">
        <label htmlFor="task">Task</label>
        <input type="text" name="task" id="task" placeholder="Add Task" />
      </div>

      <div className="form-control">
        <label htmlFor="daytime">Day & Time</label>
        <input
          type="text"
          name="daytime"
          id="daytime"
          placeholder="Add Day & Time"
        />
      </div>

      <div className="form-control form-control-check">
        <label htmlFor="remind">Set Reminder</label>
        <input type="checkbox" name="remind" id="remind" />
      </div>

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
