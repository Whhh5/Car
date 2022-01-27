
import { _decorator, Component, Node, tween } from 'cc';
import { FactoryPattern } from '../FactoryPattern/FactoryPattern';
import { GameManager } from '../Singleton/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CreaterEnemyCobtroller
 * DateTime = Tue Jan 25 2022 20:05:44 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = CreaterEnemyCobtroller.ts
 * FileBasenameNoExtension = CreaterEnemyCobtroller
 * URL = db://assets/Scripts/Conterllor/CreaterEnemyCobtroller.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('CreateCobtroller')
export class CreateCobtroller extends Component {
    start(){
        this.enemyCarInitialization(GameManager._instance._enemyCreaterCount);
    }
    //敌人车辆生成初始化
    enemyCarInitialization(count:number){
        this.schedule(()=>{
            for(let i=0;i<GameManager._instance._enemyCreaterPosition.length;i++){
                FactoryPattern._instance.getObj(FactoryPattern._instance._enemyCars,FactoryPattern._instance._enemyCar,GameManager._instance._enemyCreaterPosition[i].worldPosition,GameManager._instance._enemyCreaterPosition[i].worldRotation,GameManager._instance._parent);
                
            }
        },10,count,0);
        // tween(1)
        //     .delay(2)
        //     .to(1,2,{"onStart":()=>{
        //         for(let i=0;i<GameManager._instance._enemyCreaterPosition.length;i++){
        //             FactoryPattern._instance.getObj(FactoryPattern._instance._enemyCars,FactoryPattern._instance._enemyCar,GameManager._instance._parent.worldPosition,GameManager._instance._parent.worldRotation,GameManager._instance._parent);
                    
        //         }
        //     }})
        //     .union()
        //     .repeat(count)
        //     .start()
    }
}