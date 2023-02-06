import DescriptiveList from "./DescriptiveList";
import { WebDesigningTools, webSteps } from "./data";
const Images = process.env.PUBLIC_URL + "/Images";

const ImageBlock = () => {
  return (
    <div className="image-layer-40">
      <img
        src={Images + "/tech-image1.jpg"}
        alt="teach"
        style={{ translate: "40% -75%" }}
      />
      <img
        src={Images + "/tech-image2.jpg"}
        alt="teach"
        style={{ translate: "-50% 0%" }}
      />
      <img
        src={Images + "/tech-image3.jpg"}
        alt="teach"
        style={{ translate: "40% +75%" }}
      />
    </div>
  );
};

const TechDescription = (props) => {
  return (
    <div className={"p-3".concat(" ", props.classNames)}>
      <h2
        className="text-center"
        style={{ color: "var(--theme-text-color-1)" }}
      >
        Web Designing Steps
      </h2>
      <DescriptiveList items={webSteps} classNames="h-100" />
    </div>
  );
};

const TechTitleBlock = () => {
  return (
    <div className="p-3">
      <h4 className="text-center pb-3">{WebDesigningTools[0].title}</h4>
      <p>{WebDesigningTools[0].description}</p>
    </div>
  );
};
// ========================================================================//
// const NodJsTech = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">NodeJs</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };
// const ReactJs = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">ReachJS</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };
// const ReactNative = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">React Native</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };
// const ExpressJs = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">ExpressJs</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };
// const VueJs = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">VueJs</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };
// const NextJs = () => {
//   return (
//     <div className="p-3">
//       <h4 className="text-center pb-3">NextJs</h4>
//       <p>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio veniam
//       </p>
//     </div>
//   );
// };

const FooterDescriptions = () => {
  return (
    <div className="p-3">
      <h4 className="pb-3">A Word For Web Development</h4>
      <p>
        Web development is the work involved in developing a website for the
        Internet or an intranet. Web development can range from developing a
        simple single static page of plain text to complex web applications,
        electronic businesses, and social network services.
      </p>
    </div>
  );
};

const FooterResourcesList = () => {
  return (
    <div class="p-3">
      <h4>Web Development Resources</h4>
      <ul>
        <li>W3School</li>
        <li>MDN web development</li>
        <li>Tutorials Point</li>
        <li>JavaTutorial Point</li>
        <li>Geeks for Geeks</li>
        <li>Devdocs</li>
      </ul>
    </div>
  );
};

const FooterWedDevCourseList = () => {
  return (
    <div class="p-3">
      <h4>Other Technologies</h4>
      <ul>
        <li>MySQL, Oracle</li>
        <li>MongoDB</li>
        <li>Angular</li>
        <li>PHP and Laravel</li>
        <li>Python Django</li>
        <li>.NET Platform</li>
      </ul>
    </div>
  );
};

const FooterSubscribe = () => {
  return (
    <div class="p-3">
      <h4>Subscribe News later</h4>
      <p>
        Subscribe the News later to receive the latest information about the
        changes in web development and related Technology.
      </p>
      <div className="d-flex gap-1">
        <input type="email" className="bg-trans-blur" />
        <button type="button" className="btn btn-transparent">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export {
  ImageBlock,
  TechDescription,
  TechTitleBlock,
  // NodJsTech,
  // ReactNative,
  // ExpressJs,
  // VueJs,
  // ReactJs,
  // NextJs,
  FooterDescriptions,
  FooterResourcesList,
  FooterWedDevCourseList,
  FooterSubscribe,
};
