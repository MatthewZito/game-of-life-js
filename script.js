	var gridHeight = 300;
	var gridWidth = 300;
	var Grid = createArray(gridWidth);
	var mirrorGrid = createArray(gridWidth);
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#00000";

	fillRandom();  

	run(); 
	function run() { 
	    console.time("loop");
	    drawGrid();
	    updateGrid();
	    console.timeEnd("loop");
	    requestAnimationFrame(run);
	}

	function createArray(rows) { 
	    var arr = [];
	    for (var i = 0; i < rows; i++) {
	        arr[i] = [];
	    }
	    return arr;
	}

	function fillRandom() { 
	    for (var a = 100; a < gridHeight - 100; a++) { 
	        for (var b = 100; b < gridWidth - 100; b++) { 
	            Grid[a][b] = Math.round(Math.random());
	        }
	    }
	}

	function drawGrid() { 
var liveCount = 0;
	    ctx.clearRect(0, 0, gridHeight, gridWidth); 
	    for (var a = 1; a < gridHeight; a++) { 
	        for (var b = 1; b < gridWidth; b++) { 
	            if (Grid[a][b] === 1) {
	                ctx.fillRect(a, b, 1, 1);
                    liveCount++;
                    
	            }
	        }
	    }
        console.log(liveCount/100);
	}

	function updateGrid() { 
       
	    for (var a = 1; a < gridHeight - 1; a++) { 
	        for (var b = 1; b < gridWidth - 1; b++) {
	            var totalCells = 0;
	            
	            totalCells += Grid[a - 1][b - 1];
	            totalCells += Grid[a - 1][b]; 
	            totalCells += Grid[a - 1][b + 1]; 

	            totalCells += Grid[a][b - 1]; 
	            totalCells += Grid[a][b + 1]; 

	            totalCells += Grid[a + 1][b - 1]; 
	            totalCells += Grid[a + 1][b]; 
	            totalCells += Grid[a + 1][b + 1]; 

	            
	            switch (totalCells) {
	                case 2:
	                    mirrorGrid[a][b] = Grid[a][b];
                       
	                    break;
	                case 3:
	                    mirrorGrid[a][b] = 1; 
                        
	                    break;
	                default:
	                    mirrorGrid[a][b] = 0; 
	            }
	        }
	    }

	    

	    for (var l = 1; l < gridHeight - 1; l++) { 
	        mirrorGrid[l][0] = mirrorGrid[l][gridHeight - 3];
	        mirrorGrid[l][gridHeight - 2] = mirrorGrid[l][1];
	        
	        mirrorGrid[0][l] = mirrorGrid[gridHeight - 3][l];
	        mirrorGrid[gridHeight - 2][l] = mirrorGrid[1][l];

	    }


	    
	    var temp = Grid;
	    Grid = mirrorGrid;
	    mirrorGrid = temp;
	}
