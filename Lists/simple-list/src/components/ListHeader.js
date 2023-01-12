const ListHeader = ({ title, description, styles, descStyles, className }) => {
  return (
    <div style={styles} className={"list-header " + className}>
      <h3 className="my-1">{title}</h3>
      <p className="lh-1 my-1" style={descStyles}>
        {description}
      </p>
    </div>
  );
};

ListHeader.defaultProps = {
  styles: {
    marginBottom: "25px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  descStyles: {
    fontFamily: "monospace",
    fontSize: "small",
  },
};

export default ListHeader;
