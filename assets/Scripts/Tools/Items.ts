import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Singleton/GameManager';
import { executeDelegate, IDelegate_Void_Void, removeDelegate } from './TypeEnumAndDelegete';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Items
 * DateTime = Sun Jan 23 2022 14:03:24 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = Items.ts
 * FileBasenameNoExtension = Items
 * URL = db://assets/Scripts/Tools/Items.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Items')
export class Items extends Component {

    _A:Array<IDelegate_Void_Void> = new Array<IDelegate_Void_Void>();
    
    start(){
        let b = ({}):void=>{console.log("2");};
        this._A.push(({}):void=>{console.log("1");}); 
        this._A.push(b);
        removeDelegate(this._A,b);
        console.log(this._A.length);
    }
}