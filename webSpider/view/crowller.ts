import superagent from "superagent";
import cheerio from "cheerio";

interface Course {
  title: string,
  count: number | string
}

class Crowller {
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getCourseInfo(result.text);
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
  }
  constructor() {
    this.getRawHtml();
    // superagent
  }
}

const crowller = new Crowller();