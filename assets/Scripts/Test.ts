
import { _decorator, Component, Node, ITriggerEvent, Vec3, Collider, input, Input, __private, EventKeyboard, KeyCode, Quat } from 'cc';
import { GameManager } from './Singleton/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Test
 * DateTime = Mon Jan 24 2022 12:49:21 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = Test.ts
 * FileBasenameNoExtension = Test
 * URL = db://assets/Scripts/Test.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('Test')
export class Test extends Component {
    onLoad(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this);
    }

    @property({type:Node,visible:true})
    noden:Node;
    @property({type:Node,visible:true})
    node1:Node;
    onKeyDown(event:EventKeyboard) {
        if(event.keyCode == KeyCode.DIGIT_1){
            GameManager._instance.reduceCarBloodVolume(-50);
        }
        if(event.keyCode == KeyCode.DIGIT_2){
            let tempTargetRotate = GameManager._instance._mainCar.getRotation(new Quat());
            let dx = this.noden.getWorldPosition(new Vec3()).x - this.node1.getWorldPosition(new Vec3()).x;
            let dy = this.noden.getWorldPosition(new Vec3()).y - this.node1.getWorldPosition(new Vec3()).y;
            let dz = this.noden.getWorldPosition(new Vec3()).z - this.node1.getWorldPosition(new Vec3()).z;
            let temp2 = Math.atan2(dx,dz);
            temp2 = temp2 / Math.PI * 180;
            console.log(temp2);
        }
    }

    update(del:number){
        this.noden.rotation = Quat.rotationTo(new Quat(),this.noden.rotation,this.node1.rotation);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
