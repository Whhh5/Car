
import { _decorator, Component, Node, Layers, RigidBody, Collider, ColliderComponent, ICollisionEvent, ConstantForce, Vec3, ParticleSystem } from 'cc';
import { FactoryPattern } from '../FactoryPattern/FactoryPattern';
import { GameManager } from '../Singleton/GameManager';
import { executeDelegate, IDelegate_Void_Void } from '../Tools/TypeEnumAndDelegete';
import { EnemyController } from './EnemyController';
const { ccclass, property } = _decorator;
@ccclass('BulletController')
export class BulletController extends Component {
    _rb:RigidBody;
    @property({type:ParticleSystem,visible:true})
    _partic:ParticleSystem;
    @property
    _attackNumber:number = 10;

    start(){
        this._rb = this.getComponent(RigidBody);
        this.getComponent(RigidBody).useCCD;
        let collider = this.getComponent(Collider);
        let self = this;
        collider.on("onCollisionEnter",(col:ICollisionEvent)=>{
            if(col.otherCollider.node.layer == 2){
                // this.reduceEnemyBloodVolume(self,col.otherCollider.node,self._attackNumber)
                col.otherCollider.node.getComponent(EnemyController).changeBlood(this._attackNumber);
                FactoryPattern._instance.removeObj(FactoryPattern._instance._bullets,this.node);
            }
        },this.node)
        // this.schedule(()=>{FactoryPattern._instance.removeObj(FactoryPattern._instance._bullets,this.node);},0,0,10);
    }
    onEnable(){
        // this._partic.play();
    }

    //生命减少敌人血量事件
    reduceEnemyBlood:Array<IDelegate_Void_Void> = [];

    reduceEnemyBloodVolume(self:any,enemy:Node,value:number){
        
        executeDelegate(this.reduceEnemyBlood,{});
    }
}
