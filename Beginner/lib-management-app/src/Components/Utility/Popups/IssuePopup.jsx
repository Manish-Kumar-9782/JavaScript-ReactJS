import React, { useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Select, { OptGroup, Option } from "../Select";
import { Const } from "../Utility";
const IssuePopup = ({
  show,
  handleVisibility,
  handleSave,
  userOptions,
  bookOptions,
  disableModal,
  disableModalSelected,
}) => {
  const [EntryRecord, setEntryRecord] = useState({});

  useEffect(() => {
    console.log("Entry Record: ", EntryRecord);
  }, [EntryRecord]);

  const handleSelection = (e) => {
    setEntryRecord({
      ...EntryRecord,
      userId: e.target.value,
      userModal: e.target.selectedOptions[0].dataset.userModal,
    });
  };

  const handleSelectBook = (e) => {
    setEntryRecord({
      ...EntryRecord,
      bookId: e.target.value,
    });
  };

  return (
    <div className="issue-modal" tabIndex="-1">
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Issue Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <Select
              name="issue-user"
              id="issue-user"
              placeholder="Select User"
              onSelect={handleSelection}
              disabled={disableModal === Const.USER_MODAL ? true : false}
            >
              {userOptions}
            </Select>

            <Select
              name="issue-book"
              id="issue-book"
              placeholder="Select Book"
              onSelect={handleSelectBook}
              disabled={disableModal === Const.BOOK_MODAL ? true : false}
            >
              {bookOptions}
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleVisibility(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSave(EntryRecord, setEntryRecord)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssuePopup;
