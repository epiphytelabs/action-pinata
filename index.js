const core = require("@actions/core");
const path = require("path");
const pinata = require("@pinata/sdk")(core.getInput("key"), core.getInput("secret"));

async function main() {
	try {
		let source = core.getInput("path");

		if (!path.isAbsolute(source)) {
			const root = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
			source = path.join(root, source);
		}

		const options = {
			cidVersion: 0,
			wrapWithDirectory: false,
		};

		const result = await pinata.pinFromFS(source, options);
		const cid = result.IpfsHash.toString();

		core.setOutput("cid", cid);

		console.log("Published", cid);
	} catch (error) {
		core.setFailed(error.message);
		throw error;
	}
}

main();
