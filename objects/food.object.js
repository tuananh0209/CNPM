module.exports.food = class food{
    constructor(name, image, price , vendor) {
        this.name = name;
        this.image = image;
        this.vendor = vendor,
        this.price = price
  }
};

module.exports.getFood = class foodData{
    constructor(data){
        this.data = data
    }
}
