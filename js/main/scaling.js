function scalingActive(name, amt, type) {
	amt = new ExpantaNum(amt);
	return amt.gte(getScalingStart(type, name));
}

function getScalingName(name, x=0) {
	let cap = Object.keys(SCALING_STARTS).length;
	let current = "";
	let amt = SCALING_RES[name](x);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALING_STARTS)[n]))
			return capitalFirst(Object.keys(SCALING_STARTS)[n]) + " ";
	}
	return current;
}

function getScalingStart(type, name) {
	let start = new ExpantaNum(SCALING_STARTS[type][name])
	if (name=="rank") {
		if (type=="scaled") {
			if (player.tr.upgrades.includes(11)) start = start.plus(10)
			if (player.tr.upgrades.includes(15)) start = start.plus(32)
			if (tmp.inf) if (tmp.inf.upgs.has("1;6")) start = start.plus(2)
			if (nerfActive("scaledRank")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("6;2")) start = start.plus(5)
			if (tmp.inf) if (tmp.inf.stadium.completed("solaris")) start = start.plus(STADIUM_REWARDS.effects.solaris())
		} else if (type=="atomic") {
			if (player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;5") && tmp.elm) start = start.plus(tmp.elm.bos["higgs_0;0;5"]())
		}
	} else if (name=="tier") {
		if (type=="scaled") {
			if (player.tr.upgrades.includes(12)) start = start.plus(2)
			if (player.tr.upgrades.includes(14)) start = start.plus(tr14Eff()["ss"])
			if (tmp.inf) if (tmp.inf.upgs.has("1;6")) start = start.plus(2)
			if (nerfActive("scaledTier")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("5;7")) start = start.plus(INF_UPGS.effects["5;7"]());
		}
	} else if (name=="rf") {
		if (type=="scaled") {
			if (player.dc.unl && tmp.dc) start = start.plus(tmp.dc.dfEff)
			if (tmp.inf) if (tmp.inf.upgs.has("6;1")) start = start.plus(10)
			if (nerfActive("scaledRF")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.pathogens) start = start.plus(tmp.pathogens[11].eff())
			if (tmp.inf) if (tmp.inf.upgs.has("2;6")) start = start.plus(5)
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("10;7")) start = start.plus(20)
			if (modeActive("extreme")) start = new ExpantaNum(1)
		}
	} else if (name=="pathogenUpg") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("4;5")) start = start.plus(2)
		}
	} else if (name=="darkCore") {
		if (type=="scaled") {
			if (tmp.pathogens) start = start.plus(tmp.pathogens[12].eff())
			if (tmp.inf) if (tmp.inf.upgs.has("6;4")) start = start.plus(2)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("2;10")) start = start.plus(5)
		}
	} else if (name=="endorsements") {
		if (type=="scaled") {
			if (tmp.ach) if (tmp.ach[108].has && modeActive("extreme")) start = start.plus(1)
			if (tmp.inf) if (tmp.inf.upgs.has("9;3")) start = start.plus(1)
			if (player.elementary.theory.tree.unl) start = start.plus(TREE_UPGS[7].effect(ExpantaNum.add(player.elementary.theory.tree.upgrades[7]||0, TREE_UPGS[11].effect(player.elementary.theory.tree.upgrades[11]||0))))
		}
	}
	if (type!=="atomic") if (Object.values(SCALING_STARTS)[Object.keys(SCALING_STARTS).indexOf(type)+1][name]!==undefined) start = start.min(getScalingStart(Object.keys(SCALING_STARTS)[Object.keys(SCALING_STARTS).indexOf(type)+1], name))
	return start
}

function getScalingPower(type, name) {
	let power = new ExpantaNum(1)
	if (name=="rank") {
		if (type=="scaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[14].eff()))
			if (tmp.inf) if (tmp.inf.upgs.has("4;3")) power = power.times(0.5)
			if (tmp.inf) if (tmp.inf.stadium.active("solaris", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.stadium.active("drigganiz", 4)) power = power.times(6)
			if (modeActive("extreme")) power = power.div(6)
		} else if (type=="superscaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[14].eff()))
			if (tmp.inf) if (tmp.inf.upgs.has("2;5")) power = power.times(0.95)
			if (tmp.inf) if (tmp.inf.upgs.has("9;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["9;6"]()))
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("8;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["8;6"]()))
			if (tmp.inf) if (tmp.inf.upgs.has("7;9")) power = power.times(0.98)
		}
	} else if (name=="rankCheap" && modeActive("extreme")) {
		if (type=="scaled") {
			if (FCComp(3)) power = power.times(0.1)
		}
	} else if (name=="tier") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("1;5")) power = power.times(0.8)
			if (tmp.inf) if (tmp.inf.upgs.has("2;7")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["2;7"]()))
			if (tmp.inf) if (tmp.inf.stadium.active("eternity", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.stadium.active("drigganiz", 4)) power = power.times(6)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("9;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["9;6"]()))
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("1;10")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["1;10"]()))
		}
	} else if (name=="rf") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("3;5")) power = power.times(0.75)
		} else if (type=="superscaled") {
			if (player.elementary.theory.tree.unl) power = power.times(ExpantaNum.sub(1, TREE_UPGS[8].effect(player.elementary.theory.tree.upgrades[8]||0))).max(0)
		}
	} else if (name=="fn" && modeActive("extreme")) {
		if (type=="superscaled") {
			if (FCComp(1)) power = power.times(0.1)
		} else if (type=="hyper") {
			if (FCComp(1)) power = power.times(0.1)
			if (inFC(3)) power = power.times(9.99)
		}
	} else if (name=="pathogenUpg") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.stadium.active("infinity", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.upgs.has("8;7")) power = power.times(0.16)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("10;1")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["10;1"]("pth")))
		}
	} else if (name=="darkCore") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("8;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["8;6"]()))
		}
	} else if (name=="endorsements") {
		if (type=="scaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[15].eff()))
		}
	}
	if (type=="hyper") power = power.max(0.5)
	return power
}