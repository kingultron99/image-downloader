const { contextBridge, ipcRenderer } = require("electron");
const puppeteer = require('puppeteer');
const cheerio   = require('cheerio');

contextBridge.exposeInMainWorld("controls", {
  minimise: () => ipcRenderer.invoke("minimise"),
  maximise: () => ipcRenderer.invoke("maximise"),
  close:    () => ipcRenderer.invoke("close")
})

contextBridge.exposeInMainWorld("images", {
  get: async (link) => {
    try {
      const browser = await puppeteer.launch({ headless: true })
      const page    = await browser.newPage();
      const images  = []

      await page.goto(link);

      var html = await page.content()
      html = html.toString()

      const $ = cheerio.load(html);

      $('.bRMDJf.islir').each((iter, el) => {
        if (iter <= 19) {
          images.push({
            index: iter,
            image: $(el).children().first().prop('src')
          })
        }
      })

      browser.close()

      return images

    } catch (err) {
      console.log(err)
    }
  }
})