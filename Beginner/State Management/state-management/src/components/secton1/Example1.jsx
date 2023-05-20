import React from "react";
import { useState } from "react";
// state management with declarative and imperative way
const Example1 = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("empty");
  // empty, typing, submitting, success, error

  const checkAnswer = (resolve, reject) => {
    if (value == "3.14") {
      setStatus("success");
      resolve();
      return true;
    } else {
      setStatus("error");
      setError("Wrong Answer: Your answer is Wrong.");
      reject();
      return false;
    }
  };

  const handleSubmit = () => {
    const response = new Promise((resolve, reject) => {
      setStatus("submitting");

      setTimeout(() => {
        checkAnswer(resolve, reject);
      }, 2000);
    });

    response.catch(() => {
      console.error("Error: Wrong Answer: Your answer is Wrong.");
    });
  };

  const button_label = status !== "submitting" ? "Submit" : "Submitting...";

  return (
    <div className="d-flex  vh-100 border shadow justify-content-center align-items-center ">
      <form className="border shadow w-50">
        <div className="mb-4 p-3">
          <label htmlFor="state" className="form-label">
            What is the value of PI in format: 0.00 ?
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (status !== "typing") setStatus("typing");
            }}
          />
          <div className="mt-2 d-flex align-items-center justify-content-center gap-2">
            <button
              type="button"
              disabled={status !== "typing"}
              className="btn btn-success"
              onClick={handleSubmit}
            >
              {button_label}
            </button>
            {status === "submitting" ? (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
              </div>
            ) : null}
          </div>
        </div>
        <p className="text-danger" hidden={status !== "error"}>
          {error}
        </p>
        <p className="text-success fs-3" hidden={status !== "success"}>
          Answer Submitted
        </p>
      </form>
    </div>
  );
};

export default Example1;
