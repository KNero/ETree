ETree = function( _parent )
{
	this.parent = _parent;
	this.div = document.createElement( "div" );
	this.parent.appendChild( this.div );
	
	this.childNodes = new Array();
	this.selectedNode;
	this.maxWidth = 0;
	
	this.onSelect = function( _selectedNode )
	{
		
	};
	
	this.onUnSelect = function()
	{
		this.selectedNode.myDiv.style.backgroundColor = "#ffffff";
		this.selectedNode.onUnSelect();
		this.selectedNode = null;
	};
};

ETree.prototype = {
	getChildNodeSize : function()
	{
		return this.childNodes.length();
	},
	setSize : function( _w, _h )
	{
		this.div.style.width = _w + "px";
		this.div.style.height = _h + "px";
	},
	setMaxWidth : function( _width )
	{
		if( this.maxWidth < _width )
		{
			this.maxWidth = _width;
			this.div.style.minWidth = _width + "px";
		}
	},
	appendChildNode : function( _nodeName )
	{
		var node = new ETreeNode( this );
		node.depth = 0;
		node.tree = this;
		node.name = _nodeName;
		node.init();
		
		this.div.appendChild( node.div );
		this.childNodes.push( node );
		
		return node;
	},
	remove : function()
	{
		this.parent.removeChild( this.div );
	},
	removeChildNode : function( _node )
	{
		var index = this.childNodes.indexOf( _node );
		if( index > -1 ) 
		{
			this.childNodes.splice( index, 1 );
			this.div.removeChild( _node.div );
			this.selectedNode = null;
		}
	},
	removeAllChildNode : function( _node )
	{
		for( var n = 0; n < this.childNodes.length; ++n )
		{
			this.div.removeChild( this.childNodes[ n ].div );
		}
		
		this.childNodes = new Array();
	}
};