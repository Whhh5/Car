
import { _decorator, Component, Node, Vec3, tween, Quat, quat, RigidBody, Collider, ICollisionEvent } from 'cc';
import { GameManager } from '../Singleton/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyController
 * DateTime = Tue Jan 25 2022 09:50:47 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = EnemyController.ts
 * FileBasenameNoExtension = EnemyController
 * URL = db://assets/Scripts/Conterllor/EnemyController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('EnemyController')
export class EnemyController extends Component {
    _rb:RigidBody;

    onLoad(){
        this._rb = this.getComponent(RigidBody);
        this._rb.useCCD;
        let collider = this.getComponent(Collider);
        collider.on("onCollisionEnter",(other:ICollisionEvent)=>{
            if(other.otherCollider.node.layer == 1){
                GameManager._instance.reduceCarBloodVolume(-GameManager._instance._enemyCarAttack);
                // console.log(GameManager._instance._bloodVolume);
            }
        })
    }
    @property({group:{name:" ",id:"1",displayOrder:1},range:[0,100],visible:true})
    _maxBloodVolume:number = 0;
    @property({group:{name:" ",id:"1",displayOrder:1},range:[0,100],visible:true})
    private _bloodVolume:number = 0;

    get _Blood():number{
        return this._bloodVolume;
    }
    set _Blood(value:number){
        if(value >= this._maxBloodVolume){
            this._bloodVolume = this._maxBloodVolume;
        }else if(value <= 0){
            this._bloodVolume = 0;
        }else{
            this._bloodVolume = value;
        }
    }
    

    _tempRotate:number = 0;
    start () {
        // tween(this.node.worldRotation.y)
        //     .delay(3)
        //     .to(1,{},{"onStart":()=>{
        //         let tempTargetRotate = GameManager._instance._mainCar.getRotation(new Quat());
        //         let dx = GameManager._instance._mainCar.getWorldPosition(new Vec3()).x - this.node.getWorldPosition(new Vec3()).x;
        //         let dy = GameManager._instance._mainCar.getWorldPosition(new Vec3()).y - this.node.getWorldPosition(new Vec3()).y;
        //         let dz = GameManager._instance._mainCar.getWorldPosition(new Vec3()).z - this.node.getWorldPosition(new Vec3()).z;
        //         let temp2 = Math.atan2(dx,dz);
        //         temp2 = temp2 / Math.PI * 180;
        //         this._tempRotate = temp2;
        //     }})
        //     .to(1,-this._tempRotate,{"onUpdate":(target:Number,ratio:number)=>{
        //         this.node.worldRotation = Quat.fromEuler(new Quat(),0, -this._tempRotate, 0);
        //         // console.log(target);
        //     }})
        //     .union()
        //     .repeatForever()
        //     .start()
        this._Blood = 5000;
        console.log(this._Blood);
        this._Blood = -100;
        console.log(this._Blood);
    }

    update (deltaTime: number) {
        if(GameManager._instance._mainCar != null){
            this.node.lookAt(GameManager._instance._mainCar.worldPosition);
        }
    }

    changeBlood(value:number){
        // console.log(this._bloodVolume +"  "+value);
    }
}
