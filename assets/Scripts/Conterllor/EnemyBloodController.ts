
import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Singleton/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyBloodController
 * DateTime = Tue Jan 25 2022 13:07:42 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = EnemyBloodController.ts
 * FileBasenameNoExtension = EnemyBloodController
 * URL = db://assets/Scripts/Conterllor/EnemyBloodController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('EnemyBloodController')
export class EnemyBloodController extends Component {
    @property({group:{name:""},type:Node,visible:true})
    _blood:Node;

    start () {
        // [3]
    }

    update (deltaTime: number) {
        if(GameManager._instance._camera){
            this.node.lookAt(GameManager._instance._camera.position);
        }
    }
}