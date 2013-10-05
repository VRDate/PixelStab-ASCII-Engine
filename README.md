PixelStab ASCII Engine
======================

- Made by Felipe Alfonso

This is not necessary a Game Engine, it's more of a transform-images-to-ascii-kind-of-tool.
The engine is made by 2 group of core functions:

	+ ps.ASCIIColors Functions :
		- RGBAtoASCII
		- CONTEXTtoASCII

	+ ps.ASCIIDisplay Functions :
		- createDisplay
		- clearScreen
		- drawPixel
		- drawRect
		- drawLine
		- drawBitmap
		- drawClippedBitmap
		- flush

Also it has a very simple Sprite class called ASCIISprite which handles sprite sheet animations ( only one row sheet ) :

	+ ps.ASCIISprite Methods :
		- makeFrames
		- addAnimation
		- play
		- update
		- render

The engine also includes a very primitive text renderer. Still no support for full bitmap fonts :

	+ ps.ASCIIText Functions :
		- drawText
		- textWidth


Couple of Examples:

	http://dev.shin.cl/asciiengine/

	http://dev.shin.cl/asciiengine/exp2/

	http://dev.shin.cl/asciiengine/exp2/webcam.html