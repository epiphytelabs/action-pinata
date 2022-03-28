const core = require("@actions/core");
const path = require("path");
const pinata = require("@pinata/sdk")(core.getInput("key"), core.getInput("secret"));

async function main() {
	const cid = core.getInput("cid");

	pinata
		.pinByHash(cid.toString())
		.then((result) => {
			core.setOutput("cid", result.ipfsHash);
			console.log("Pinned", cid);
		})
		.catch((error) => {
			core.setFailed(error.message);
		});
}

main();
