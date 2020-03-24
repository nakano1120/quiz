(function() {
	const SEDict = {
		correct:	new Audio('se/correct.mp3'),
		incorrect:	new Audio('se/incorrect.mp3'),
		decision:	new Audio('se/decision.mp3'),
		next:		new Audio('se/question.mp3'),
	};

	for (const [_, se] of Object.entries(SEDict))
		se.load();


	const NOT_STARTED		= -1;
	const CAN_ANSWER		= 0;
	const FIRST_UID			= 1;
	const ANSWERING_UID_1	= 1;
	const ANSWERING_UID_2	= 2;
	const ANSWERING_UID_3	= 3;
	const ANSWERING_UID_4	= 4;
	const ANSWERING_UID_5	= 5;
	const ANSWERING_UID_6	= 6;
	const ANSWERING_UID_7	= 7;
	const ANSWERING_UID_8	= 8;
	const LAST_UID			= 8;

	let appState = NOT_STARTED;

	const score = [];
	for ( let uid = FIRST_UID; uid <= LAST_UID; ++uid )
		score[uid] = { correct: 0, incorrect: 0 };

	const keyCode2UID = (keyCode) => {
		switch (keyCode) {
			case 49: return ANSWERING_UID_1;
			case 50: return ANSWERING_UID_2;
			case 56: return ANSWERING_UID_3;
			case 57: return ANSWERING_UID_4;
			case 90: return ANSWERING_UID_5;
			case 88: return ANSWERING_UID_6;
			case 78: return ANSWERING_UID_7;
			case 77: return ANSWERING_UID_8;
			default: return null;
		}
	};

	const updateUI = () => {
		for (let uid = FIRST_UID; uid <= LAST_UID; ++uid) {
			document.getElementById(
				`p${uid}`
			).style.backgroundColor = appState == uid ? '#f66' : 'unset';

			document.getElementById(
				`ox${uid}`
			).textContent = `${score[uid].correct}o${score[uid].incorrect}x`;
		}
	};

	document.addEventListener('keydown', (e) => {
		if (appState != CAN_ANSWER) return;

		const answererUid = keyCode2UID(e.keyCode);
		if (!answererUid) return;
		appState = answererUid;

		updateUI();
	});

	// start button (once)
	document.getElementById('startreset').addEventListener('click', (e) => {
		e.target.style.display = 'none';
		
		appState = CAN_ANSWER;
		updateUI();
		SEDict.next.play();
	});

	const O_BUTTON = 0;
	const X_BUTTON = 1;
	const PASS_BUTTON = 3;
	const buttons = document.getElementsByTagName('a');

	const nextQuiz = () => {
		appState = CAN_ANSWER;
		updateUI();

		alert("次の問題です");
		SEDict.next.play();
	};

	buttons[O_BUTTON].addEventListener('click', () => {
		if (appState < FIRST_UID) return;

		SEDict.correct.play();
		alert (`${appState}P 正解`);
		++ score[appState].correct;

		nextQuiz();
	});

	buttons[X_BUTTON].addEventListener('click', () => {
		if (appState < FIRST_UID) return;

		SEDict.incorrect.play();
		alert (`${appState}P 不正解`);
		++ score[appState].incorrect;

		nextQuiz();
	});

	buttons[PASS_BUTTON].addEventListener('click', () => {
		if (appState < FIRST_UID) return;
		alert (`${appState}P パス`);

		nextQuiz();
	});


	{
		const volume = document.createElement('input');
		volume.max = 1;
		volume.min = 0;
		volume.step = .01;
		volume.value = localStorage.getItem('quiz-self_volume') ?? .3;
		volume.type = 'range';
		volume.style.width = '100%';

		document.body.appendChild(volume);

		const applyVolume = (() => {
			for (const [_, se] of Object.entries(SEDict))
				se.volume = volume.value;

			localStorage.setItem('quiz-self_volume', volume.value);
		});

		volume.addEventListener('change', applyVolume);
		applyVolume();
	}

})();

function start() {}
function question() {}

