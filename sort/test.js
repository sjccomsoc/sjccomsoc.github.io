let busy = false;
let listlength = 0;

function bubble() {
	explain("bubble");
	if (busy) { return; }
	busy = true;
	l = getlist();
	if (l.length<=0) { alert("Nothing to sort!");busy=false;return; }
	// (n-1) passes
	document.getElementById("step").innerHTML = "<h2>Steps:</h2>";
	for (let j=0; j<l.length-1; j++) {
		// loop over array
		for (let i=0; i<l.length; i++) {
			// swap adjacent elements in wrong order
			if (l[i] > l[i+1]) {
				temp = l[i];
				l[i] = l[i+1];
				l[i+1] = temp;
			}
		}
		document.getElementById("steps").innerHTML += "<h3>Pass "+(j+1)+"</h3><ol>"+listtool(l)+"</ol>";
	}
	// two loops dependent on length of array => O(n^2) time complexity
	busy = false;
	document.getElementById("sortedlist").innerHTML = "<h2>Sorted List:</h2><ol>"+listtool(l)+"</ol>";
}

function selection() {
	explain("selection");
	if (busy) { return; }
	busy = true;
	l = getlist();
	if (l.length<=0) { alert("Nothing to sort!");busy=false;return; }
	// n passes
	document.getElementById("step").innerHTML = "<h2>Steps:</h2>";
	for (let j=0; j<l.length; j++) {
		// do linear search for biggest unsorted number
		let biggest = Number.NEGATIVE_INFINITY;
		let ind = 0;
		for (let i=j; i<l.length; i++) {
			if (l[i] > biggest) {
				biggest = l[i];
				ind = i;
			}
		}
		// put biggest unsorted number at the front
		l = l.toSpliced(ind,1).toSpliced(0,0,biggest);
		document.getElementById("steps").innerHTML += "<h3>Pass "+(j+1)+": Biggest "+(j+1)+" item(s) fronted</h3><ol>"+listtool(l)+"</ol>";
	}
	// two loops dependent on length of array => O(n^2) time complexity
	busy = false;
	document.getElementById("sortedlist").innerHTML = "<h2>Sorted List:</h2><ol>"+listtool(l)+"</ol>";
}

function insertion() {
	explain("insertion");
	if (busy) { return; }
	busy = true;
	l = getlist();
	if (l.length<=0) { alert("Nothing to sort!");busy=false;return; }
	// n passes
	document.getElementById("step").innerHTML = "<h2>Steps:</h2>";
	for (let j=1; j<l.length; j++) {
		let temp = l[j];
		let i = j-1;
		while (i>=0 && l[i] > temp) {
			l[i+1] = l[i];
			i--;
		}
		l[i + 1] = temp;
		document.getElementById("steps").innerHTML += "<h3>Pass "+j+": Insert Item "+temp+", "+j+" Items Sorted"+"</h3><ol>"+listtool(l)+"</ol>";
	}
	document.getElementById("steps").innerHTML += "<h3>Pass "+l.length+": All Sorted (No Further Changes Needed)";
	// the duration of the while loop depends on the length of array since it depends on j
	// two loops dependent on length of array => O(n^2) time complexity
	busy = false;
	document.getElementById("sortedlist").innerHTML = "<h2>Sorted List:</h2><ol>"+listtool(l)+"</ol>";
}

