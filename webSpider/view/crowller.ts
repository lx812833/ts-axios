import superagent from "superagent";
import fs from "fs";
import path from "path";

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, "../data/course.json"); // course.json文件路径

  async getRawHtml(url: string) {
    const result = await superagent.get(url);
    return result.text;
  }

  writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml(this.url);
    const fileContent = this.analyzer.analyzer(html, this.filePath);
    this.writeFile(fileContent);
  }

  /**
   * new 一个实例对象后，constructor立即执行
   * constructor 具有简便写法 后用this调用
   * (复杂写法:)
   *  private url: string
      private analyzer: Analyzer
      constructor(url_: string, analyzer_: Analyzer) {
        this.url = url_;
        this.analyzer = analyzer_;
        this.initSpiderProcess();
      }
   */
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

export default Crowller;