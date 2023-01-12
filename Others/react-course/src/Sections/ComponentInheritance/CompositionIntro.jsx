import React from "react";

/** In this section we will first see how to pass child item to a component.
 *
 * Some component don't know their children ahead of time. This is especially
 * common for components like Sidebar or dialog that represent generic "boxes".
 *
 * In this case we have another special props which is children prop. In this
 * children prop to pass children elements directly into their parent.
 */

const ParentContainer = (props) => {
  return <div>{props.children}</div>;
};

const ChildItems = () => {
  return (
    <div>
      <h1>This is child item.</h1>
    </div>
  );
};

// Now if we make another component in which we can make a container
// by using the ParentContainer component.

const WelcomeDialog = () => {
  return (
    <ParentContainer>
      <h1>Welcome</h1>
      <p>Now we are passing a child item component into a Parent Component.</p>
      <ChildItems />
    </ParentContainer>
  );
};

export default WelcomeDialog;