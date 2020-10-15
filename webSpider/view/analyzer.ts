import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crowller";

interface Course {
  name: string,
  count: number | string
}

interface courseResult {
  time: number,
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

export default class webAnalyzer implements Analyzer {
  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItem = $(".course-item");
    let courseInfos: Course[] = [];
    courseItem.map(item => {
      const desc = $(item).find(".course-desc");
      const name = desc.eq(0).text();
      const count = desc.eq(1).text().split("：")[1];
      courseInfos.push({
        name,
        count
      })
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }

  private generateJsonContent(courseInfo: courseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      // 存在
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data; // key-value
    return fileContent;
  }

  public analyzer(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}