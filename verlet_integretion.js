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
		this.y += 0.3;
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
	constructor(width, color)
	{
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
	}
	createstick(ps)
	{
		for (let i = 0 ; i < ps.length ; i++)
		{
			if (i + 1 < ps.length)
			{
				ctx.beginPath();
				ctx.moveTo(ps[i].x, ps[i].y);
				ctx.lineTo(ps[i + 1].x, ps[i + 1].y);
				ctx.stroke();
			}
			else
			{
				ctx.beginPath();
				ctx.moveTo(ps[i].x, ps[i].y);
				ctx.lineTo(ps[0].x, ps[0].y);
				ctx.stroke();
			}
		}
	}
}

for (let i = 0; i < 10; i++)
	points.push(new point(300 + Math.random() * 100, 300 + Math.random() * 100, 5));

let stick = new sticks(2, "white");
function loop()
{
	window.requestAnimationFrame(loop);
	console.log(points.length);
	ctx.fillStyle = "black";
	ctx.fillRect(300, 200, 700, 600);
	for (let i = 0 ; i < points.length ; i++)
		points[i].pointupdate();
	stick.createstick(points);
}

window.requestAnimationFrame(loop);
