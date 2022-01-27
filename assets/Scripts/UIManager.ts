
import { _decorator, Component, Node, UITransform, tween, Size } from 'cc';
import { IInitialization } from './Interface/Interface';
import { GameManager } from './Singleton/GameManager';
import { LevelManager } from './Singleton/LevelManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIManager
 * DateTime = Mon Jan 24 2022 19:43:54 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = UIManager.ts
 * FileBasenameNoExtension = UIManager
 * URL = db://assets/Scripts/UIManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('UIManager')
export class UIManager extends Component implements IInitialization{
    static _instance:UIManager = null;   
    onLoad(){
        UIManager._instance = this;
        
    }

    @property({type:UITransform,visible:true})
    _carBlood:UITransform;
    @property({visible:true})
    _maxCarBlood:number = 0;

    initialization(){
        UIManager._instance._maxCarBlood = UIManager._instance._carBlood.contentSize.width;
    }
}