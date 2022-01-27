export interface IInitialization{
    initialization():void;
}

export interface IBlood{
    _blood:number;
}
export interface IAttack{
    _attackNumber:number;
}



//public function
export function changeEnemyBlood(value:{blood:IBlood,value:number}) {
    value.blood._blood += value.value;
    console.log(value.blood._blood + "  " + value.value);
}