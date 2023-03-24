import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const IssuePopup = (props) => {
  const [EntryRecord, setEntryRecord] = useState(props);

  const handleSelection = (e) => {
    setEntryRecord({
      ...EntryRecord,
      userId: e.target.value,
      userModal: e.target.selectedOptions[0].dataset.userModal,
    });
  };

  return (
    <div className="issue-modal" tabIndex="-1">
      <Modal show={props.show}>
        <Modal.Header>
          <Modal.Title>Issue Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            name="issue"
            id="issue"
            placeholder="Select User"
            onChange={(e) => handleSelection(e)}
          >
            <option value="none" disabled selected>
              Select User
            </option>
            {props.options}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.handleVisibility(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => props.handleSave(EntryRecord)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssuePopup;
