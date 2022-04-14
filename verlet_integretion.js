var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
let clothres = 29;
let points = [];
let ps = new Array(2);
let mousex, mousey;

class point
{
	vy = 0;
	vx = 0;
	oldx = 369;
	oldy = 299;
	g = 0.3;
	constructor(x, y, r)
	{
		this.x = x;
		this.y = y;
		this.r = r;
	}
	draw ()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fillStyle = "white";
		ctx.fill();
	}
	pointupdate(i)
	{
		this.vy = (this.y - this.oldy) * 0.99;
		this.vx = (this.x - this.oldx) * 0.99;
		this.oldy = this.y;
		this.oldx = this.x;
		this.x += this.vx;
		this.y += this.vy;
		this.y += this.g;
	
		if (this.y >= 800 - this.r)
		{
			this.y = 800 - this.r;
			this.oldy = this.y + this.vy * 0.9;
		}
		else if (this.y < 200 + this.r)
		{
			this.y = 200 + this.r;
			this.oldy = this.y + this.vy * 0.9;
		}
		if (this.x >= 1000 - this.r)
		{
			this.x = 1000 - this.r;
			this.oldx = this.x + this.vx * 0.9;
		}
		else if (this.x < 300 + this.r)
		{
			this.x = 300 + this.r;
			this.oldx = this.x + this.vx * 0.9;
		}
		if (i > 0)
		{
			if (this.x == mousex)
			{
				this.x = 12;
				this.oldx = this.x + this.vx * 0.9;
			}
			if (this.y == mousex)
			{
				this.y = 12;
				this.oldy = this.y + this.vy * 0.9;
			}
		}
		this.draw();
	}
}

class sticks
{
	dx = 0;
	dy = 0;
	offx = 0;
	offy = 0;
	d2 = 0;
	d1 = 0;
	diff = 0;
	constructor(width, color)
	{
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		this.d1 = 11;//Math.sqrt(Math.pow(points[0].x - points[1].x, 2) + Math.pow(points[0].y - points[1].y, 2));
	}
	createstick(ps)
	{
		for (let i = 0 ; i < ps.length ; i++)
		{
			let posx1 , posx2;
			let posy1, posy2;
			ctx.beginPath();
			if (i + 1 < ps.length)
			{
				this.dx = ps[i].x - ps[i + 1].x;
				this.dy = ps[i].y - ps[i + 1].y;
				this.d2 = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
				this.diff = this.d2 - this.d1;
				this.offx = this.dx * (this.diff/this.d2)/2;
				this.offy = this.dy * (this.diff/this.d2)/2;
				ps[i].x -= this.offx;
				ps[i + 1].x += this.offx;
				ps[i].y -= this.offy;
				ps[i + 1].y += this.offy;
				posx1 = ps[i].x;
				posx2 = ps[i + 1].x;
				posy1 = ps[i].y;
				posy2 = ps[i + 1].y;
			}
			ctx.moveTo(posx1, posy1);
			ctx.lineTo(posx2, posy2);
			ctx.stroke();
		}
	}

	// calcdist(x1, y1, x2, y2)
	// {
	// 	let dists = new Array(4);
	// 	this.dx = x1 - x2;
	// 	this.dy = y1 - y2;
	// 	this.d2 = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
	// 	this.diff = this.d2 - this.d1;
	// 	this.offx = this.dx * (this.diff/this.d2)/2;
	// 	this.offy = this.dy * (this.diff/this.d2)/2;
	// 	x1 -= this.offx;
	// 	x2 += this.offx;
	// 	y1 -= this.offy;
	// 	y2 += this.offy;
	// 	dists[0] = x1;
	// 	dists[1] = x2;
	// 	dists[2] = y1;
	// 	dists[3] = y2;
	// 	return dists;
	// }

