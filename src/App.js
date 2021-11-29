import Header from "./components/header/header";
import Images from "./components/images/images"

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Header/>
      <Images/>
    </div>
  );
}

// TODO:
// - implement web scraping with Axios and Cheerio
// - have the ability to select what images to save and subsequently save them?
// - move to the next search query after saving

export default App;
