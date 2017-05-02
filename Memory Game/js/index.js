
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		shuffle: function(array){
			var counter = array.length, temp, index;
	   	while (counter > 0) {
        	index = Math.floor(Math.random() * counter);
        	counter--;
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="img/i13.jpg"\
				alt="MEMORY GAME" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "i1",
			img: "img/i1.jpg",
			id: 1,
		},
		{
			name: "i2",
			img: "img/i2.jpg",
			id: 2
		},
		{
			name: "i3",
			img: "img/i3.jpg",
			id: 3
		},
		{
			name: "i4",
			img: "img/i4.jpg",
			id: 4
		}, 
		{
			name: "i5",
			img: "img/i5.jpg",
			id: 5
		},
		{
			name: "i6",
			img: "img/i6.jpg",
			id: 6
		},
		{
			name: "i7",
			img: "img/i7.jpg",
			id: 7
		},
		{
			name: "i8",
			img: "img/i8.jpg",
			id: 8
		},
		{
			name: "i9",
			img: "img/i9.jpg",
			id: 9
		},
		{
			name: "i10",
			img: "img/i10.jpg",
			id: 10
		},
		{
			name: "i11",
			img: "img/i11.jpg",
			id: 11
		},
		{
			name: "i12",
			img: "img/i12.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();