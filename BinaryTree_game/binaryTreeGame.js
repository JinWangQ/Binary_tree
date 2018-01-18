
	    function BinaryTree() {
			var Node = function(key) {
				this.key = key;
				this.left = null;
				this.right = null;
			}; 

			var root = null;
			
			var insertNode = function(node, newNode) {
				if(newNode.key < node.key) {
					if(node.left === null){
						node.left = newNode;
					} else {
						insertNode(node.left, newNode)
					}
				} else {
					if(node.right === null){
						node.right = newNode;
					} else {
						insertNode(node.right, newNode)
					}
				}
			}

			this.insert = function(key) {
				var newNode = new Node(key) 
				if(root === null){
					root = newNode;
				} else {
					insertNode(root, newNode)
				}	
			};

			var searchNode = function(node, key) {
				if(node === null) {
					return false;
				}
				// don't forget return!
				if(key < node.key) {
					return searchNode(node.left, key)
				} else if (key > node.key) {
					return searchNode(node.right, key)
				} else {
					return node;
				}
			}

			this.search = function(key) {
				return searchNode(root, key);
			}
			
		}
		
		//x coordinates for alien
		var xCoords = [];
		for (var i=0; i<10; i++) {
			xCoords.push(Math.floor(Math.random()*280))
		}
		//x coordinates in binary tree
		var xCoordsBinaryTree = new BinaryTree();
		xCoords.forEach(function(key) {
			xCoordsBinaryTree.insert(key);
		});

		//get coods for alien
		var nodeForSelect = [];
		for(var i=0; i<10; i++) {
			nodeForSelect.push({selected: false});
		}

 		//first x coordinate
 		var alienNodeSelected = Math.floor(Math.random()*9);
 		nodeForSelect[alienNodeSelected].selected = true;

 		//game section
 		var alienX = xCoords[alienNodeSelected];
 		var alienY = 20,
 			guessX = 0,
 			guessY = 0,
 			shotRemaining = 8,
 			shotMade = 0,
 			gameState = "",
 			gameWon = false;

 		var cannon = document.querySelector("#cannon"),
 			alien = document.querySelector("#alien"),
 			missile = document.querySelector("#missile"),
 			explosion = document.querySelector("#explosion");

 		alien.style.top = alienY + "px";
 		alien.style.left = alienX + "px";

 		var inputX = document.querySelector("#inputX"),
 			inputY = document.querySelector("#inputY"),
 			output = document.querySelector("#output");

 		var button = document.querySelector("button");
 		button.style.cursor = "pointer";
 		button.addEventListener("click", clickHandler, false);
 		window.addEventListener("keydown", keydownHandler, false);

 		function clickHandler() {
 			validateInput();
 		}

 		function keydownHandler(event) {
 			if(event.keyCode == 13) {
 				validateInput();
 			}
 		}

 		function validateInput() {
 			guessX = parseInt(inputX.value);
 			guessY = parseInt(inputY.value);

 			if (isNaN(guessX) || isNaN(guessY)) {
 				output.innerHTML = "Please input number";
 			}
 			else if (guessX > 300 || guessY > 300) {
 				output.innerHTML = "X/Y should be less than 300"
 			} else {
 				playGame();
 			}
 		}

 		function playGame() {
 			shotRemaining --;
 			shotMade ++;
 			gameState = "missile remain:" + shotRemaining ;

 			guessX = parseInt(inputX.value);
 			guessY = parseInt(inputY.value);
 			var alienNode = xCoordsBinaryTree.search(guessX);
 			var alienFlag = -1;
 			if(alienNode) {
 				xCoords.forEach(function(val, index) {
 					if (val === alienNode.key) {
 						alienFlag = index;
 					}
 				})
 			}
 			if (alienNode != null && alienNodeSelected === alienFlag) {
 				if (guessY >= alienY && guessY <= alienY + 20) {
 					gameWon = true;
 					endGame();
 				}
 			} else {
 				output.innerHTML = "Missed!" + "<br>" + gameState;
 				if (shotRemaining < 1) {
 					endGame();
 				}
 			}

 			if(!gameWon) {
 				nodeForSelect[alienNodeSelected].selected = false;
 				alienNodeSelected = Math.floor(Math.random()*9);
 				nodeForSelect[alienNodeSelected].selected = true;
 				alienX = xCoords[alienNodeSelected];
 				alienY += 30;
 			}

 			render();
 			console.log("X:" + alienX);
 			console.log("Y:" + alienY);
 		};

 		function render() {
 			alien.style.left = alienX + "px";
 			alien.style.top = alienY +"px";

 			missile.style.left = guessX + "px";
 			missile.style.top = guessY + "px";

 			cannon.style.left = guessX +"px";

 			if (gameWon) {
 				explosion.style.display = "block";
 				explosion.style.left = alienX +"px";
 				explosion.style.top = alienY + "px";

 				alien.style.display = "none";
 				missile.style.display = "none";
 			}
 		}

 		function endGame() {
 			if (gameWon) {
 				output.innerHTML = "Hit! You saved the world!" + "<br>" + "You shot" + " " + shotMade + " " + "times!";
 			}else {
 				output.innerHTML = "Sorry, You lose";
 			}

 			button.removeEventListener("click", clickHandler, false);
 			button.disabled = true;
 			window.removeEventListener("keydown", keydownHandler, false);
 			inputX.disabled = true;
 			inputY.disabled = true;
 		}
	