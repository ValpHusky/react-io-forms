export default class Observable {
    
    observers = []

    add(observer) {
        this.observers.push(observer);
    };

    notify(obj) {
        const promises = this.observers.map(async (observer) => {
            return observer(obj);  
        });
        return Promise.all(promises)
    };
}