	clothsticks(pss, res)
	{
		for (let i = 0; i < res - 1; i++)
			for (let j = 0; j < res - 1 ; j++)
			{
				let posx1, posy1, posx2, posy2;
				// let dists = this.calcdist(pss[i][j].x, pss[i + 1][j].x, pss[i][j].y, pss[i + 1][j].y);
				ctx.beginPath();

				this.dx = pss[i][j].x - pss[i + 1][j].x;
				this.dy = pss[i][j].y - pss[i + 1][j].y;
				this.d2 = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
				this.diff = this.d2 - this.d1;
				this.offx = this.dx * (this.diff/this.d2)/2;
				this.offy = this.dy * (this.diff/this.d2)/2;
				pss[i][j].x -= this.offx;
				pss[i + 1][j].x += this.offx;
				pss[i][j].y -= this.offy;
				pss[i + 1][j].y += this.offy;

				posx1 = pss[i][j].x;
				posx2 = pss[i + 1][j].x;
				posy1 = pss[i][j].y;
				posy2 = pss[i + 1][j].y;
				ctx.moveTo(posx1, posy1);
				ctx.lineTo(posx2, posy2);
				
				this.dx = pss[i][j].x - pss[i][j + 1].x;
				this.dy = pss[i][j].y - pss[i][j + 1].y;
				this.d2 = Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
				this.diff = this.d2 - this.d1;
				this.offx = this.dx * (this.diff/this.d2)/2;
				this.offy = this.dy * (this.diff/this.d2)/2;
				pss[i][j].x -= this.offx;
				pss[i][j + 1].x += this.offx;
				pss[i][j].y -= this.offy;
				pss[i][j + 1].y += this.offy;

				posx1 = pss[i][j].x;
				posx2 = pss[i][j + 1].x;
				posy1 = pss[i][j].y;
				posy2 = pss[i][j + 1].y;
				ctx.moveTo(posx1, posy1);
				ctx.lineTo(posx2, posy2);
				ctx.stroke();
			}
	}
}

for (let i = 0; i < 20; i++)
{
	points.push(new point(300 + i * 10, 300 + i * 10, 1));
	points[i].oldx += i * 10;
	points[i].oldy += i * 10;
}

let stick = new sticks(1, "white");
for (let i = 0; i < clothres * clothres ; i++)
	ps[i] = [];
for (let i = 0 ; i <= clothres; i++)
	for (let j = 0; j <= clothres ; j++)
	{
		let coordx = j * 3, coordy = i * 3;
		ps[i].push(new point(370 + coordx, 300 + coordy, 1));
		ps[i][j].oldx += coordx;
		ps[i][j].oldy += coordy;
	}
function cloth(fabric)
{
	for (let j = 0 ; j <= clothres ; j++)
	{
		fabric[0][j].x = 370 + j * 10;
		fabric[0][j].y = 300;
		fabric[0][j].g = 0;
		fabric[0][j].vx = 0;
		fabric[0][j].vy = 0;
	}
	for (let i = 0 ; i < clothres; i++)
		for (let j = 0; j < clothres ; j++)
			fabric[i][j].pointupdate(i);
	stick.clothsticks(fabric, clothres);
}

function rope()
{
	for (let i = 0 ; i < points.length; i++)
	{
		if (i == 0)
		{
			points[i].g = 0;
			points[i].vx = 0;
			points[i].vy = 0;
			points[i].y = 150;
			points[i].x = 350;
			points[i].oldx = 0;
			points[i].oldy = 0;
		}
		points[i].pointupdate();
	}
	stick.createstick(points);
}

function getmousepos(event)
{
	mousex = event.clientX;
	mousey = event.clientY;
}

function loop()
{

	window.requestAnimationFrame(loop);
	ctx.fillStyle = "black";
	ctx.fillRect(300, 200, 700, 600);
	cloth(ps);
	rope();
}

window.requestAnimationFrame(loop);
canvas.addEventListener('mousemove', (e) => {getmousepos(e)});
