class A{
	
	static Field = "field 1";
	
	static getField(){
		return this.Field;
	}
}

class B extends A{
	
	static{
		super.Field = "new field";
	}
}