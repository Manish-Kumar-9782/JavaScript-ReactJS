import "./App.css";
import "./Components/style.css";
import Header from "./Components/Header";
import Container from "./Components/Container";
import TechStack from "./Components/TechStack";
import BlockStack from "./Components/BlockStack";
import Article from "./Components/Article";
import FancyBorder from "./Components/FancyBorder";
import WebhookIcon from "@mui/icons-material/Webhook";
import { WebDesigningTools, JSTechs, navItems } from "./Components/data";
import {
  ImageBlock,
  TechDescription,
  TechTitleBlock,
  FooterDescriptions,
  FooterResourcesList,
  FooterWedDevCourseList,
  FooterSubscribe,
} from "./Components/Blocks";
const IMAGES = process.env.PUBLIC_URL + "/images/";

// const body = document.body;
// body.style.backgroundImage = "var(--gradient-color-2-30)";

function App() {
  // Article ClassNames
  const articleClassNames = "blur-4 border-style-1";

  const jsTechs = JSTechs.map((item, index) => {
    return (
      <FancyBorder
        style={{
          height: "350px",
          overflow: "hidden",
        }}
        element={
          <Article
            title={JSTechs[index].title}
            description={JSTechs[index].description}
          />
        }
        key={index}
        legendIcon={
          JSTechs[index].logo !== null ? (
            <img
              src={JSTechs[index].logo}
              style={{ height: "96px", width: "96px" }}
              alt=""
            />
          ) : (
            JSTechs[index].svg
          )
        }
      />
    );
  });

  jsTechs.unshift(
    <Article
      title="Javascript Framework & Libraries"
      description="We can Increase our project development speed by using These JS Libraries."
      style={{
        display: "flex",
        justifyContent: "end",
        height: "100%",
        flexDirection: "column",
      }}
      titleStyle={{
        fontSize: "2.5rem",
        fontWeight: "bold",
      }}
    />
  );

  console.log(jsTechs);

  return (
    <div className="App">
      {/* Top container */}

      <Container
        bgImage={IMAGES + "techImage5.jpg"}
        bgImageOverlay="bg-overlay"
      >
        <Header />
        <div className="text-center pb-5">
          <p className="gradient-blur">
            <span className="fs-2">Start Your Journey</span> <br />
            <span className="fs-1">Become A FullStack Developer</span>
            <br />
          </p>
          <div className="d-flex column-gap-3 jc-center"></div>
        </div>
        <TechStack items={navItems} />
      </Container>

      <Container
        title="Getting Start With Web Designing"
        titleGap={50}
        titleStyle={{
          fontSize: "3rem",
          fontWeight: "bold",
        }}
        gradientTitle="gradient-text"
        topGap={200}
        bottomGap={100}
        // bgGradientColor="var(--gradient-color-2-30)"
      >
        <BlockStack
          classNames="mb-5"
          col={2}
          Styles={["d-flex jc-center relative", ""]}
          style={{ height: "500px" }}
          blockStyles={{
            height: "100%",
          }}
        >
          <ImageBlock />
          <TechDescription classNames="h-100" />
        </BlockStack>
      </Container>

      <Container
        topGap={50}
        justifyContent="jc-center"
        bgImage={IMAGES + "techImage2.jpg"}
        bgImageOverlay="bg-cover bg-overlay"
      >
        <BlockStack
          col={4}
          style={{ height: "400px" }}
          blockColGap={20}
          blockStyles={{
            height: "80%",
          }}
        >
          {WebDesigningTools.map((item, index) => {
            return (
              <Article
                title={WebDesigningTools[index].title}
                description={WebDesigningTools[index].description}
                classNames={articleClassNames}
                bgImage={index === 0 ? "var(--gradient-color-2-30)" : "none"}
                borderStyle="groove"
              />
            );
          })}
        </BlockStack>
      </Container>

      <Container
        bgImage={IMAGES + "techImage3.jpg"}
        bgImageOverlay="bg-cover bg-overlay"
        topGap={50}
        style={{ height: "400px" }}
      >
        <BlockStack
          col={3}
          row={2}
          blockSizeOffset={-5}
          justifyContent="jc-center"
          blockRowGap={100}
          style={{
            height: "auto",
            paddingBottom: "100px",
            flexWrap: "wrap",
            color: "whitesmoke",
          }}
        >
          {
            jsTechs /** jstechs are JavaScript Technologies used in front end and backend web development */
          }
        </BlockStack>
      </Container>

      <Container
        bgImage={IMAGES + "gradient1.png"}
        topGap={20}
        bgImageOverlay="bg-overlay"
      >
        <BlockStack
          col={4}
          justifyContent="jc-center"
          style={{
            color: "white",
            columnGap: "10px",
          }}
        >
          <FooterDescriptions />
          <FooterResourcesList />
          <FooterWedDevCourseList />
          <FooterSubscribe />
        </BlockStack>
      </Container>
    </div>
  );
}

export default App;
