"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var query_1 = require("../../shared/service/support/query");
/**
 * Created by lh on 2016/10/28.
 */
var ArticleList = (function () {
    function ArticleList(articleService) {
        var _this = this;
        this.articleService = articleService;
        this.articles = [];
        this.query = new query_1.Query(0, 10);
        articleService.list(this.query).subscribe(function (data) { return _this.articles = data; });
    }
    ArticleList.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.query.page += 1;
            _this.articles.push(_this.articleService.list(_this.query));
        }, 500);
    };
    ArticleList = __decorate([
        core_1.Component({
            selector: 'article-list-page',
            templateUrl: 'list.html'
        })
    ], ArticleList);
    return ArticleList;
}());
exports.ArticleList = ArticleList;
//# sourceMappingURL=list.js.map