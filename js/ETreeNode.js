ETreeNode = function( _parent )
{
	this.div = document.createElement( "div" );
	this.myDiv = document.createElement( "div" );
	this.depthSpan = document.createElement( "span" );
	this.iconSpan = document.createElement( "span" );
	this.nameSpan = document.createElement( "span" );
	this.childDiv = document.createElement( "div" );
	
	this.iconCtx;
	this.iconSize = 20;
	this.selectColor = "rgba(126,187,95,0.6)";
	this.textFont = "11px verdana";
	
	this.tree;
	this.parentNode = _parent;
	this.childNodes = new Array();
	
	this.depth;
	this.name;
	
	var self = this;
	
	this.init = function()
	{
		this.depthSpan.style.display = "inline-block";
		this.depthSpan.style.width = ( this.depth * 20 ) + "px";
		this.iconSpan.style.width = ( this.iconSize * 2 ) + "px";
		this.iconSpan.style.height = this.iconSize + "px";
		this.iconSpan.style.display = "inline-block";
		this.iconSpan.style.verticalAlign = "bottom";
		this.nameSpan.textContent = this.name;
		this.nameSpan.style.font = this.textFont;
		this.nameSpan.style.paddingLeft = "3px";
		this.nameSpan.style.cursor = "default";
		this.nameSpan.style.display = "inline";
		this.childDiv.hidden = true;
		
		this.div.appendChild( this.myDiv );
		this.myDiv.appendChild( this.depthSpan );
		this.myDiv.appendChild( this.iconSpan );
		this.myDiv.appendChild( this.nameSpan );
		this.div.appendChild( this.childDiv );
		
		var iconCanvas = document.createElement( "canvas" );
		this.iconSpan.appendChild( iconCanvas );
		iconCanvas.width = this.iconSize * 2;
		iconCanvas.height = this.iconSize;
		this.iconCtx = ETreeNodeIconDrawer.getContext2D( iconCanvas );
		
		this.myDiv.onclick = function( _evt )
		{
			if( _evt.offsetX > self.iconSize )
			{
				if( self.tree.selectedNode )
				{
					self.tree.onUnSelect();
				}
				
				self.myDiv.style.backgroundColor = self.selectColor;
				self.tree.selectedNode = self;
				self.tree.onSelect( self );
				self.onSelect();
			}
		};
		this.iconSpan.onclick = function( _evt )
		{
			if( _evt.offsetX < self.iconSize )
			{
				if( self.childNodes.length > 0 )
				{
					ETreeNodeIconDrawer.onButtonIconMouseOver( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
					
					if( self.childDiv.hidden )
					{
						self.childDiv.hidden = false;
						ETreeNodeIconDrawer.onOpen( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
					}
					else
					{
						self.childDiv.hidden = true;
						ETreeNodeIconDrawer.onClose( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
					}
				}
			}
		};
		this.iconSpan.onmouseover = function()
		{
			if( self.childNodes.length > 0 )
			{
				ETreeNodeIconDrawer.onButtonIconMouseOver( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				
				if( self.childDiv.hidden )
				{
					ETreeNodeIconDrawer.onClose( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				}
				else
				{
					ETreeNodeIconDrawer.onOpen( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				}
			}
		};
		this.iconSpan.onmouseout = function()
		{
			if( self.childNodes.length > 0 )
			{
				ETreeNodeIconDrawer.onButtonIconMouseOut( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				
				if( self.childDiv.hidden )
				{
					ETreeNodeIconDrawer.onClose( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				}
				else
				{
					ETreeNodeIconDrawer.onOpen( self.iconCtx, 0, 0, self.iconSize, self.iconSize );
				}
			}
		};
		this.iconSpan.onmousemove = function( _evt )
		{
			if( _evt.offsetX < self.iconSize )
			{
				this.onmouseover();
			}
			else
			{
				this.onmouseout();
			}
		};
		
		this.preventSelectText();
	};
	
	this.onSelect = function()
	{
		
	};
	
	this.onUnSelect = function()
	{
		
	};
};

ETreeNode.prototype = {
	setName : function( _name )
	{
		this.nameSpan.textContent = this.name;
	},
	getName : function()
	{
		return this.nameSpan.textContent;
	},
	setType : function(_type)
	{
		var ctx = this.iconCtx;
		var x = this.iconSize;
		var y = 0;
		var w = this.iconSize;
		var h = this.iconSize;
		
		if( _type == "directory" )
		{
			ETreeNodeIconDrawer.drawDirectory( ctx, x, y, w, h );
		}
		else if( _type == "file" )
		{
			ETreeNodeIconDrawer.drawFile( ctx, x, y, w, h, "RGB(30, 118, 203)" );
		}
	},
	open : function()
	{
		if( this.childNodes.length > 0 )
		{
			ETreeNodeIconDrawer.onButtonIconMouseOut( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
			this.childDiv.hidden = false;
			ETreeNodeIconDrawer.onOpen( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
		}
	},
	close : function()
	{
		if( this.childNodes.length > 0 )
		{
			ETreeNodeIconDrawer.onButtonIconMouseOut( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
			this.childDiv.hidden = true;
			ETreeNodeIconDrawer.onClose( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
		}
	},
	appendChildNode : function( _nodeName )
	{
		var node = new ETreeNode( this );
		node.depth = this.depth + 1;
		node.tree = this.tree;
		node.name = _nodeName;
		node.init();
		node.iconCtx.font = node.textFont;
		
		var nodeWidth = 10 + node.depth * 20 + node.iconSize * 2 + node.iconCtx.measureText( _nodeName ).width;
		this.tree.setMaxWidth( nodeWidth );
		
		this.childDiv.appendChild( node.div );
		this.childNodes.push( node );
		
		if( this.childNodes.length > 0 )
		{
			ETreeNodeIconDrawer.onButtonIconMouseOut( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
			
			if( this.childDiv.hidden )
			{
				ETreeNodeIconDrawer.onClose( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
			}
			else
			{
				ETreeNodeIconDrawer.onOpen( this.iconCtx, 0, 0, this.iconSize, this.iconSize );
			}
		}
		
		return node;
	},
	remove : function()
	{
		this.parentNode.removeChildNode( this );
		
		if( this == this.tree.selectedNode )
		{
			this.tree.selectedNode = null;
		}
	},
	removeChildNode : function( _node )
	{
		var index = this.childNodes.indexOf( _node );
		if( index > -1 ) 
		{
			this.childNodes.splice( index, 1 );
			this.childDiv.removeChild( _node.div );
			
			if( this.childNodes.length == 0 )
			{
				this.iconCtx.clearRect( 0, 0, this.iconSize, this.iconSize );
			}
		}
	},
	removeAllChildNode : function( _node )
	{
		for( var n = 0; n < this.childNodes.length; ++n )
		{
			this.childDiv.removeChild( this.childNodes[ n ].div );
		}
		
		this.childNodes = new Array();
	},
	preventSelectText : function()
	{
		this.nameSpan.ondragstart = function()
		{
			return false;
		};
		this.nameSpan.onselectstart = this.nameSpan.ondragstart;
		this.div.ondragstart = this.nameSpan.ondragstart;
		this.div.onselectstart = this.nameSpan.ondragstart;
		this.myDiv.ondragstart = this.nameSpan.ondragstart;
		this.myDiv.onselectstart = this.nameSpan.ondragstart;
		this.depthSpan.ondragstart = this.nameSpan.ondragstart;
		this.depthSpan.onselectstart = this.nameSpan.ondragstart;
		this.iconSpan.ondragstart = this.nameSpan.ondragstart;
		this.iconSpan.onselectstart = this.nameSpan.ondragstart;
		this.childDiv.ondragstart = this.nameSpan.ondragstart;
		this.childDiv.onselectstart = this.nameSpan.ondragstart;
	}
};