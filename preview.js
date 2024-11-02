const asciidoctor = require('@asciidoctor/core')();
const asciidoctorRevealjs = require('@asciidoctor/reveal.js');
asciidoctorRevealjs.register();

const browserSync = require("browser-sync");
const bs = browserSync.create();

const adocFile = process.argv[2];
if (!adocFile) {
	console.error(
		"You must specify an asciidoctor file to be previewed! Example:\n",
		"node preview.js test\\test.adoc"
	);
	return;
}

function convertFile(cause) {
	asciidoctor.convertFile(adocFile, { safe: 'safe', backend: 'revealjs' });
	console.log(`Converted file: '${adocFile}' (${cause})`);
}

function watchCallback(filename) {
	if (!filename.endsWith(".html") && !filename.startsWith(".")) {
		convertFile(`'${filename}' changed`);
		bs.reload();
	}
}

convertFile("startup");
bs.watch(".").on("change", watchCallback);

bs.init({
	server: true,
	startPath: adocFile.replace(".adoc", ".html")
}); 