function merge() {
	explain("merge");
	if (busy) { return; }
	busy = true;
	l = getlist();
	if (l.length<=0) { alert("Nothing to sort!");busy=false;return; }
	let nl = [];
	// makes every element its own array
	for (let i=0; i<l.length; i++) {
		nl.push([l[i]]);
	}
	document.getElementById("step").innerHTML = "<h2>Steps:</h2>";
	document.getElementById("steps").innerHTML += "<h3>Split Array (Just Telling You!)</h3><ol>"+listtool(nl)+"</ol>";
	let passno = 1;
	// keep merging if there are still unmerged arrays
	while (nl.length !== 1) {
		let temp = [];
		// compares two sorted lists
		// combines them into one sorted list by dual selection
		for (let i=0; i<nl.length-1; i+=2) {
			let merged = []
			let x = 0;
			let y = 0;
			let k = 0;
			while (x<nl[i].length && y<nl[i+1].length) {
				if (nl[i][x] < nl[i+1][y] && x < nl[i].length) {
					merged[k] = nl[i][x];
					x++;
					k++;
				} else {
					merged[k] = nl[i+1][y];
					y++;
					k++;
				}
			}
			for (let j=x; j<nl[i].length; j++) {
				merged[k] = nl[i][x];
				x++;
				k++;
			}
			for (let j=y; j<nl[i+1].length; j++) {
				merged[k] = nl[i+1][y];
				y++;
				k++;
			}
			temp.push(merged.concat([]));
		}
		if (nl.length%2 === 1) { temp.push(nl[nl.length-1]); }
		nl = temp.concat([]);
		document.getElementById("steps").innerHTML += "<h3>Merge "+passno+"</h3><ol>"+listtool(nl)+"</ol>";
		passno++;
	}
	document.getElementById("steps").innerHTML = "<h2>Extract Sorted List:</h2><ol>"+listtool(nl[0])+"</ol>";
	busy = false;
	document.getElementById("sortedlist").innerHTML = "<h2>Sorted List:</h2><ol>"+listtool(nl[0])+"</ol>";
}

function counting() {
	explain("counting");
	if (busy) { return; }
	busy = true;
	l = getlist();
	if (l.length<=0) { alert("Nothing to sort!");busy=false;return; }
	let freq = [];
	let nl = new Array(l.length);
	let biggest = Number.NEGATIVE_INFINITY;
	for (let i of l) {
		if (i>biggest) {
			biggest = i;
		}
	}
	if (biggest>=10000) { alert("Please be considerate! Best demonstrated with small numbers (<500).");busy=false;return; }
	document.getElementById("step").innerHTML = "<h2>Steps:</h2>";
	document.getElementById("steps").innerHTML += "<h3>Biggest Number: "+biggest+"</h3>";
	for (let i=0; i<=biggest; i++) { freq[i] = 0; }
	for (let i of l) {
		freq[i]++;
	}
	let html = "<h3>Frequencies</h3><ul>";
	for (let i=0; i<freq.length; i++) {
		if (freq[i]>0) {
			html += "<li class='smalllist'>"+i+": "+freq[i]+" time(s)</li>";
		}
	} 
	document.getElementById("steps").innerHTML += html+"</ul>";
	for (let i=0; i<biggest; i++) {
		freq[i+1] += freq[i];
	}
	html = "<h3>Cumulative Frequencies</h3><ul>";
	for (let i=0; i<freq.length; i++) {
		if ((i===0 && freq[i]>0) || freq[i]>freq[i-1]) {
			html += "<li class='smalllist'>"+i+": "+freq[i]+" time(s)</li>";
		}
	} 
	document.getElementById("steps").innerHTML += html+"</ul>";
	for (let i = l.length-1; i>=0; i--) {
		nl[freq[l[i]]-1] = l[i];
		freq[l[i]]--;
		document.getElementById("steps").innerHTML += "<h3>Insertion "+(l.length-i)+": Item no. "+(i+1)+" = "+l[i]+"</h3><ol>"+listtool(nl)+"</ol>";
		html = "<h3>New Cumulative Frequencies</h3><ul>";
		for (let i=0; i<freq.length; i++) {
			if ((i===0 && freq[i]>0) || freq[i]>freq[i-1]) {
				html += "<li class='smalllist'>"+i+": "+freq[i]+" time(s)</li>";
			}
		} 
		document.getElementById("steps").innerHTML += html+"</ul>";
	}
	busy = false;
	document.getElementById("sortedlist").innerHTML = "<h2>Sorted List:</h2><ol>"+listtool(nl)+"</ol>";
}

