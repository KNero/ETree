ETreeNodeIconDrawer = new function()
{
	this.onButtonIconMouseOver = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.clearRect( _x, _y, _w, _h );
		_ctx.beginPath();
		_ctx.lineWidth = 3.3;
		_ctx.strokeStyle = "#0f5094";
		_ctx.arc( _w / 2, _h / 2, _h / 3.5, 0, Math.PI * 2 );
		_ctx.stroke();
		_ctx.restore();
	};
	
	this.onButtonIconMouseOut = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.clearRect( _x, _y, _w, _h );
		_ctx.beginPath();
		_ctx.lineWidth = 2.3;
		_ctx.strokeStyle = "#0f5094";
		_ctx.arc( _w / 2, _h / 2, _h / 4, 0, Math.PI * 2 );
		_ctx.stroke();
		_ctx.restore();
	};
	
	this.onOpen = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.fillStyle = "#0f5094";
		_ctx.fillRect( _w / 2 - 1.3, _h / 2 + 4, 2.6, 5 );
		_ctx.restore();
	};
	
	this.onClose = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.fillStyle = "#0f5094";
		_ctx.fillRect( _w / 2 + 4, _h / 2 - 1.3, 5, 2.6 );
		_ctx.restore();
	};
	
	this.drawDirectory = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.fillStyle = "#B7533B";
		_ctx.fillRect( _x + 2, _y + 2, _w - 4, _h - 4 );
		_ctx.restore();
	};
	
	this.drawFile = function( _ctx, _x, _y, _w, _h )
	{
		_ctx.save();
		_ctx.fillStyle = "#3B8983";
		_ctx.beginPath();
		_ctx.arc( _x + _w / 2, _h / 2, _w / 3, 0, 2 * Math.PI * 2 );
		_ctx.fill();
		_ctx.restore();
	};
	
	this.ratio = null;
	this.getContext2D = function( _canvas )
	{
		var context = _canvas.getContext( "2d" );
		
		if( ! this.ratio )
		{
			var devicePixelRatio = window.devicePixelRatio || 1;
			var backingStoreRatio = context.webkitBackingStorePixelRatio ||
										        context.mozBackingStorePixelRatio ||
										        context.msBackingStorePixelRatio ||
										        context.oBackingStorePixelRatio ||
										        context.backingStorePixelRatio || 1;
			
			this.ratio = devicePixelRatio / backingStoreRatio;
		}
		
		var oldWidth = _canvas.width;
		var oldHeight = _canvas.height;
		
		_canvas.width = oldWidth * this.ratio;
		_canvas.height = oldHeight * this.ratio;
		
		_canvas.style.width = oldWidth + 'px';
		_canvas.style.height = oldHeight + 'px';
		
		context.scale( this.ratio, this.ratio );
		
		return context;
	};
};