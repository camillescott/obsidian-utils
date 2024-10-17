const SETTLEMENT_SIZES = {
	tiny: [5,50],
	small: [50, 500],
	medium: [500, 5000],
	large: [5000, 50000],
	huge: [50000, 250000],
	gargantuan: [250000, null]
};

function getSettlementSizes() {
	return SETTLEMENT_SIZES;
}

module.exports = getSettlementSizes;
