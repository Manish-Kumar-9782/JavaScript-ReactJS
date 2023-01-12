import PropTypes from "prop-types";
import ListItem from "./ListItem";
import ListItemX from "./ListItemX";
import ListHeader from "./ListHeader";
import { useState } from "react";

const checked = [true, false, true, true, false];

const ListBox = ({ dataPoints, listPos }) => {
  const [items, itemState] = useState(dataPoints);

  return (
    <ul className={"list" + listPos}>
      {/* List Header for list 7  */}
      {listPos === 7 ? (
        <ListHeader
          className="shadow-down-dark px-2"
          title="My ToDo Tasks"
          description="Complete These tasks to Reach Advance Level of HTML and CSS (front end) web development."
        />
      ) : (
        <></>
      )}

      {/* List Header for list 8 */}
      {listPos === 8 ? (
        <ListHeader
          className="text-center"
          title="Friday"
          description="March, 25"
          styles={{
            fontSize: "1.8rem",
          }}
          descStyles={{
            fontSize: "1.3rem",
          }}
        />
      ) : (
        <></>
      )}

      {listPos === 8
        ? items.map((item, index) => {
            // console.log(item);
            return (
              <ListItemX
                key={index}
                text={item}
                mark={
                  checked[index] ? (
                    <i className="bi bi-check-circle-fill text-success"></i>
                  ) : (
                    <i className="bi bi-x-circle-fill text-danger"></i>
                  )
                }
              />
            );
          })
        : items.map((item, index) => {
            // console.log(item);
            return <ListItem key={index} text={item} />;
          })}
    </ul>
  );
};

ListBox.defaultProps = {};

ListBox.propTypes = {
  dataPoints: PropTypes.array,
  items: PropTypes.string,
};

export default ListBox;
