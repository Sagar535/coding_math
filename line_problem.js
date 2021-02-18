	
// Check the direction these three points rotate
function RotationDirection(p1x, p1y, p2x, p2y, p3x, p3y) {
  if (((p3y - p1y) * (p2x - p1x)) > ((p2y - p1y) * (p3x - p1x)))
    return 1;
  else if (((p3y - p1y) * (p2x - p1x)) == ((p2y - p1y) * (p3x - p1x)))
    return 0;
  
  return -1;
}

function containsSegment(x1, y1, x2, y2, sx, sy) {
  if (x1 < x2 && x1 < sx && sx < x2) return true;
  else if (x2 < x1 && x2 < sx && sx < x1) return true;
  else if (y1 < y2 && y1 < sy && sy < y2) return true;
  else if (y2 < y1 && y2 < sy && sy < y1) return true;
  else if (x1 == sx && y1 == sy || x2 == sx && y2 == sy) return true;
  return false;
}

function hasIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var f1 = RotationDirection(x1, y1, x2, y2, x4, y4);
  var f2 = RotationDirection(x1, y1, x2, y2, x3, y3);
  var f3 = RotationDirection(x1, y1, x3, y3, x4, y4);
  var f4 = RotationDirection(x2, y2, x3, y3, x4, y4);
  
  // If the faces rotate opposite directions, they intersect.
  var intersect = f1 != f2 && f3 != f4;
  
  // If the segments are on the same line, we have to check for overlap.
  if (f1 == 0 && f2 == 0 && f3 == 0 && f4 == 0) {
    intersect = containsSegment(x1, y1, x2, y2, x3, y3) || containsSegment(x1, y1, x2, y2, x4, y4) ||
    containsSegment(x3, y3, x4, y4, x1, y1) || containsSegment(x3, y3, x4, y4, x2, y2);
  }
  
  return intersect;
}


window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width  = window.innerWidth,
		height = canvas.height = window.innerHeight;

	lines_coordinates = []
	intersection_count = 0
	// some equally spaced lines
	no_of_lines = 0
	for(i=0;i<height;i+=20) {
		context.beginPath()
		context.moveTo(0, i)
		context.lineTo(i+width, i)
		context.stroke()
		lines_coordinates.push([[0,i], [i+width, i]])
		no_of_lines += 1
	}

	console.log("Total number of horizontal line", no_of_lines)

	// some lines dropped with size half of the space i.e. 10
	total_needles = 10000
	for (i=0; i<total_needles; i++) {
		context.beginPath()
		x1 = Math.random() * width
		y1 = Math.random() * height
		context.moveTo(x1, y1)

		angle = Math.random() * Math.PI
		x2 = 10 * Math.sin(angle) + x1
		y2 = 10 * Math.cos(angle) + y1
		context.lineTo(x2, y2)
		context.stroke()

		x3 = 0
		y3 = Math.floor(y1/20) * 20
		x4 = 0
		y4 = y3 + 20

		// console.log(x1, y1)
		// console.log(x2, y2)
		// console.log(x3, y3)
		// console.log(x4, y4)

		if (hasIntersection(x1,y1, x2, y2, x3, y3, width, y3) || hasIntersection(x1, y1, x2, y2, x4, y4, width, y4)) {
			intersection_count += 1
		}
	}

	// console.log(lines_coordinates)
	console.log(intersection_count)
	
	p1 = intersection_count / total_needles
	console.log("Intersection Probability", p1)

	p2 = (2 * 10)/(Math.PI * 20)
	console.log("Expected Intersection Probability", p2)
}
