function ach63SC() {
	let sc = new ExpantaNum(1e25)
	if (tmp.inf) if (tmp.inf.upgs.has("8;4")) sc = sc.times(player.inf.pantheon.purge.power.plus(1).pow(17))
	return sc
}

function ach63Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[74].has) pow = pow.times(1.75)
	if (modeActive("easy")) pow = pow.times(2)
	if (player.tr.upgrades.includes(24) && modeActive("extreme")) pow = pow.times(1.4)
	return pow
}

function ach63Eff() {
	let sc = ach63SC()
	let pow = ach63Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.pow(0.025).pow(pow) : new ExpantaNum(1)
	if (eff.gte(sc)) eff = eff.log10().times(sc.div(sc.log10()))
	return eff
}

function ach112Pow() {
	let pow = new ExpantaNum(1)
	if (tmp.inf) if (tmp.inf.upgs.has("4;10")) pow = pow.times(INF_UPGS.effects["4;10"]().max(1))
	return pow
}

function ach112Eff() {
	let pow = ach112Pow()
	let eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).log10().plus(1).pow(0.1).pow(pow) : new ExpantaNum(1)
	if (tmp.ach) if (tmp.ach[123].has) eff = tmp.timeSpeed ? tmp.timeSpeed.log10().plus(1).pow(0.02).pow(pow).max(eff) : new ExpantaNum(1)
	if (eff.gte(1e160)) eff = eff.log10().pow(72.6).min(eff)
	return eff
}