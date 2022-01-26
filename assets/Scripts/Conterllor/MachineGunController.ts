
import { _decorator, Component, Node, Collider, ColliderComponent, ITriggerEvent, Vec3, tween, Quat, quat, Tween } from 'cc';
import { FactoryPattern } from '../FactoryPattern/FactoryPattern';
import { GameManager } from '../Singleton/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MachineGun
 * DateTime = Mon Jan 24 2022 11:46:07 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = MachineGun.ts
 * FileBasenameNoExtension = MachineGun
 * URL = db://assets/Scripts/Conterllor/MachineGun.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('MachineGunController')
export class MachineGunController extends Component {
    // _tween1:Tween<number>;
    onLoad () {
        let collider:Collider = this.getComponent(Collider);
        collider.on("onTriggerStay",this.addTarget,this.node);

        let v:Vec3 = new Vec3(0,0,0)
        tween(v)
            .delay(0.1)
            .to(0,new Vec3(0,0,0),{"onStart":(target:Vec3)=>{
                if(this._target != null){
                    FactoryPattern._instance.getObj(FactoryPattern._instance._bullets,FactoryPattern._instance._bullet,this.node.getWorldPosition(new Vec3()),this.node.getWorldRotation(new Quat()),GameManager._instance._parent);
                    GameManager._instance._carTarget.splice(0);
                }
            }})
            .union()
            .repeatForever()
            .start()
            
    }
    _target:Node = null;

    update (deltaTime: number) {
        // let temp:number = this.getTarget();
        // console.log(temp);
        this.updateTarget();

        if(this._target != null){
            
            this.move(this._target);
        }
    }
    //添加攻击目标
    addTarget(event:ITriggerEvent){
        if(event.otherCollider.node.layer == 2){
            if(GameManager._instance._carTarget.indexOf(event.otherCollider.node) == -1){
                GameManager._instance._carTarget.push(event.otherCollider.node);
            }
        }
    }
    //更新攻击目标
    updateTarget():void{
        let minDistance:number = 1000;
        let minDisObj:Node = null;
        let mainCar:Node = GameManager._instance._mainCar;
        let carTargets = GameManager._instance._carTarget;
        if(carTargets.length == 0){
            this._target = null;
            return;
        }
        for(let i=0;i<carTargets.length;i++){
            if(Vec3.distance(mainCar.getWorldPosition(new Vec3()),carTargets[i].getWorldPosition(new Vec3())) <= minDistance){
                minDistance = Vec3.distance(mainCar.getWorldPosition(new Vec3()),carTargets[i].getWorldPosition(new Vec3()));
                minDisObj = carTargets[i];
            }
        }
        this._target = minDisObj;
    }

    //设置朝向
    move(target:Node){
        this.node.lookAt(target.getWorldPosition(new Vec3()));
    }
}
