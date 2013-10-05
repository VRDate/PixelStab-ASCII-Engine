"use strict";
/**
 * author : Felipe Alfonso
 * date : 03-10-13.
 * version : 1.0
 * about : Small ASCII Engine.
 *
 */

window.ps = window.ps || {};

(function( ps ){

	/**
	 * Current milliseconds.
	 * @returns {number}
	 */
	ps.millisecs = function(){
		return new Date().getTime();
	};


	/**
	 * Random number between two numbers.
	 * @param {number} l
	 * @param {number} m
	 * @returns {number}
	 */
	ps.random = function(l,m){
		return Math.floor(Math.random()*(m-l+1)+l);
	};

	/**
	 * ASCIIColors handles RGBA to ASCII transformation.
	 */
	ps.ASCIIColors = {
		BLACK 			: 0,
		DARK_GREY 		: 1,
		DARK_MID_GREY 	: 2,
		GREY 			: 3,
		LIGHT_MID_GREY 	: 4,
		LIGHT_GREY 		: 5,
		WHITE 			: 6,
		TRANSPARENT 	: 7,
		colorTransform : {
			0 : "@",
			1 : "#",
			2 : "W",
			3 : "+",
			4 : ";",
			5 : ":",
			6 : "·",
			7 : " "
		},
		colorTransformInvert : {
			0 : " ",
			1 : "·",
			2 : ":",
			3 : ";",
			4 : "+",
			5 : "W",
			6 : "#",
			7 : "@"
		},
		/**
		 * Transforms a 4 element array ( RGBA ) to ASCII Equivalent.
		 * @param {Array} color
		 */
		RGBAToASCII : function( color ){
			if( color.length == 4 ){
				var value = 0, // Initial value.
					max = 1530+255; // Max value should be 1530 for RGBA

				if( color[ 3 ] == 0 ){
					return ps.ASCIIColors.TRANSPARENT;
				}

				for( var i = 0 ; i < color.length ; i++ ){
					value += color[ i ];
				}


				if( value <= Math.floor( max / 7 ) ){
					return ps.ASCIIColors.BLACK;
				}else if( value > Math.floor( max / 7 ) && value <= Math.floor( max / 6 ) ){
					return ps.ASCIIColors.DARK_GREY;
				}else if( value > Math.floor( max / 6 ) && value <= Math.floor( max / 5 ) ){
					return ps.ASCIIColors.DARK_MID_GREY;
				}else if( value > Math.floor( max / 5 ) && value <= Math.floor( max / 4 ) ){
					return ps.ASCIIColors.GREY;
				}else if( value > Math.floor( max / 4 ) && value <= Math.floor( max / 3 ) ){
					return ps.ASCIIColors.LIGHT_MID_GREY;
				}else if( value > Math.floor( max / 3 ) && value <= Math.floor( max / 2 ) ){
					return ps.ASCIIColors.LIGHT_GREY;
				}else if( value > Math.floor( max / 2 ) && value <= max ){
					return ps.ASCIIColors.WHITE;
				}


			}else if( color.length == 3 ){

				var value = 0, // Initial value.
					max = 1275; // Max value should be 1275 for RGB

				for( var i = 0 ; i < color.length ; i++ ){
					value += color[ i ];
				}

				if( value <= Math.floor( max / 7 ) ){
					return ps.ASCIIColors.BLACK;
				}else if( value > Math.floor( max / 7 ) && value <= Math.floor( max / 6 ) ){
					return ps.ASCIIColors.DARK_GREY;
				}else if( value > Math.floor( max / 6 ) && value <= Math.floor( max / 5 ) ){
					return ps.ASCIIColors.DARK_MID_GREY;
				}else if( value > Math.floor( max / 5 ) && value <= Math.floor( max / 4 ) ){
					return ps.ASCIIColors.GREY;
				}else if( value > Math.floor( max / 4 ) && value <= Math.floor( max / 3 ) ){
					return ps.ASCIIColors.LIGHT_MID_GREY;
				}else if( value > Math.floor( max / 3 ) && value <= Math.floor( max / 2 ) ){
					return ps.ASCIIColors.LIGHT_GREY;
				}else if( value > Math.floor( max / 2 ) && value <= max ){
					return ps.ASCIIColors.WHITE;
				}

			}else{
				return ps.ASCIIColors.TRANSPARENT;
			}
		},
		/**
		 * Transform a canvas context into a 2D Bitmap Data ( ASCII ).
		 * @param {CanvasRenderingContext2D} context
		 */
		contextToASCII : function( context ){
			var bitmapData = [],
				data = null;
			try{
				data = context.getImageData( 0, 0, context.canvas.width, context.canvas.height).data;
			}catch ( e ){
				return [[0]];
			}

			var pixelIndex = 0;
			for( var y = 0 ; y < context.canvas.height ; y++ ){
				var line = [];
				for( var x = 0 ; x < context.canvas.width ; x++ ){
					var rgba = [];
					for( var i = 0 ; i < 4 ; i++ ){
						rgba[ rgba.length ] = data[ pixelIndex ];
						pixelIndex++;
					}
					line[ line.length ] = ps.ASCIIColors.RGBAToASCII( rgba );
				}
				bitmapData[ bitmapData.length ] = line;
			}

			return bitmapData;
		}
	};


	ps.ASCIIText = {
		fontHeight : 4,
		fontWidth : 5,
		letterSpacing : 1,
		a : [
			[7,0,0,7],
			[0,7,7,0],
			[0,0,0,0],
			[0,7,7,0]
		],
		b : [
			[0,0,0,7],
			[0,0,0,7],
			[0,7,7,0],
			[0,0,0,7]
		],
		c : [
			[7,0,0,0],
			[0,7,7,7],
			[0,7,7,7],
			[7,0,0,0]
		],
		d : [
			[0,0,0,7],
			[0,7,7,0],
			[0,7,7,0],
			[0,0,0,7]
		],
		e : [
			[0,0,0,0],
			[0,0,0,7],
			[0,7,7,7],
			[0,0,0,0]
		],
		f : [
			[0,0,0,0],
			[0,7,7,7],
			[0,0,0,7],
			[0,7,7,7]
		],
		g : [
			[7,0,0,0],
			[0,7,7,7],
			[0,7,0,0],
			[7,0,0,0]
		],
		h : [
			[0,7,7,0],
			[0,0,0,0],
			[0,7,7,0],
			[0,7,7,0]
		],
		i : [
			[0,0,0,0],
			[7,0,0,7],
			[7,0,0,7],
			[0,0,0,0]
		],
		j : [
			[7,7,7,0],
			[7,7,7,0],
			[0,7,7,0],
			[7,0,0,7]
		],
		k : [
			[0,7,7,0],
			[0,0,0,7],
			[0,7,0,7],
			[0,7,7,0]
		],
		l : [
			[0,7,7,7],
			[0,7,7,7],
			[0,7,7,7],
			[0,0,0,0]
		],
		m : [
			[0,7,7,0],
			[0,0,0,0],
			[0,7,0,0],
			[0,7,7,0]
		],
		n : [
			[0,7,7,0],
			[0,0,7,0],
			[0,7,0,0],
			[0,7,7,0]
		],
		o : [
			[7,0,0,7],
			[0,7,7,0],
			[0,7,7,0],
			[7,0,0,7]
		],
		p : [
			[0,0,0,7],
			[0,7,7,0],
			[0,0,0,7],
			[0,7,7,7]
		],
		q : [
			[7,0,0,7],
			[0,7,7,0],
			[0,7,0,0],
			[7,0,0,0]
		],
		r : [
			[0,0,0,7],
			[0,7,7,0],
			[0,0,0,7],
			[0,7,7,0]
		],
		s : [
			[7,0,0,0],
			[0,0,0,7],
			[7,7,7,0],
			[0,0,0,7]
		],
		t : [
			[0,0,0,0],
			[7,0,0,7],
			[7,0,0,7],
			[7,0,0,7]
		],
		u : [
			[0,7,7,0],
			[0,7,7,0],
			[0,7,7,0],
			[7,0,0,7]
		],
		v : [
			[0,7,7,0],
			[0,7,7,0],
			[7,0,7,0],
			[7,7,0,7]
		],
		w : [
			[0,7,7,0],
			[0,7,7,0],
			[0,7,0,0],
			[7,0,7,0]
		],
		y : [
			[0,7,7,0],
			[7,0,0,7],
			[7,0,0,7],
			[7,0,0,7]
		],
		z : [
			[0,0,0,0],
			[7,7,0,7],
			[7,0,7,7],
			[0,0,0,0]
		],
		1 : [
			[7,0,0,7],
			[7,7,0,7],
			[7,7,0,7],
			[7,7,0,7]
		],
		2 : [
			[7,0,0,7],
			[0,7,7,0],
			[7,0,0,7],
			[0,0,0,0]
		],
		3 : [
			[7,7,7,7],
			[7,7,7,7],
			[7,7,7,7],
			[7,7,7,7]
		],
		4 : [
			[0,0,0,7],
			[7,0,0,0],
			[7,7,7,0],
			[0,0,0,7]
		],
		5 : [
			[0,0,0,0],
			[0,0,0,7],
			[7,7,7,0],
			[0,0,0,7]
		],
		6 : [
			[7,0,0,0],
			[0,7,7,7],
			[0,0,0,0],
			[7,0,0,7]
		],
		7 : [
			[0,0,0,0],
			[7,7,7,0],
			[7,7,0,7],
			[7,0,7,7]
		],
		8 : [
			[7,0,0,7],
			[0,0,0,0],
			[0,0,0,0],
			[7,0,0,7]
		],
		9 : [
			[7,0,0,0],
			[0,7,7,0],
			[7,0,0,0],
			[7,7,7,0]
		],
		0 : [
			[7,0,0,7],
			[0,7,7,0],
			[0,7,7,0],
			[7,0,0,7]
		],
		drawText : function( str, x, y ){
			for( var i = 0 ; i < str.length ; i++ ){
				var w = ps.ASCIIText.fontWidth + ps.ASCIIText.letterSpacing;
				if( ps.ASCIIText[ str[ i ].toLowerCase() ] ){
					ps.ASCIIDisplay.drawBitmap( ps.ASCIIText[ str[ i ].toLowerCase() ], x + ( i * w ), y );
				}
			}
		},
		textWidth : function( str ){
			return ( ps.ASCIIText.fontWidth + ps.ASCIIText.letterSpacing ) * str.length;
		}
	};


	/**
	 * ASCIIDisplay will handle all on screen rendering of ascii graphics.
	 */
	// Private fields 
	var buffer_container;
	var buffer;
	
	// Public static
	ps.ASCIIDisplay = {
		invert : false,
		width : 0,
		height : 0,
		createDisplay : function( width, height, fontSize ){
			fontSize = fontSize || 10;
			ps.ASCIIDisplay.width = width;
			ps.ASCIIDisplay.height = height;
			buffer_container = document.createElement( "pre" );
			buffer_container.style.letterSpacing = "4px";
			buffer_container.style.fontSize = fontSize+"px";
			buffer = [];
			for( var y = 0 ; y < height ; y++ ){
				var line = [];
				for( var x = 0 ; x < width ; x++ ){
					line[ line.length ] = ps.ASCIIColors.TRANSPARENT;
				}
				buffer[ buffer.length ] = line;
			}
			document.body.appendChild( buffer_container );
		},
		clearScreen : function( color ){
			if( buffer && buffer_container ){
				if( color == undefined || color == null ) color = ps.ASCIIColors.TRANSPARENT;
				color = parseInt( color );

				buffer.splice(0, buffer.length );
				for( var y = 0 ; y < ps.ASCIIDisplay.height ; y++ ){
					var line = [];
					for( var x = 0 ; x < ps.ASCIIDisplay.width ; x++ ){

						line[ line.length ] = color;

					}
					buffer[ buffer.length ] = line;
				}
			}else{
				throw new Error( "ASCII Display must be set first with ASCIIDisplay.createDisplay" );
			}
		},
		drawPixel : function( _x, _y, color ){
			if( buffer && buffer_container ){
				if( Math.floor( _x ) >= 0 && Math.floor( _y ) >= 0 && Math.floor( _x ) < ps.ASCIIDisplay.width - 1 && Math.floor( _y ) < ps.ASCIIDisplay.height - 1 ){
					for( var y = 0 ; y < ps.ASCIIDisplay.height ; y++ ){
						for( var x = 0 ; x < ps.ASCIIDisplay.width ; x++ ){
							if( Math.floor( x ) == Math.floor( _x ) && Math.floor( y ) == Math.floor( _y ) && color != 7 ){
								buffer[ Math.floor( y ) ][ Math.floor( x ) ] = color;
								return;
							}
						}
					}
				}
			}else{
				throw new Error( "ASCII Display must be set first with ASCIIDisplay.createDisplay" );
			}
		},
		drawRect : function( _x, _y, width, height, color ){
			var bitmap = [];
			color = color || 0;
			for( var y = 0 ; y < height ; y++ ){
				var line = [];
				for( var x = 0 ; x < width ; x++ ){
					line[ line.length ] = color;
				}
				bitmap[ bitmap.length ] = line;
			}
			ps.ASCIIDisplay.drawBitmap( bitmap, _x, _y );
		},
		drawLine : function( x1, y1, x2, y2, color ){
			color = color || 0;
			var deltax,deltay,x,y,xinc1,yinc1,xinc2,yinc2,den,num,numadd,numpixels;
			deltax = Math.abs(x2-x1);
			deltay = Math.abs(y2-y1);
			x = x1;
			y = y1;

			if(x2>=x1)
			{
				xinc1 = 1;
				xinc2 = 1;
			}else{
				xinc1 = -1;
				xinc2 = -1;
			}

			if(y2>=y1)
			{
				yinc1 = 1;
				yinc2 = 1;
			}else{
				yinc1 = -1;
				yinc2 = -1;
			}

			if(deltax >= deltay){
				xinc1 = 0;
				yinc2 = 0;
				den = deltax;
				num = deltax/2;
				numadd = deltay;
				numpixels = deltax;
			}else{
				xinc2 = 0;
				yinc1 = 0;
				den = deltay;
				num = deltay/2;
				numadd = deltax;
				numpixels = deltay;
			}

			for(var curpixel = 0;curpixel<=numpixels;curpixel++){
				ps.ASCIIDisplay.drawPixel(x,y,color);
				num+=numadd;
				if(num>=den){
					num-=den;
					x+=xinc1;
					y+=yinc1;
				}
				x+=xinc2;
				y+=yinc2;
			}
		},
		drawBitmap : function( bitmap, _x, _y ){
			if( buffer && buffer_container ){
				for( var y = 0 ; y < bitmap.length ; y++ ){
					for( var x = 0 ; x < bitmap[ y ].length ; x++ ){
						ps.ASCIIDisplay.drawPixel( _x + x, _y + y, bitmap[ y ][ x ] );
					}
				}

			}else{
				throw new Error( "ASCII Display must be set first with ASCIIDisplay.createDisplay" );
			}
		},
		drawClippedBitmap : function( bitmap, _x, _y, clipx, clipy, clipWidth, clipHeight ){
			if( buffer && buffer_container ){

				clipx = clipx || 0;
				clipy = clipy || 0;
				clipWidth = clipWidth || 0;
				clipHeight = clipHeight || 0;

				clipx = parseInt( clipx );
				clipy = parseInt( clipy );
				clipWidth = parseInt( clipWidth );
				clipHeight = parseInt( clipHeight );

				if( clipx < 0 || clipy < 0 || clipy + clipHeight > bitmap.length  || bitmap[ 0 ] == null || bitmap[ 0 ] == undefined || clipx + clipWidth > bitmap[ 0 ].length ){
					throw new Error( "Clip area is out of bitmap array" );
				}

				var temp_bitmap = [];

				for( var y = clipy ; y < clipy + clipHeight ; y++ ){
					var line = [];
					for( var x = clipx ; x < clipx + clipWidth ; x++ ){
						line[ line.length ] = bitmap[ y ][ x ];
					}
					temp_bitmap[ temp_bitmap.length ] = line;
				}

				ps.ASCIIDisplay.drawBitmap( temp_bitmap, _x , _y );

			}else{
				throw new Error( "ASCII Display must be set first with ASCIIDisplay.createDisplay" );
			}
		},
		flush : function(){
			if( buffer && buffer_container ){
				var finalBuffer = "";
				for( var y = 0 ; y < buffer.length-1 ; y++ ){
					for( var x = 0 ; x < buffer[ y ].length-1 ; x++ ){
						var c;
						if( ps.ASCIIDisplay.invert ){
							c = ps.ASCIIColors.colorTransformInvert[ buffer[ y ][ x ] ];
						}else{
							c = ps.ASCIIColors.colorTransform[ buffer[ y ][ x ] ];
						}
						finalBuffer += c;
					}
					finalBuffer += "\n";
				}
				buffer_container.innerHTML = finalBuffer;
			}else{
				throw new Error( "ASCII Display must be set first with ASCIIDisplay.createDisplay" );
			}
		}
	};

	ps.ASCIISprite = function( x, y, path, onloadCallback ){
		this.x = x || 0;
		this.y = y || 0;
		this.loaded = false;
		this.bitmapData = null;
		this.width = 0;
		this.height = 0;
		this.animation = {};
		this.currentAnimation = null;
		this.animationIndex = 0;
		this.frame = 0;
		this.frameRate = 25;
		this.frameCounter = 0;
		this.isAnimated = false;
		this.currentAnimationName = "";
		this.clip = {
			x : 0,
			y : 0,
			width : 0,
			height : 0
		};

		var image = new Image(),
			canvas = document.createElement( "canvas"),
			ctx = null,
			self = this;

		image.onload = function(){
			canvas.width = image.width;
			canvas.height = image.height;
			self.width = image.width;
			self.height = image.height;
			self.clip.width = image.width;
			self.clip.height = image.height;
			ctx = canvas.getContext("2d");
			ctx.drawImage( image, 0, 0 );
			self.bitmapData = ps.ASCIIColors.contextToASCII( ctx );
			self.loaded = true;
			image.onload = null;
			if( typeof onloadCallback  == "function" ){
				onloadCallback( self );
			}
		};

		image.src = path;
	};

	ps.ASCIISprite.prototype = {
		makeFrames : function( frameWidth, frameHeight ){
			this.clip.width = frameWidth;
			this.clip.height = frameHeight;
			this.width = frameWidth;
			this.height = frameHeight;
			this.frame = 0;
			this.isAnimated = true;
		},
		addAnimation : function ( name, frames ){
			if( frames.length != undefined ) this.animation[ name ] = frames;
			else throw new Error( "No frames set" );
		},
		play : function( name, frameRate ){
			if( this.animation[ name ] != undefined && this.animation[ name ] != null ){
				if( this.currentAnimationName != name ){
					this.frameRate = frameRate || this.frameRate;
					this.currentAnimation = this.animation[ name ];
					this.animationIndex = 0;
					this.currentAnimationName = name;
				}
			}else{
				throw new Error( "No animation exists with the name "+name );
			}
		},
		update : function(){
			if( !this.loaded ) return;
			if( this.isAnimated && this.currentAnimation != null ){
				if( ps.millisecs() - this.frameCounter > ( 1000 / this.frameRate ) ){
					this.frame = this.currentAnimation[ this.animationIndex ];
					this.frameCounter = ps.millisecs();
					this.animationIndex++;
					if( this.animationIndex > this.currentAnimation.length - 1 ){
						this.animationIndex = 0;
					}
				}
			}
		},
		render : function(){
			if( !this.loaded ) return;
			if( this.isAnimated ){
				if( this.bitmapData != null ) {
					this.clip.x = this.clip.width * this.frame;
					ps.ASCIIDisplay.drawClippedBitmap( this.bitmapData, this.x, this.y, this.clip.x, 0, this.clip.width, this.clip.height );
				}
			}else{
				if( this.bitmapData != null ) ps.ASCIIDisplay.drawBitmap( this.bitmapData, this.x, this.y );
			}
		}
	};

})( ps );
