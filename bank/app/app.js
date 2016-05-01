System.register(['angular2/core', 'angular2/common', 'angular2/http', 'angular2-highcharts', "./cfs.service"], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, angular2_highcharts_1, cfs_service_1;
    var BlurForwarder, App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_highcharts_1_1) {
                angular2_highcharts_1 = angular2_highcharts_1_1;
            },
            function (cfs_service_1_1) {
                cfs_service_1 = cfs_service_1_1;
            }],
        execute: function() {
            BlurForwarder = (function () {
                function BlurForwarder(elRef, renderer) {
                    this.elRef = elRef;
                    this.renderer = renderer;
                }
                BlurForwarder.prototype.onBlur = function ($event) {
                    this.renderer.invokeElementMethod(this.elRef.nativeElement, 'dispatchEvent', [new CustomEvent('input-blur', { bubbles: true })]);
                    // or just
                    // el.dispatchEvent(new CustomEvent('input-blur', { bubbles: true }));
                    // if you don't care about webworker compatibility
                };
                BlurForwarder = __decorate([
                    core_1.Directive({
                        selector: 'input,select',
                        host: { '(blur)': 'onBlur($event)' }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], BlurForwarder);
                return BlurForwarder;
            }());
            App = (function () {
                function App(cfsService, fb) {
                    this.cfsService = cfsService;
                    this.fb = fb;
                    this.useRealService = false;
                    this.amount = 2500000;
                    this.years = 30;
                    this.rate = 3.5;
                    this.payment = 2000;
                }
                App.prototype.changeService = function (event) {
                    this.useRealService = event.target.checked;
                    this.calcLoan();
                };
                App.validateAmount = function (c) {
                    var numValue = parseInt(c.value);
                    return (numValue >= 10000 && numValue <= 100000000) ? null : {
                        validateAmount: {
                            valid: false
                        }
                    };
                };
                App.validateYears = function (c) {
                    var numValue = parseInt(c.value);
                    return (numValue >= 1 && numValue <= 40) ? null : {
                        validateYears: {
                            valid: false
                        }
                    };
                };
                App.validateRate = function (c) {
                    var rateValue = parseFloat(c.value);
                    return (rateValue >= 0 && rateValue <= 20) ? null : {
                        validateRate: {
                            valid: false
                        }
                    };
                };
                App.prototype.ngOnInit = function () {
                    this.form = this.fb.group({
                        'amount': ['', common_1.Validators.compose([common_1.Validators.required, App.validateAmount])],
                        'years': ['', common_1.Validators.compose([common_1.Validators.required, App.validateYears])],
                        'rate': ['', common_1.Validators.compose([common_1.Validators.required, App.validateRate])]
                    });
                    this.calcLoan();
                    this.formatViewValues();
                };
                App.prototype.onKey = function (event) {
                    var _this = this;
                    clearTimeout(this.timeout);
                    console.log(event);
                    this.timeout = setTimeout(function () {
                        if (_this.form.valid) {
                            _this.parseValues();
                            _this.calcLoan();
                        }
                    }, 500);
                };
                App.prototype.onFocusAmount = function (event) {
                    this.form.controls['amount'].updateValue(this.amount);
                };
                App.prototype.onFocusYears = function (event) {
                    this.form.controls['years'].updateValue(this.years);
                };
                App.prototype.onFocusRate = function (event) {
                    this.form.controls['rate'].updateValue(this.rate);
                };
                App.prototype.onBlur = function (event) {
                    this.parseValues();
                    this.formatViewValues();
                };
                App.prototype.calcLoan = function () {
                    var _this = this;
                    this.cfsService.useRealService(this.useRealService);
                    this.errorMessage = undefined;
                    this.cfsService.calcCfsLoan(this.amount, this.years, this.rate).subscribe(function (data) {
                        _this.loanData = data;
                        _this.payment = _this.loanData.amortizationSchedule[0].payment;
                        _this.buildChart(_this.loanData.sumInterest, _this.loanData.sumTaxDeductions, _this.loanData.sumPayments, _this.loanData.sumFees);
                    }, function (error) {
                        _this.errorMessage = error;
                        console.log('error', error);
                    });
                };
                App.prototype.buildChart = function (interestPayment, taxDeduction, payment, fees) {
                    this.chartOptions = {
                        title: { text: "" },
                        chart: {
                            type: 'pie',
                            backgroundColor: 'transparent',
                            style: {
                                color: "white",
                                textShadow: false
                            }
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.y:,.0f} ({point.percentage:.1f} %)',
                                    style: {
                                        color: '(Highcharts.theme && Highcharts.theme.contrastTextColor)' || 'white',
                                        textShadow: false
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                                name: 'Payment',
                                data: [
                                    { name: "interest", y: interestPayment },
                                    { name: "tax deduction", y: taxDeduction },
                                    { name: "payments", y: payment, sliced: true, selected: true },
                                    { name: "fees", y: fees }
                                ]
                            }]
                    };
                };
                App.prototype.formatViewValues = function () {
                    this.form.controls['amount'].updateValue(this.amount + " kr");
                    this.form.controls['years'].updateValue(this.years + " kr");
                    this.form.controls['rate'].updateValue(this.rate + " %");
                };
                App.prototype.parseValues = function () {
                    this.amount = parseInt(this.form.controls['amount'].value);
                    this.years = parseInt(this.form.controls['years'].value);
                    this.rate = parseFloat(this.form.controls['rate'].value);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.html',
                        styleUrls: ['app/app.css'],
                        directives: [BlurForwarder, angular2_highcharts_1.CHART_DIRECTIVES],
                        host: { '(input-blur)': 'onBlur($event)' },
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            cfs_service_1.CfsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [cfs_service_1.CfsService, common_1.FormBuilder])
                ], App);
                return App;
            }());
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=app.js.map