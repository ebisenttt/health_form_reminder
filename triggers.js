function setTrigger() {
	const morning = new Date();
	const lunch = new Date();

	//分散登校用
	// morning.setHours(8);
	// morning.setMinutes(50);
	// lunch.setHours(13);
	// lunch.setMinutes(00)

	//通常用
	morning.setHours(8);
	morning.setMinutes(30);
	lunch.setHours(12);
	lunch.setMinutes(40);

	ScriptApp.newTrigger('post').timeBased().at(morning).create();
	ScriptApp.newTrigger('post').timeBased().at(lunch).create();
}
