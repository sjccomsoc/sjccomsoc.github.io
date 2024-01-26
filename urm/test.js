function run() {
	var registers = {}
	var CF = 0
	var commands = []

	function notexist(x) {
		if (!(registers[x])) {
			registers[x] = 0
		}
	}

	function zero(n) {
		registers[n] = 0
	}

	function plus(n) {
		notexist(n)
		registers[n]+=1
	}

	function copyto(m,n) {
		notexist(m)
		notexist(n)
		registers[n] = parseInt(new Number(registers[m]))
	}

	function jump(m,n,q) {
		notexist(m)
		notexist(n)
		if (registers[m] === registers[n]) {
			CF = q
		}
	}

	var box1 = document.querySelectorAll('textarea')[1]
	//"P,1 P,1 P,1 P,3 P,3 P,3 J,1,3,2 C,1,4 Z,1"
	var outbox = document.getElementById('outbox')
	var command = box1.value.split(/\s+/)

	for (let i=0;i<command.length;i++) {
		commands.push(command[i].split(','))
	}
	
	var ono = 0
	
	while (CF < commands.length) {
		if (commands[CF][0] == 'Z') {
			zero(commands[CF][1])
		}
		if (commands[CF][0] == 'P') {
			plus(commands[CF][1])
		}
		if (commands[CF][0] == 'C') {
			copyto(commands[CF][1],commands[CF][2])
		}
		if (commands[CF][0] == 'J') {
			jump(commands[CF][1],commands[CF][2],parseInt(commands[CF][3])-2)
		}
		CF++
		ono++
		if (ono > 100) {
			alert("Runtime Exceeded!")
			break
		}
	}	
	
	output = "Registers:\n"
	for (let i=0;i<Object.entries(registers).length;i++) {
		output = output + Object.entries(registers)[i][0] + ":" + Object.entries(registers)[i][1] + "\n"
	}
	outbox.value = "Line: " + CF + "\n" + output
}

function nxtln() {
	var registerbox = document.getElementById('registers')
	var linebox = document.getElementById('linebox')
	var CF = parseInt(linebox.value)-1
	var registers = JSON.parse(registerbox.value)
	var commands = []

	function notexist(x) {
		if (!(registers[x])) {
			registers[x] = 0
		}
	}

	function zero(n) {
		registers[n] = 0
	}

	function plus(n) {
		notexist(n)
		registers[n]+=1
	}

	function copyto(m,n) {
		notexist(m)
		notexist(n)
		registers[n] = parseInt(new Number(registers[m]))
	}

	function jump(m,n,q) {
		notexist(m)
		notexist(n)
		if (registers[m] === registers[n]) {
			CF = q
		}
	}

	var box1 = document.querySelectorAll('textarea')[1]
	//"P,1 P,1 P,1 P,3 P,3 P,3 J,1,3,2 C,1,4 Z,1"
	var outbox = document.getElementById('outbox')
	var command = box1.value.split(/\s+/)

	for (let i=0;i<command.length;i++) {
		commands.push(command[i].split(','))
	}
	
	var usedline = ''
	for (let i=0;i < commands[CF].length;i++) {
		usedline = usedline + commands[CF][i]
		if (i < commands[CF].length-1) {
			usedline = usedline + ','
		}
	}
	
	if (CF < commands.length) {
		if (commands[CF][0] == 'Z') {
			zero(commands[CF][1])
		}
		if (commands[CF][0] == 'P') {
			plus(commands[CF][1])
		}
		if (commands[CF][0] == 'C') {
			copyto(commands[CF][1],commands[CF][2])
		}
		if (commands[CF][0] == 'J') {
			jump(commands[CF][1],commands[CF][2],parseInt(commands[CF][3])-2)
		}
		CF++
	}
	
	linebox.value = CF + 1
	registerbox.value = JSON.stringify(registers)
	output = "Registers:\n"
	for (let i=0;i<Object.entries(registers).length;i++) {
		output = output + Object.entries(registers)[i][0] + ":" + Object.entries(registers)[i][1] + "\n"
	}
	outbox.value = "Line: " + CF + "\n" + usedline + '\n' + output
}

function r_reset() {
	var registerbox = document.getElementById('registers')
	registerbox.value = JSON.stringify({})
}

function checklearn() {
	var x = document.getElementById('q')
	x.value = "Put 3 in Register 1. Put 3 in Register 2. Jump to 3rd line. Copy Register 1 to Register 3. Make Register 1 equal 0."
}

function easy() {
	var x = document.getElementById('q')
	x.value = "Put 6 in Register 0 and 5 in Register 1 within 8 lines."
}

function sad() {
	var x = document.getElementById('q')
	x.value = "Initialize a in Register 1 and b in Register 2. Add them together and display the result in Register 1. Make all other used Registers equal 0."
}

function sadhint() {
	var x = document.getElementById('q')
	x.value = "Initialize a in Register 1 and b in Register 2. Add them together and display the result in Register 1. Make all other used Registers equal 0.\nHint: every time you add 1, change a counter register to track your progress."
}

function cry() {
	var x = document.getElementById('q')
	x.value = "Initialize a in Register 1 and b in Register 2. Multiply them together and display the result in Register 1. Make all other used Registers equal 0."
}

function docs() {
	var x = document.getElementById('q')
	x.value = "This is an unlimited register machine.\nThere are an infinite number of registers, or buckets where you put numbers, and you can modify them.\nThere are only 4 functions: Z,P,C,J.\nZ,a makes register a equal 0.\nP,a adds to register a by 1.\nC,a,b copies the value of register a to register b.\nJ,a,b,n means if register a equals register b,we jump to line number n (ignores empty lines)."
}