import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';


const seededRandom = (() => {
  var seed = 1;
  return { max : 2576436549074795, reseed (s) { seed = s }, random ()  { return seed = ((8765432352450986 * seed) + 8507698654323524) % this.max }}
})();

const randSeed = (seed) => seededRandom.reseed(seed|0);
const randSI = (min = 2, max = min + (min = 0)) => (seededRandom.random() % (max - min)) + min;
const randS  = (min = 1, max = min + (min = 0)) => (seededRandom.random() / seededRandom.max) * (max - min) + min;
/* TREE CONSTANTS all angles in radians and lengths/widths are in pixels */
const angMin = 0.01;  // branching angle min and max
const angMax= 0.6;
const lengMin = 0.8;  // length reduction per branch min and max
const lengMax = 0.9;
const widthMin = 0.6; // width reduction per branch min max
const widthMax = 0.8;
const trunkMin = 6;  // trunk base width ,min and max
const trunkMax = 10;
const maxBranches = 200; // max number of branches


const windX = -1;   // wind direction vector
const windY = 0;
const bendability = 15; // greater than 1. The bigger this number the more the thin branches will bend first

// the canvas height you are scaling up or down to a different sized canvas
const windStrength = 0.01 * bendability * ((200 ** 2) / (600 ** 2));  // wind strength


// The wind is used to simulate branch spring back the following
// two number control that. Note that the sum on the two following should
// be below 1 or the function will oscillate out of control
const windBendRectSpeed = 0.05;  // how fast the tree reacts to the wing
const windBranchSpring = 0.98;   // the amount and speed of the branch spring back

const gustProbability = 3/100; // how often there is a gust of wind


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  // Values trying to have a gusty wind effect
  windCycle = 0;
  windCycleGust = 0;
  windCycleGustTime = 0;
  currentWind = 0;
  windFollow = 0;
  windActual = 0;


  // The seed value for the tree
  treeSeed = Math.random() * 10000 | 0;

  // Vars to build tree with
  branchCount = 0;
  maxTrunk = 0;
  treeGrow = 0.01; // this value should not be zero

  constructor() { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.treeSeed = Math.random() * 10000 | 0;
    this.treeGrow = 0.1; // regrow tree  

    setInterval(() => {
      this.drawFrame();
    }, 50)

  }

  drawFrame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.drawTree(this.treeSeed);
    this.updateWind();
  }

  // Starts a new tree
  drawTree(seed) {
    this.branchCount = 0;
    this.treeGrow += 0.02;
    randSeed(seed);
    this.maxTrunk = randSI(trunkMin, trunkMax);
    this.drawBranch(this.ctx.canvas.width / 2, this.ctx.canvas.height, -Math.PI / 2, this.ctx.canvas.height / 5, this.maxTrunk);
  }

  // Recusive tree
  drawBranch(x, y, dir, leng, width) {
    this.branchCount ++;
    const treeGrowVal = (this.treeGrow > 1 ? 1 : this.treeGrow < 0.1 ? 0.1 : this.treeGrow) ** 2 ;
    
    // get wind bending force and turn branch direction
    const xx = Math.cos(dir) * leng * treeGrowVal;
    const yy = Math.sin(dir) * leng * treeGrowVal;
    const windSideWayForce = windX * yy - windY * xx;
    
    // change direction by addition based on the wind and scale to 
    // (windStrength * windActual) the wind force
    // ((1 - width / maxTrunk) ** bendability)  the amount of bending due to branch thickness
    // windSideWayForce the force depending on the branch angle to the wind
    dir += (windStrength * this.windActual) * ((1 - width / this.maxTrunk) ** bendability) * windSideWayForce;
    
    // draw the branch
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.lineTo(x, y);
    x += Math.cos(dir) * leng * treeGrowVal;
    y += Math.sin(dir) * leng * treeGrowVal;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    
    // if not to thing, not to short and not to many
    if (this.branchCount < maxBranches && leng > 5 && width > 1) {
        // to stop recusive bias (due to branch count limit)
        // random select direction of first recusive bend
        const rDir = randSI() ? -1 : 1;

        this.treeGrow -= 0.2;
        this.drawBranch(
            x,y,
            dir + randS(angMin, angMax) * rDir, 
            leng * randS(lengMin, lengMax), 
            width * randS(widthMin, widthMax)
        );
        // bend next branch the other way
        this.drawBranch(
            x,y,
            dir + randS(angMin, angMax) * -rDir, 
            leng * randS(lengMin, lengMax), 
            width * randS(widthMin, widthMax)
        );
        this.treeGrow += 0.2;
    }
  }

  // Dont ask this is a quick try at wind gusts 
  // Wind needs a spacial component this sim does not include that.
  updateWind() {
    if (Math.random() < gustProbability) {
        this.windCycleGustTime = (Math.random() * 10 + 1) | 0;
    }
    if (this.windCycleGustTime > 0) {
        this.windCycleGustTime --;
        this.windCycleGust += this.windCycleGustTime/20
    } else {
        this.windCycleGust *= 0.99;
    }
    this.windCycle += this.windCycleGust;
    this.currentWind = (Math.sin(this.windCycle/40) * 0.6 + 0.4) ** 2;
    this.currentWind = this.currentWind < 0 ? 0 : this.currentWind;
    this.windFollow += (this.currentWind - this.windActual) * windBendRectSpeed;
    this.windFollow *= windBranchSpring;
    this.windActual += this.windFollow;
  }

}
