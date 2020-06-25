module.exports.food = class food{
    constructor(name, image, price , vendor , category) {
        this.name = name;
        this.image = image;
        this.vendor = vendor,
        this.price = price,
        this.category = category
  }
};

module.exports.getFood = class foodData{
    constructor(data){
        this.data = data
    }
}
