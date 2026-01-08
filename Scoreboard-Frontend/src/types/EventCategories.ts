enum EventCatagories {
	CRICKET = "Cricket",
	FOOTBALL = "Football",
	SQUASH_MEN = "Squash_men",
	CHESS = "Chess",
	SQUASH_WOMEN = "Squash_women",
	TENNIS_WOMEN = "Tennis_women",
	TENNIS_MEN = "Tennis_men",
	ATHLETICS = "Athletics",
	BASKETBALL = "Basketball",
	VOLLEYBALL = "Volleyball",
	TABLE_TENNIS = "Table Tennis",
	BADMINTON = "Badminton",
	HANDBALL = "Handball",
	BALL_BADMINTON = "Ball Badminton",
	KABADDI = "Kabaddi",
	THROWBALL = "Throwball",
	RUGBY = "Rugby",
}

export const formatEventName = (e: string) => {
	let fName = "";
	let hasU = false;
	for (let i = 0; i < e.length; i++) {
		const char = e.charAt(i);
		if (char === "_") {
			hasU = true;
			fName += " (";
		} else {
			fName += char;
		}
	}
	if (hasU) fName += ")";
	return fName;
};

export const getEventGender = (event: { event: string; title: string; subtitle?: string }) => {
	const e = event.event.toLowerCase();
	const t = event.title.toLowerCase();
	const s = (event.subtitle || "").toLowerCase();

	if (
		e.includes("women") ||
		t.includes("women") ||
		s.includes("women") ||
		t.includes("womens") ||
		s.includes("womens") ||
		t.includes("(w)") ||
		s.includes("(w)") ||
		t.includes("girls") ||
		s.includes("girls")
	) {
		return "women";
	}
	if (
		e.includes("men") ||
		t.includes("men") ||
		s.includes("men") ||
		t.includes("mens") ||
		s.includes("mens") ||
		t.includes("(m)") ||
		s.includes("(m)") ||
		t.includes("boys") ||
		s.includes("boys")
	) {
		return "men";
	}
	return "unknown";
};

export default EventCatagories;
