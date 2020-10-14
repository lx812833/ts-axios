import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

interface Course {
  title: string,
  count: number | string
}

interface courseResult {
  time: number,
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private filePath = path.resolve(__dirname, "../data/course.json"); // course.json文件路径

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const result = this.getCourseInfo(html);
    console.log("result", result);
    const fileContent = this.generateJsonContent(result);
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
  }

  generateJsonContent(courseInfo: courseResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      // 存在
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data; // key-value
    return fileContent;
  }

  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $(".course-item");
    let courseInfos: Course[] = [];
    courseItem.map(item => {
      const desc = $(item).find(".course-desc");
      const title = desc.eq(0).text();
      const count = desc.eq(1).text().split("：")[1];
      courseInfos.push({
        title,
        count
      })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }
  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();