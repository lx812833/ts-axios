"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var webAnalyzer = /** @class */ (function () {
    function webAnalyzer() {
    }
    webAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $(".course-item");
        var courseInfos = [];
        courseItem.map(function (item) {
            var desc = $(item).find(".course-desc");
            var name = desc.eq(0).text();
            var count = desc.eq(1).text().split("：")[1];
            courseInfos.push({
                name: name,
                count: count
            });
        });
        return {
            time: new Date().getTime(),
            data: courseInfos
        };
    };
    webAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            // 存在
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courseInfo.time] = courseInfo.data; // key-value
        return fileContent;
    };
    webAnalyzer.prototype.analyzer = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return webAnalyzer;
}());
exports.default = webAnalyzer;
