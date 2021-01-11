//Función de testeo del resto de funciones
function galeryTest(){
	let c1 = new Category("Realista", "imaganes realistas");
	let c2 = new Category("Abstracta", "imagenes abstractas");

	let coords1 = new Coords ("80° 30' 30'' N", " 0° 7' 32'' O");

	let l1 = new Landscape ("Paraje", "Monstañas", "Landscape", [coords1]);
	let p1 = new Portrait("López", "Señor mayor", "Portrait", [coords1]);

	let i1 =  new Image("Conde", "familia", [p1], [coords1]);
	let i2 =  new Image("Fusilamiento", "guerra", [l1], [coords1]);
	let i3 =  new Image("El sueño", "cansancio", [l1], [coords1]);
	let i4 =  new Image("La dania", "guerra", [l1], [coords1]);


	let a1 = new Author("Paco", "paco@paco.com", "paco.jpg");
	let a2 = new Author("Loli", "loli@loli.com", "loli.jpg");
	let a3 = new Author("Pollock", "pollock@pollock.com", "pollock.jpg");
	let a4 = new Author("Lucia", "lucia@lucia.com", "lucia.jpg");
	let a5 = new Author("Miriam", "miriama@miriama.com", "miriama.jpg");
	let a6 = new Author("Pepe", "pep@pep.com", "pep.jpg");
	let a7 = new Author("Juan", "juan@juan.com", "juan.jpg");

	let g1 = new Galery("pepita", [i1], [a1], [c1]);

	console.log("addCategory. Nº de categories");
	console.log(g1.addCategory(c2));
	console.log(g1);
	try {
		console.log(g1.addCategory(c1));
	}catch (error){
		console.log(error);
	}

	console.log("removeCategory. Nº de categories");
	console.log(g1.removeCategory(c1));

	try {
		g1.removeCategory(c1)
	}catch (error){
		console.log(error);
	}

	console.log("addAuthor. Nº de authors");
	console.log(g1.addAuthor(a2,c2));
	console.log(g1.addAuthor(a3,c2));
	console.log(g1.addAuthor(a4,c2));
	console.log(g1.addAuthor(a5,c2));
	console.log(g1.addAuthor(a6,c2));
	try {
		console.log(g1.addAuthor(a2, c2));
	}catch (error){

		console.log(error);
	}

	console.log("removeAuthor. Nº de authors");
	try {
		console.log(g1.removeAuthor(a1));
	}catch (error){
		console.log(error);
	}

	try {
		console.log(g1.removeAuthor(a2));
	}catch (error){
		console.log(error);
	}


	console.log("addImage. Nº de images");

	try {
		console.log(g1.addImage(i2, c2 ,a2));
	}catch (error){
		console.log(error);
	}

	try {
		console.log(g1.addImage(i3, c2 ,a2));
	}catch (error){
		console.log(error);
	}

	try {
		console.log(g1.addImage(i4, c2 ,a3));
	}catch (error){
		console.log(error);
	}
	try {
		console.log(g1.addImage(i2, c2 ,a3));
	}catch (error){
		console.log(error);
	}
	try {
		console.log(g1.addImage(i1, c2 ,a4));
	}catch (error){
		console.log(error);
	}

	console.log("removeImage. Nº de images");

	try {
		console.log(g1.removeImage(i2, c2, a3));
	}catch (error){
		console.log(error);
	}

	console.log("getCategoryImages");
	console.log(g1.getCategoryImages(c2));

	console.log("getAuthorImages");
	console.log(g1.getAuthorImages(c2, a4));

	console.log("getPortraits");
	console.log(g1.getPortraits());

	console.log("getLandscapes");
	console.log(g1.getLandscapes());

}
galeryTest();
