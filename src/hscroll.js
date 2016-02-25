;(function ( factory ) {

    if ( typeof define === "function" && define.amd ) {

        define( [] , function(){
            return factory( false );
        });

    } else {
        
        factory(true);

    }

}( function( global ) {

    var HScroll = function( selector , options) {

        var elements = document.querySelectorAll( selector );

        this.elements = elements;

        this.options =  {

            isWindowScrollable: 0,
            currentX: 0

        };

        addEventListener( 'touchmove',  function(e){

            var isMoving = false;

            Array.prototype.forEach.call( elements , function( element )　{

                isMoving = element.dataset[ 'onmoving' ] === 'true' || isMoving;

            });

            !this.options.isWindowScrollable && isMoving && e.preventDefault();

        }.bind( this ));

        Array.prototype.forEach.call( elements , function( element ) {

            ( function( element ){

                var that = this,
                    x = 0, 
                    _x = 0, 
                    deltaX = 0, 
                    moving = 0, 
                    innerWidthSmaller = 0;


                element.fnTouchStart = function( e ){

                    x = _x = deltaX = 0;

                    x = e.touches[ 0 ].clientX;

                    element.dataset[ 'onmoving' ] = 'true';

                };

                element.fnTouchMove = function( e ){

                    _x = e.touches[ 0 ].clientX;

                    deltaX = _x - x;

                    fn.setTranslateX( element , ( that.options.currentX + deltaX/ 2 ) ); 

                };

                element.fnTouchEnd = function( e ){

                    var innerWidth = fn.getWidth( element ),

                        outterWidth =  fn.getWidth( element.parentNode );

                    that.options.currentX = fn.getTranslateX( element );

                    if( that.options.currentX > 0 ){

                        fn.setTranslateX( element , 0 );

                    }else if( that.options.currentX < outterWidth - innerWidth ) {

                        if( innerWidthSmaller ) {

                            fn.setTranslateX( element , 0 );

                        } else { 

                            fn.setTranslateX( element , ( outterWidth - innerWidth ) );

                        }

                    }

                    that.options.currentX = fn.getTranslateX( element );

                    element.dataset[ 'onmoving' ] = 'false';

                };

                fn.extend( this.options , options || {} );

                if( fn.getWidth( element ) <= fn.getWidth( element.parentNode ) ) {

                    innerWidthSmaller = 1;

                }          

                element.dataset[ 'onmoving' ] = 'false';

                fn.implementLayoutOptions( element , this.options );

                element.addEventListener( 'touchstart' , element.fnTouchStart );

                element.addEventListener( 'touchmove' , element.fnTouchMove );

                element.addEventListener( 'touchend' , element.fnTouchEnd );

            }.bind( this )( element ) )

        }.bind( this ) )
    }

    HScroll.prototype = {

        disableHScroll: function(){

            Array.prototype.forEach.call( this.elements, function( element ){

                element.removeEventListener( 'touchstart' , element.fnTouchStart );

                element.removeEventListener( 'touchmove' , element.fnTouchMove );

                element.removeEventListener( 'touchend' , element.fnTouchEnd );

            }.bind( this ) );

        },

        resetHScroll: function( options ){

            this.disableHScroll();

            fn.extend( this.options , options || {} );

            Array.prototype.forEach.call( this.elements, function( element ) {

                fn.implementLayoutOptions( element, this.options );

                element.addEventListener( 'touchstart' , element.fnTouchStart );

                element.addEventListener( 'touchmove' , element.fnTouchMove );

                element.addEventListener( 'touchend' , element.fnTouchEnd );

            }.bind( this ) );
            
        }

    }

    var fn = {

        getWidth: function( el ){

             return el.offsetWidth;

        },

        setTranslateX: function( el, offsetX ){

             el.style[ '-webkit-transform' ] = 'translateX(' + +offsetX + 'px)';

             el.style[ 'transform' ] = 'translateX(' + +offsetX + 'px)';

        },

        getTranslateX: function( el ){

            var _p = el.style[ '-webkit-transform' ].match( /[-]{0,1}\d+/ );

            return _p? +_p[ 0 ] : 0 ;

        },

        setTransition: function( el , style ){

            el.style[ '-webkit-transition' ] = style;

            el.style[ 'transition' ] = style;

        },

        implementLayoutOptions: function( el , options ){

            typeof options.currentX === 'number' && this.setTranslateX( el, options.currentX );

            this.setTransition( el, 'all cubic-bezier(0.1, 0.57, 0.1, 1) .3s' );

        },

        extend: function(){

            var tar,
                obj,
                i = 0;

            tar = arguments.length === 1 ? this : arguments[ i++ , 0 ];

            for( i ; i < arguments.length ; i++ ) {

                obj = arguments[ i ];

                if( typeof obj !== 'object' ){

                    return false;
                }

                for( var key in obj ){

                    tar[ key ] = obj[ key ];

                }     
            }

            return tar;
        }

    }


    if( global ){

        window.HScroll = HScroll;

    }
    
    return HScroll;

}))
