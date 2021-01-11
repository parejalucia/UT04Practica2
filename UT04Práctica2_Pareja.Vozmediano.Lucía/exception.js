class BaseException extends Error {
	constructor (message = "", fileName, lineNumber){
		super(message, fileName, lineNumber);
		this.name = "BaseException";
		if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException)
    }
	}
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
	constructor (fileName, lineNumber){
		super("Constructor can’t be called as a function.", fileName, lineNumber);
		this.name = "InvalidAccessConstructorException";
	}
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
	constructor (param, fileName, lineNumber){
		super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
	constructor (param, value, fileName, lineNumber){
		super("Error: The paramenter ${param} has an invalid value. (${param}: ${value})", fileName, lineNumber);
		this.param = param;
		this.value = value;
		this.name = "EmptyValueException";
	}
}

//Excepción de valor nullo
class NullValueException extends BaseException {
	constructor (param, value, fileName, lineNumber){
		super("Error: The paramenter ${param} is null. (${param}: ${value})", fileName, lineNumber);
		this.param = param;
		this.name = "NullValueException";
	}
}

class NotInstanceException extends BaseException {
	constructor (fileName, lineNumber){
		super("Error: The method needs a Object parameter.", fileName, lineNumber);
		this.name = "NotInstanceException";
	}
}


class CategoryExistException extends BaseException  {
	constructor (category, fileName, lineNumber){
		super("Error: The Category  exist in the galery. " + category, fileName, lineNumber);
		this.name = "CategoryExistException";
		this.category = category;
	}
}

class ObjectNotExistException extends BaseException  {
	constructor (category, fileName, lineNumber){
		super("Error: The Object doesn't exist in the galery. " + category, fileName, lineNumber);
		this.name = "ObjectNotExistException";
		this.category = category;
	}
}
