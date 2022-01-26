
import { _decorator, Component, Node } from 'cc';
import { IInitialization } from '../Interface/Interface';
import { IDelegate_Void_Void } from '../Tools/TypeEnumAndDelegete';
import { UIManager } from '../UIManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = LevelManager
 * DateTime = Sun Jan 23 2022 14:03:11 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = LevelManager.ts
 * FileBasenameNoExtension = LevelManager
 * URL = db://assets/Scripts/Singleton/LevelManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('LevelManager')
export class LevelManager extends Component {
    static _instance:LevelManager = null;   
    onLoad(){
        LevelManager._instance = this;
    }



    _inits:Array<IInitialization> = [];
    start(){
        //添加事件
        LevelManager._instance._inits.push(UIManager._instance);
        //执行事件
        for(let i=0;i<this._inits.length;i++){
            this._inits[i].initialization();
        }
    }

}