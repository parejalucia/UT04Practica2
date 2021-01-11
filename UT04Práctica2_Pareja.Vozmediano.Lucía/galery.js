"use strict";
(function(){
	let abstractCreateLock = true; //Definición del cerrojo.

	//Definimos la clase Galery
	class Galery{
		//Declaración de campos privados
		#title;
		#images;
		#authors;
		#categories;

		constructor (title, images, authors = "anonymous", categories = "anonymous"){
			//La función se invoca con el operador new
			if (!new.target) throw new InvalidAccessConstructorException();

			abstractCreateLock = true; //Reactivamos el cerrojo.*/

			//Definición de atributos privados del objeto
			this.#title = title;
			this.#images = images;
			this.#authors = authors;
			this.#categories = categories;
		}

		//Propiedades de acceso a los atributos privados
		get title(){
			return this.#title;
		}
		set title(value){
			if (!value) throw new EmptyValueException("title");
			this.#title = value;
		}

		get categories(){
			let nextIndex = 0;
			// referencia para habilitar el closure en el objeto
			let array = this.#categories;
			return {
				next: function(){
					return nextIndex < array.length ?
					{value: array[nextIndex++], done: false} :
					{done: true};
				}
			}
		}

		get authors(){
			let nextIndex = 0;
			// referencia para habilitar el closure en el objeto
			let array = this.#authors;
			return {
				next: function(){
					return nextIndex < array.length ?
					{value: array[nextIndex++], done: false} :
					{done: true};
				}
			}
		}

		//Dado un category, devuelve la posición de esa category en la galery o -1 si no lo encontramos.
		getCategoryPosition(category){
			if (!(category instanceof Category)) {
				throw new NotInstanceException ();
			}
			return this.#categories.findIndex(x => x.title === category.title);
		}

		//Dado un author, devuelve la posición de esa author en la galery o -1 si no lo encontramos.
		getAuthorPosition(author){
			if (!(author instanceof Author)) {
				throw new NotInstanceException ();
			}
			let em = [];
			this.#authors.forEach(element => {
				element.forEach(obj => {
					em.push(obj);
				})
			});
			return em.findIndex(x => x.email == author.email);

		}

		//Dado un image, devuelve la posición de esa image en la galery o -1 si no lo encontramos.
		getImagePosition(image){
			if (!(image instanceof Image)) {
				throw new NotInstanceException ();
			}
			let em = [];
			this.#images.forEach(element => {
				element.forEach(obj => {
					obj.forEach(value => {
						em.push(value);
					})
				})
			});
			return em.findIndex(x => x.title == image.title);

		}

		//Devuelve el nº de authors de la galery
		countAuthor(){
			let count = 0;
			this.#authors.forEach(element => {
				element.forEach(obj => {
					count++;
				})
			});
			return count;
		}

		//Devuelve el nº de imges de la galery
		countImages(){
			let count = 0;
			this.#images.forEach(element => {
				element.forEach(obj => {
					obj.forEach(value => {
						count++;
					})
				})
			});
			return count;
		}

		//Añade un nueva categoria en la galería.
		addCategory (obj){
			//Si el objeto category es null lanzamos una excepción
			if (obj === null) {
				throw new NullValueException ();
			}

			let position = this.getCategoryPosition(obj);
			if (position === -1){
				this.#categories.push(obj); //Añadimos esa category
			} else{
				throw new CategoryExistException (); //Si la category existe lanzamos una excepción
			}
			return this.#categories.length;
		}

		//Elimina una category de la galery si existe, sino lanzamos una excepción
		removeCategory (obj){
			let position = this.getCategoryPosition(obj);
			if (position === -1){
				throw new ObjectNotExistException ();
			} else{
				this.#categories.splice(position, 1);
				//Borramos también todos los los author y images de es category
				this.#authors.splice(position, 1);
				this.#images.splice(position, 1);
			}
			return this.#categories.length;
		}

		//Añade un nueva autor en a una categoria, si existe lanzamos una excepción.
		//Lo he modificado porque le veo más sentido si al añadir un author lo añadimos directamente a una category.
		//Porque añadirlo a la galery sin especificar su category no tiene sentido para mí.
		addAuthor (author, category){
			if (author === null) {
				throw new NullValueException ();
			}
			let position = this.getAuthorPosition(author);
			let categoryPosition = this.getCategoryPosition(category);
			if (position === -1){
				if(this.#authors[categoryPosition] != undefined){
					this.#authors[categoryPosition].push(author);

				}else{
					this.#authors[categoryPosition] = [];
					this.#authors[categoryPosition].push(author);
				}

			} else{
				throw new AuthorExistException ();
			}
			//return this.#authors.length;
			return this.countAuthor();
		}

		//Eliminamos author, sino existe lanzamos una excepción
		removeAuthor (obj){
			let position = this.getAuthorPosition(obj);
			if (position === -1){
				throw new ObjectNotExistException ();
			} else{

				this.#authors.forEach(element => {
					element.splice(position, 1);
				});

			}
			//return this.#authors.length;
			return this.countAuthor();
		}

		//Añadimos una image a la galery, especificando su category y author.
		addImage(image, category ,author){
			if (image === null) { //Si es null la image lanzamos una excepción
				throw new NullValueException (0);
			}

			//Si el author o la category no existe lanzamos la excepción

			let authorPosition = this.getAuthorPosition(author);
			if(authorPosition == -1){
				throw new ObjectNotExistException ();
			}

			let categoryPosition = this.getCategoryPosition(category);
			if(categoryPosition == -1){
				throw new ObjectNotExistException ();
			}

			if (!this.#images[categoryPosition]) this.#images[categoryPosition] = [];
			if (!this.#images[authorPosition]) this.#images[authorPosition] = [];

			if(this.#images[categoryPosition][authorPosition] != undefined){
				this.#images[categoryPosition][authorPosition].push(image);

			}else{
				this.#images[categoryPosition][authorPosition] = [];
				this.#images[categoryPosition][authorPosition].push(image);

			}

			//return this.#images.length;
			return this.countImages();

		}

		//Eliminar una imagen de la galery, sino existe lanzamos una excepción
		removeImage(image, category, author){
			let categoryPosition = this.getCategoryPosition(category);
			let authorPosition = this.getAuthorPosition(author);
			let imagePosition = this.getImagePosition(image);
			if (imagePosition === -1){
				throw new ObjectNotExistException();
			} else{
				this.#images[categoryPosition][authorPosition];
				this.#images[categoryPosition][authorPosition].splice(imagePosition, 1);
			}
			//return this.#images.length;
			return this.countImages();
		}

		//Muestra todas las images de una category, si la category que recibimos es null lanzamos una excepción
		getCategoryImages(obj){
			if (obj === null) {
				throw new NullValueException();
			}
			let position = this.getCategoryPosition(obj);
			return (this.#images[position]);
		}

		//Muestra todos las images de un authors
		getAuthorImages(category, author){
			if (author === null) {
				throw new NullValueException();
			}
			let categoryPosition = this.getCategoryPosition(category);
			let authorPosition = this.getAuthorPosition(author);

			return (this.#images[categoryPosition][authorPosition]);
		}

		//Muestras todas las images de tipo Portraits
		getPortraits(){
			let i = [];
			this.#images.forEach(element => {
				element.forEach(obj => {
					obj.forEach(value => {
						value.url.forEach(fin => {
							if(fin.url == "Portrait"){
								i.push(value.url);
							}
						})
					})
				})
			});
			return i;
		}

		//Muestras todas las images de tipo Landscapes
		getLandscapes(){
			let i = [];
			this.#images.forEach(element => {
				element.forEach(obj => {
					obj.forEach(value => {
						value.url.forEach(fin => {
							if(fin.url == "Landscape"){
								i.push(value.url);
							}
						})
					})
				})
			});
			return i;
		}

		toString(){
			return "Title: " + this.title + " Images: " + this.images + " Authors: " + this.authors + " Categories: " + this.categories;
		}

	}
	Object.defineProperty(Galery.prototype, "title", {enumerable: true});
	Object.defineProperty(Galery.prototype, "images", {enumerable: true});
	Object.defineProperty(Galery.prototype, "authors", {enumerable: true});
	Object.defineProperty(Galery.prototype, "categories", {enumerable: true});

	//Definimos la subclase Category
	class Category{
		//Declaración de campos privados
		#title;
		#description;

		constructor (title, description){
			if (!new.target) throw new InvalidAccessConstructorException();

			abstractCreateLock = true; //Reactivamos el cerrojo.

			//Validación de argumentos
			if (!title) throw new EmptyValueException("title");

			//Definición de atributos privados del objeto
			this.#title = title;
			this.#description = description;
		}

		//Propiedades de acceso a los atributos privados
		get title(){
			return this.#title;
		}
		set title(value){
			if (!value) throw new EmptyValueException("title");
			this.#title = value;
		}

		//Propiedades de acceso a los atributos privados
		get description(){
			return this.#description;
		}
		set description(value){
			this.#description = value;
		}

		toString(){
			return "Title: " + this.title + " Description: " + this.description;
		}


	}
	Object.defineProperty(Category.prototype, "title", {enumerable: true});
	Object.defineProperty(Category.prototype, "description", {enumerable: true});

	class Image{
		//Declaración de campos privados
		#title;
		#description;
		#url;
		#coords;

		constructor (title, description, url, coords){
			if (!new.target) throw new InvalidAccessConstructorException();

			abstractCreateLock = true; //Reactivamos el cerrojo.

			//Validación de argumentos
			if (!title) throw new EmptyValueException("title");

			//Definición de atributos privados del objeto
			this.#title = title;
			this.#description = description;
			this.#url = url;
			this.#coords = coords;

		}

		//Propiedades de acceso a los atributos privados
		get title(){
			return this.#title;
		}
		set title(value){
			if (!value) throw new EmptyValueException("title");
			this.#title = value;
		}

		get description(){
			return this.#description;
		}
		set description(value){
			this.#description = value;
		}

		get url(){
			return this.#url;
		}
		set url(value){
			this.#url = value;
		}

		get coords(){
			return this.#coords;
		}
		set coords(value){
			this.#coords = value;
		}

		toString(){
			return "Title: " + this.title + " Description: " + this.description + " URL: " + this.url + " Coords: " + this.coords;
		}

	}
	Object.defineProperty(Image.prototype, "title", {enumerable: true});
	Object.defineProperty(Image.prototype, "description", {enumerable: true});
	Object.defineProperty(Image.prototype, "url", {enumerable: true});
	Object.defineProperty(Image.prototype, "coords", {enumerable: true});

	//Definimos la subclase Landscape
	class Landscape extends Image{
		constructor (title, description, url, coords){
			//La función se invoca con el coords new
			if (!new.target) throw new InvalidAccessConstructorException();
			//Llamada al superconstructor.
			abstractCreateLock = false; //Desactivamos el cerrojo.
			super(title,description,url,coords);
		}
		toString(){
			return super.toString();
		}
	}

	//Definimos la subclase Portrait
	class Portrait extends Image{
		constructor (title, description, url, coords){
			//La función se invoca con el coords new
			if (!new.target) throw new InvalidAccessConstructorException();
			//Llamada al superconstructor.
			abstractCreateLock = false; //Desactivamos el cerrojo.
			super(title,description,url,coords);
		}
		toString(){
			return super.toString();
		}
	}

	class Coords{
		//Declaración de campos privados
		#latitude;
		#longitude;
		constructor(latitude, longitude){
			if (!new.target) throw new InvalidAccessConstructorException();

			abstractCreateLock = true; //Reactivamos el cerrojo.

			//Definición de atributos privados del objeto
			this.#latitude = latitude;
			this.#longitude = longitude;
		}

		get latitude(){
			return this.#latitude;
		}
		set latitude(value){
			this.#latitude = value;
		}

		get longitude(){
			return this.#longitude;
		}
		set longitude(value){
			this.#longitude = value;
		}

		toString(){
			return "Latitude: " + this.latitude + " Longitude: " + this.longitude;
		}
	}
	Object.defineProperty(Coords.prototype, "latitude", {enumerable: true});
	Object.defineProperty(Coords.prototype, "longitude", {enumerable: true});

	class Author{
		//Declaración de campos privados
		#nickname;
		#email;
		#avatar;
		constructor(nickname, email, avatar){
			if (!new.target) throw new InvalidAccessConstructorException();

			abstractCreateLock = true; //Reactivamos el cerrojo.

			//Validación de argumentos
			//Intenté validar el email, pero no lo conseguí :( )
			//if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(email)) throw new InvalidValueException("email",email);

			//Definición de atributos privados del objeto
			this.#nickname = nickname;
			this.#email = email;
			this.#avatar = avatar;
		}

		get nickname(){
			return this.#nickname;
		}
		set nickname(value){
			this.#nickname = value;
		}

		get email(){
			return this.#email;
		}
		set email(value){
			this.#email = value;
		}

		get avatar(){
			return this.#avatar;
		}
		set avatar(value){
			this.#avatar = value;
		}

		toString(){
			return "Nickname: " + this.nickname + " Email: " + this.email + " Avatar: " + this.avatar;
		}

	}
	Object.defineProperty(Author.prototype, "nickname", {enumerable: true});
	Object.defineProperty(Author.prototype, "email", {enumerable: true});
	Object.defineProperty(Author.prototype, "avatar", {enumerable: true});

	window.Galery = Galery;
	window.Category = Category;
	window.Author = Author;
	window.Image = Image;
	window.Coords = Coords;
	window.Portrait = Portrait;
	window.Landscape = Landscape;




})(); //Invocamos la función global.