function addno() {
	if (busy) { return; }
	if (listlength >= 20) { alert("Too long, don't get confused!");return; }
	busy = true;
	let newno = document.getElementById("addno").value;
	try {
		newno = parseInt(newno);
		if (!Number.isInteger(newno)) { throw new Error(); }
		if (newno<0) { throw new Error(); }
		if (newno>1000000) { alert("Take care of your eyes! Your number is too long and you may get confused.");busy=false;return; }
		document.getElementById("mylist").innerHTML += "<li class='smalllist'>"+newno+"</li>"
		listlength++;
	} catch (e) {
		alert("Please check that your input is valid!");
	} finally {
		busy = false;
	}
}

document.onkeydown = function (e) {
  e = e || window.event;
  switch (e.which || e.keyCode) {
        case 13 :
			addno();
            break;
  }
};

function resetlist() {
	document.getElementById("mylist").innerHTML = "";
	document.getElementById("step").innerHTML = "";
	document.getElementById("steps").innerHTML = "";
	document.getElementById("sortedlist").innerHTML = "";
	listlength = 0;
}

function listtool(l) {
	let html = "";
	for (let i of l) {
		html += "<li class='smalllist'>"+i+"</li>";
	}
	return html;
}

function getlist() {
	let lis = document.getElementById("mylist").children;
	vals = [];
	for (let i of lis) {
		vals.push(parseInt(i.innerHTML));
	}
	document.getElementById("steps").innerHTML = "";
	return vals;
}

