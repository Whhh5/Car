
import { _decorator, Component, Node } from 'cc';
import { changeEnemyBlood, IInitialization } from '../Interface/Interface';
import { IDelegate_IBlood_Number_Void, IDelegate_Void_Void } from '../Tools/TypeEnumAndDelegete';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ObserverPattern
 * DateTime = Sun Jan 23 2022 14:01:35 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = ObserverPattern.ts
 * FileBasenameNoExtension = ObserverPattern
 * URL = db://assets/Scripts/ObserverPattern/ObserverPattern.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('ObserverPattern')
export class ObserverPattern extends Component implements IInitialization{
    static _instance:ObserverPattern = null;   
    onLoad(){
        ObserverPattern._instance = this;

        //初始化事件添加
        this.initialization();
    }
    initialization(){
        // this._del_BulletHitEvent.push(changeEnemyBlood);
    }
    //子弹击中敌人事件
    _del_BulletHitEvent:Array<IDelegate_IBlood_Number_Void> = new Array<IDelegate_IBlood_Number_Void>();
}
