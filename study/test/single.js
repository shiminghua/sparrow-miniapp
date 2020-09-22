class A {
  a = null;
  instance = null;

  // constructor() {
  //   this.a = null;

  // }

  getA() {
    console.log('aaaaaaaaa ===> ', this.a);
    return this.a;
  }


  setA(value) {
    this.a = value;
  }

  static getInstance() {
    console.log(this);
    if (this.instance == null) {
      this.instance = new A();
    }
    // console.log(this);
    return this.instance;
  }
}

export default A.getInstance();

// const a = new A();
// export default a;

// export default A;