function explain(x) {
	let box = document.getElementById("explain");
	switch (x) {
		case "bubble":
			box.innerHTML = `<h2>Bubble Sort</h2><p>
				Bubble sorting swaps 2 adjacent elements at a time if they are in the wrong order. For example, after one round of bubble sorting (ascending), [3,1,2,5,4] becomes [1,2,3,4,5]. 3 and 1 are swapped first, but since the next pair (3,2) is also in the wrong order, it continues swapping until it hits the 5 and stops. Then (5,4) is swapped because they are also in the wrong order.<br><br>As you can see, the nth largest number will always be continously swapped to the back for the nth round, excluding larger numbers which were already pushed to the right spot by previous passes. Since we only need to back the next biggest number (n-1) times for an array of size n (the smallest number will be automatically sorted at the front afterwards), and potentially (n-1) swaps are made each round, in the worst case the time spent is related to (n-1)(n-1) = n^2 + 2n + 1. n^2 is the term that increases the fastest (just trust inuition, though you can try proving it), so we say the worst-case time complexity is O(n^2).
			</p>`;
			break;
		case "selection":
			box.innerHTML = `<h2>Selection Sort</h2><p>
				Selection sort looks for the biggest or smallest unsorted element in a list, and successively adds it to the front, e.g. [1,2,5,3,4] becomes [5,1,2,3,4], which becomes [4,5,1,2,3] and so on.<br><br>Searching is done linearly by storing the biggest/smallest number so far and comparing it with the remaining numbers, which loops over the array and hence the time taken for sorting depends on its length n. All n items need to be fronted, so time taken is related to n^2. As such, we say the worst case time complexity is O(n^2).
			</p>`;
			break;
		case "insertion":
			box.innerHTML = `<h2>Insertion Sort</h2><p>
				Insertion sort splits the array into 2 parts: a sorted part and an unsorted part. Every pass, it takes an item from the unsorted part and inserts it in the right position of the sorted part. For example, if the first 3 items of [1,2,4,3,6,5] are already sorted, 3 is inserted between 2 and 4 on the next pass and it becomes [1,2,3,4,6,5].<br><br>For an array of size n, we loop through the sorted part to decide where to insert an item, and since the sorted part lengthens until it is the entire array, the time taken is related to n in the worst case. We repeat the insertion for all n elements of the array, so the time taken is related to n^2 and the worst case time complexity is O(n^2).
			</p>`;
			break;
		case "merge":
			box.innerHTML = `<h2>Merge Sort</h2><p>
				Merge sort, of course, is based on merging arrays. Given 2 sorted arrays [1,2,3,6] and [4,5,7,8], we can merge them into a single sorted array by comparing the successive values of each array, moving to the next element in the array if an element is added to the merged array.<br><br>In the example above, if we sort ascendingly, we first compare the initial elements of the 2 arrays, 1 and 4. 1 is smaller than 4, so it is added to our new array as [1] and move on to 2, while we still compare 4 for the second array, so in the next round we compare 2 and 4 (producing [1,2]). This goes on for comparing 3 and 4 ([1,2,3]), 6 and 4 ([1,2,3,4]), 6 and 5 ([1,2,3,4,5]), 6 and 7 ([1,2,3,4,5,6]), and finally nothing and 7 and 8 ([1,2,3,4,5,6,7,8]). Since both arrays are already sorted, we can ensure that we are adding the smallest element overall each time because we are comparing the smallest unsorted elements in each array.<br><br>Now, we can observe that an array with only 1 element is already sorted. We can hence sort an array by treating each element as a size-1 array, and successively merge them to sort them with this method. This is the essence of merge sort.<br><br>In each pass, every 2 sub-arrays are turned into 1, so the number of sub-arrays after each round is approximately halved. (We ignore the last sub-array if there are an odd number of sub-arrays.) Since sorting with merge sort is turning n sub-arrays (for an array of size n) into 1 sub-array (the sorted array), we need around log(n) base 2 passes to sort the array by considering the equation 2^x = n. Furthermore, in each pass, we check every element one after the other with their neighbours, so each pass takes time related to n. Therefore, we can say the worst case time complexity is O(nlog(n)), if we imply the base 2. (You should! This is Computer Science! Ignore Math Soc's complaints.)
			</p>`;
			break;
		case "counting":
			box.innerHTML = `<h2>Counting Sort</h2><p>
				Counting sort relies on cumulative frequencies. Consider 2 numbers a and b in a sorted array, where a < b. If their cumulative frequencies are x and y, we can say that the first x items are less than or equal to a, and the first y items are less than or equal to b. However, b is not less than or equal to a, so all b must be after the xth item, but at the same time they must be before the yth or the yth element. If there no values between a and b, all the items between this range must then be b as no other item can be there. This is the essence of counting sort.<br><br>In counting sort, we store the frequncies of each item in another array using the item's value as the index, then use these frequencies to calculate culmulative frequency. Then we loop over the original array, and check the culmulative frequency of an item to determine its backest available position. Of course, we then have to decrement the culmulative frequency stored, as the element is removed from the set of unsorted elements and the corresponding position is now occupied.<br><br>	We only ever linearly loop over the array, so part of the time taken relates to its length n. However, our frequency array needs to store the frequency of the largest number k, so its size should be k, and since we are looping over it the rest of the time taken is related to k. Since they are executed independently, the times are added and not multiplied, so we can say the worst case time complexity is O(n+k).<br><br>On the other hand, we can mitigate this by using key-value pairs to store frequencies, which reduces the time taken on handling frequencies back to being related to n, but this is annoying and adds more time elsewhere as more operations would be needed.<br><br>This is the best time complexity out of the algorithms introduced here, but there are also drawbacks. For one, we need to store frequencies for each item in a separate array of size k, so there is also a space complexity of O(k) (or O(n) for key-value pairs). Furthermore, if we use the base form of the algorithm, we can only sort nonnegative integers since we are using the values as indices of the frequency array.
			</p>`;
			break;
	}
}

/*function countingvalue() {
	if (busy) { return; }
	busy = true;
	l = [7,6,5,10,9,2,1,8,4,3];
	let freq = [];
	let nl = [];
	let biggest = Number.NEGATIVE_INFINITY;
	for (let i of l) {
		if (i>biggest) {
			biggest = i;
		}
	}
	for (let i=0; i<=biggest; i++) { freq[i] = 0; }
	for (let i of l) {
		freq[i]++;
	}
	for (let i=0,k=0; i<=biggest; i++) {
		for (let j=0; j<freq[i]; j++) {
			nl[k] = i;
			k++;
		}
	}
	busy = false;
	return nl;
}*/