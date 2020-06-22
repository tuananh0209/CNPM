class orderList{
    constructor(userName , id , note , timeOrder, food , amount){
        this.id = id;
        this.userName = userName;
        this.note = note;
        this.timeOrder = timeOrder;
        this.food = food;
        this.amount = amount;
    }
}

module.exports = orderList;