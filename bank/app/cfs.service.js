System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var CfsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            CfsService = (function () {
                function CfsService(http) {
                    this.http = http;
                    this.ciceroUrl = "https://cfs-ws-itera.cicero.no/cfp/6/ws/rest/calculator/calculateLoan";
                    this.serviceUrl = this.ciceroUrl;
                    this.mockUrl = "calculateLoan.json";
                }
                CfsService.prototype.useRealService = function (useReal) {
                    if (useReal) {
                        this.serviceUrl = this.ciceroUrl;
                    }
                    else {
                        this.serviceUrl = this.mockUrl;
                    }
                    console.log(this.serviceUrl);
                };
                CfsService.prototype.calcCfsLoan = function (amount, years, rate) {
                    var currentTime = new Date();
                    var curMonth = currentTime.getMonth() + 1;
                    var curYear = currentTime.getFullYear();
                    var numberOfPayments = years * 12;
                    return this.http.get(this.serviceUrl + "?" +
                        "loanRaisingMonth=" + curMonth +
                        "&loanRaisingYear=" + curYear +
                        "&principalAmount=" + amount +
                        "&annualNominalInterestRate=" + rate +
                        "&totalNumberOfPayments=" + numberOfPayments)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                CfsService.prototype.extractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    var body = res.json();
                    return body || {};
                };
                CfsService.prototype.handleError = function (error) {
                    // In a real world app, we might send the error to remote logging infrastructure
                    var errMsg = error.message || 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                CfsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CfsService);
                return CfsService;
            }());
            exports_1("CfsService", CfsService);
        }
    }
});
//# sourceMappingURL=cfs.service.js.map