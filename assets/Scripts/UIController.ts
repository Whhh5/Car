
import { _decorator, Component, Node, tween, Mask, UITransform, Vec2, size, Size, Tween } from 'cc';
import { GameManager } from './Singleton/GameManager';
import { executeDelegate } from './Tools/TypeEnumAndDelegete';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIController
 * DateTime = Mon Jan 24 2022 18:52:50 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = UIController.ts
 * FileBasenameNoExtension = UIController
 * URL = db://assets/Scripts/UIController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('UIController')
export class UIController extends Component {
    _tw1:Tween<UITransform>;
    start () {
        GameManager._instance.reduceCarBlood.push(this.changeCarBloodVolume);
    }

    changeCarBloodVolume(){
        tween(UIManager._instance._carBlood)
            .to(1,{contentSize:new Size(GameManager._instance._bloodVolume/GameManager._instance._maxBloodVolume*UIManager._instance._maxCarBlood,UIManager._instance._carBlood.contentSize.height)})
            .union()
            .repeat(1)
            .start()
    }
    changeEnemyCarBloodVolume(){
        tween(UIManager._instance._carBlood)
            .to(1,{contentSize:new Size(GameManager._instance._bloodVolume/GameManager._instance._maxBloodVolume*UIManager._instance._maxCarBlood,UIManager._instance._carBlood.contentSize.height)})
            .union()
            .repeat(1)
            .start()
    }
    
}
