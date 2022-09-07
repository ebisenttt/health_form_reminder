// 学年
const GRADE = 1;
//クラス
const CLASS = 2;
//生徒の人数
const STUDENTS_NUM = 40;
//名簿のSpreadsheetId
const STUDENTS_LIST_SS_ID = '';
//名簿のsheet名
const STUDENTS_LIST_SHEET_NAME = '';
//健康連絡フォームのURL
const FORM_URL = '';
//健康連絡フォームのSpreadsheetId
const FORM_SS_ID = '';
//健康連絡フォームの本日分のsheet名
const FORM_SHEET_NAME = '';
//投稿先のクラスルームId
const CLASS_ID = '';

function getIdNum(num) {
	return GRADE * 1000 + CLASS * 100 + num;
}

function getAllStudentsObj() {
	const ss = SpreadsheetApp.openById(STUDENTS_LIST_SS_ID);
	const sheet = ss.getSheetByName(STUDENTS_LIST_SHEET_NAME);
	//先頭行を除くデータを取得
	const studentsArr = sheet.getDataRange().getValues().splice(1);
	let studentsObj = {};
	studentsArr.forEach((arr) => {
		const num = arr[0];
		const name = arr[1];
		const id = getIdNum(num);
		studentsObj = { ...studentsObj, [id]: name };
	});
	return studentsObj;
}

function getSubmittedStudentsNumList() {
	const ss = SpreadsheetApp.openById(FORM_SS_ID);
	const sheet = ss.getSheetByName(FORM_SHEET_NAME);
	const lastRow = sheet.getLastRow();
	const data = sheet.getRange(2, 2, lastRow - 1, 4).getValues();
	const fromNum = getIdNum(1);
	const toNum = getIdNum(STUDENTS_NUM);
	return data
		.filter((arr) => {
			const num = arr[0];
			return fromNum <= num && num <= toNum;
		})
		.filter((arr) => {
			const temp = arr[3];
			return temp !== '';
		})
		.sort()
		.map((arr) => {
			const num = arr[0];
			return num;
		});
}

function getNotSubmittedStudentsList() {
	const all = getAllStudentsObj();
	const sub = getSubmittedStudentsNumList();
	const notSub = Object.keys(all).filter((num) => !sub.includes(Number(num)));
	const nameList = notSub.map((num) => all[num]);
	return nameList;
}

function reminder() {
	const today = new Date();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	const nameList = getNotSubmittedStudentsList();
	let content;
	if (nameList.length != 0) {
		content = `以下の生徒は, 本日${month}/${date}分の健康連絡フォームが未提出です。至急提出すること。\n`;
		nameList.forEach((name, index) => {
			if (index % 5 === 4) content += `${name}\n`;
			else content += `${name}  `;
		});
		content += '\n' + FORM_URL + '\n';
	} else {
		content =
			'本日分の健康連絡フォームが全員提出されました。ご協力ありがとうございました。';
	}
	return content;
}

function post() {
	let content = reminder();
	return Classroom.Courses.Announcements.create({ text: content }, CLASS_ID);
}
