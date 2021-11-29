import { Component } from "react";
import Button from "../button/button";
import Image from "./image";
import readXlsxFile from "read-excel-file";
import cheerio from 'cheerio'

export default class Images extends Component {
  constructor(props) {
    super(props)

    this.state = {
      iter: 0,
      data: <p className="text-white mt-1">Waiting for input!</p>,
      query: "",
      spreadsheet: "",
      filelen: 0,
    }

    this.GetImages = this.GetImages.bind(this);
    this.FileParser = this.FileParser.bind(this);
    this.HandleButton = this.HandleButton.bind(this);
    this.HandleNext = this.HandleNext.bind(this);
  }

  GetImages = (_, num) => {
    var request;
    var i;

    if (!num) i = this.state.iter;
    else i = parseInt(num);

    if (this.state.spreadsheet !== "") {
      var list = this.state.spreadsheet.toString().split(', ')
      request = list[i].split(" ");
      request = request.join("+")
      this.setState({ query: list[i] })
    } else {
      request = this.state.query.split(" ");
      request = request.join("+")
    }

    var getdata = async (request) => {
      this.setState({ data: <p className="text-white mt-1">Loading images...</p> })
      const data = await window.images.get(`https://www.google.com/search?q=${request}&tbm=isch`).then(images => images.map(({ image, _ }, index) => {
        return (
          <Image index={index} image={image} />
        )
      }));

      if (data.length === 0) {
        this.setState({ data: <p className="text-white mt-1">There were no results!<br />try searching something else or uploading a spreadsheet with a list of requests 😉</p> })
      } else this.setState({ data: data });
    }
    getdata(request)
  }

  FileParser = (event) => {
    var queries = []
    if (event.target.files.length > 0) {
      this.setState({ iter: 0 })
      document.getElementById("single-search").setAttribute("disabled", true)
      readXlsxFile(event.target.files[0]).then(rows => {
        queries.push(rows.join(", "));
        this.setState({ filelen: rows.length})
      })
      this.setState({ spreadsheet: queries })
    }
    else {
      document.getElementById("single-search").removeAttribute("disabled");
      this.setState({ query: "" })
      this.setState({ spreadsheet: "" })
      this.setState({ filelen: 0 })
    }
  }

  HandleButton = () => {
    const imageContainer = document.getElementById('root').outerHTML;

    const $ = cheerio.load(imageContainer);

    $("img").each((_iter, el) => { 
      if ($(el).attr("value") === "true") {
        var link = document.createElement('a')
        link.setAttribute('href', $(el).prop('src'));
        link.setAttribute("download", "Your_Image.jpg")
        link.click()
      }
    })
  }

  HandleText = (e) => {
    if (e.target.value != "") {
      this.setState({ query: e.target.value })
      document.getElementById("file-input").setAttribute("disabled", true)
    } else {
      this.setState({ query: "" })
      document.getElementById("file-input").removeAttribute("disabled")
    }
  }

  HandleNext = (e) => {
    this.setState(({ iter, filelen }) => ({
      iter: iter + 1,
      filelen: filelen - 1
    }));
    var iter = this.state.iter;
    iter = iter.toString()
    this.GetImages(e, iter);
  }

  render() {
    return (
      <div id="image-container" className="pt-9 container mx-auto p-1 flex flex-col w-screen">
        <div>
          <input id="single-search" className="rounded p-1 pl-2" type="text" placeholder="albus dumbledore" onChange={this.HandleText} />
          <input id="file-input" className="rounded m-1 ml-2 text-white" type="file" accept=".xlsx" onChange={this.FileParser} />
          { this.state.query === "" && this.state.spreadsheet === "" ? <input type="submit" className="ml-2 p-1 rounded cursor-default" onClick={this.GetImages} disabled/> : <input type="submit" className="ml-2 p-1 rounded cursor-pointer" onClick={this.GetImages}/> }
          <h1 className="text-gray-100 font-bold text-lg">Results for: "{this.state.query}"</h1>
          <p className="text-gray-200 text-md">{this.state.filelen > 0 ? this.state.filelen + " Queries remaining in file." : ""}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center">{this.state.data}</div>
        <Button text="Save" id="save" onClick={this.HandleButton}/>
        {this.state.filelen !== 0 ? <Button text="Next" id="next" onClick={this.HandleNext} className="right-20"/> : <></>}
        
      </div>
    )
  }
}