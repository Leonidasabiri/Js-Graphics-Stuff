var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
let points = [];
ctx.fillStyle = "";

class point
{
	vy = 0;
	vx = 0;
	oldx = 250;
	oldy = 295;
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
	pointupdate()
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
		this.d1 = Math.sqrt(Math.pow(points[0].x - points[1].x, 2) + Math.pow(points[0].y - points[1].y, 2));
	}
	createstick(ps, d1)
	{
		console.log(this.d1);
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
			// else
			// {
			// 	posx1 = ps[i].x;
			// 	posx2 = ps[0].x;
			// 	posy1 = ps[i].y;
			// 	posy2 = ps[0].y;
			// }
			ctx.moveTo(posx1, posy1);
			ctx.lineTo(posx2, posy2);
			ctx.stroke();
		}
	}
}

for (let i = 0; i < 16; i++)
	points.push(new point(300 + i * 10, 300 + i * 10, 2));

let stick = new sticks(2, "white");
function loop()
{
	window.requestAnimationFrame(loop);
	ctx.fillStyle = "black";
	ctx.fillRect(300, 200, 700, 600);
	for (let i = 0 ; i < points.length ; i++)
	{
		if (i == 0)
		{
			points[i].g = 0;
			points[i].vx = 0;
			points[i].vy = 0;
			points[i].y = 100;
			points[i].x = 300;
			points[i].oldx = 0;
			points[i].oldy = 0;
		}
		points[i].pointupdate();
	}
	stick.createstick(points, 1);
}

window.requestAnimationFrame(loop);
