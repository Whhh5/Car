
import { _decorator, Component, Node, Vec3, tween, Quat, quat, RigidBody, Collider, ICollisionEvent, Layers, ConstantForce, ParticleSystem } from 'cc';
import { FactoryPattern } from '../FactoryPattern/FactoryPattern';
import { IAttack, IBlood } from '../Interface/Interface';
import { ObserverPattern } from '../ObserverPattern/ObserverPattern';
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
export class EnemyController extends Component implements IBlood,IAttack {
    _rb:RigidBody;

    _collider:Collider;
    onLoad(){
        this._rb = this.getComponent(RigidBody);
        this._rb.useCCD;
        this._collider = this.getComponent(Collider);
        let self = this;
        this._collider.on("onCollisionEnter",(other:ICollisionEvent)=>{
            if(other.otherCollider.node.layer == 1){
                GameManager._instance.reduceCarBloodVolume(-self._attackNumber);
            }
        })
    }
    @property({group:{name:" ",id:"1",displayOrder:1},range:[0,100],visible:true})
    _maxBloodVolume:number = 0;
    @property({group:{name:" ",id:"1",displayOrder:1},range:[0,100],visible:true})
    private _bloodVolume:number = 0;
    @property({group:{name:" ",id:"1",displayOrder:1},range:[0,100],visible:true})
    _attackNumber:number = 0;

    get _blood():number{
        return this._bloodVolume;
    }
    set _blood(value:number){
        if(value >= this._maxBloodVolume){
            this._bloodVolume = this._maxBloodVolume;
        }else if(value <= 0){
            this._bloodVolume = 0;
            this.finish();
        }else{
            this._bloodVolume = value;
        }
        this.changeBlood();
    }

    //减少血量事件
    changeBlood(){
        let tempNode:Node = this.node.getChildByName("Blood").getChildByName("Up");
        tween(tempNode)
            .delay(0)
            .to(1,{scale:new Vec3(this._blood/this._maxBloodVolume*1,1,1)})
            .union()
            .repeat(1)
            .start()
    }
    
    //死亡事件
    finish(){
        console.log("死亡");
        console.log(this.node.getWorldPosition(new Vec3()));
        this.node.layer = 0;
        this._rb.sleep();
        this.isFinsh = true;
        this._collider.off("onCollisionEnter");
        this.getComponent(ConstantForce).localForce = new Vec3(0,0,0);

        let tempParticle:ParticleSystem = this.node.getChildByName("Finish").getChildByName("火焰").getComponent(ParticleSystem);
        tempParticle.play();
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
    }

    isFinsh:boolean = false;
    update (deltaTime: number) {
        if(GameManager._instance._mainCar != null && !this.isFinsh){
            this.node.lookAt(GameManager._instance._mainCar.worldPosition);
        }
    }
}
