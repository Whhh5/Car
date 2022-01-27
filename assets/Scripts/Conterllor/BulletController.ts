
import { _decorator, Component, Node, Layers, RigidBody, Collider, ColliderComponent, ICollisionEvent, ConstantForce, Vec3, ParticleSystem } from 'cc';
import { FactoryPattern } from '../FactoryPattern/FactoryPattern';
import { changeEnemyBlood, IAttack } from '../Interface/Interface';
import { EnemyController } from './EnemyController';
const { ccclass, property } = _decorator;
@ccclass('BulletController')
export class BulletController extends Component implements IAttack {
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
        collider.on("onCollisionEnter",(other:ICollisionEvent)=>{
            if(other.otherCollider.node.layer == 2){
                // executeDelegate(ObserverPattern._instance._del_BulletHitEvent,{blood:other.otherCollider.node.getComponent(EnemyController),value:self._attackNumber});
                changeEnemyBlood({blood:other.otherCollider.node.getComponent(EnemyController),value:-self._attackNumber});

                FactoryPattern._instance.removeObj(FactoryPattern._instance._bullets,this.node);
            }
        },this.node)
    }

    enterCollider(other:ICollisionEvent){

    }
}
