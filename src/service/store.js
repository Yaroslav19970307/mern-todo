export default class Store{
    static get(name){
        return window.localStorage.getItem(name) || null;
    }

    static set(name, item){
        window.localStorage.setItem(name, item);
    }
}