
import { _decorator, Component, Node, Vec3, RigidBody, ConstantForce, BoxCollider2D} from 'cc';
import { IBlood } from '../Interface/Interface';
import { KeyInputControler } from '../Tools/KeyInputControler';
import { executeDelegate, IDelegate_Void_Void } from '../Tools/TypeEnumAndDelegete';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Sun Jan 23 2022 11:46:02 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/Singleton/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass("GameManager") 
export class GameManager extends Component implements IBlood{
    static _instance:GameManager = null;   
    onLoad(){
        GameManager._instance = this;
    }
    start(){
        this.initialization();
    }
    //初始化用
    initialization(){
        GameManager._instance._camera.addComponent(CameraConterllor);
        GameManager._instance._mainCar.addComponent(CarContorller);
    }
    
    //车辆
    @property({group:{name:"MainCar",id:"1",displayOrder:1},range:[0,1000],slide:true,visible:true})
    private _bloodVolume:number = 0;
    @property({group:{name:"MainCar",id:"1",displayOrder:1},range:[0,1000],slide:true,visible:true})
    _maxBloodVolume:number = 0;
    @property({group:{name:"MainCar",id:"1",displayOrder:1},type:Node,visible:true})
    _mainCar:Node;
    @property({group:{name:"MainCar",id:"1",displayOrder:1},range:[0,20],slide:true,visible:true})
    _mainCarSpeed:number = 0;
    @property({group:{name:"MainCar",id:"1",displayOrder:1},range:[0,30],slide:true,visible:true})
    _mainCarRotationSpeed:number = 0;

    _carTarget:Array<Node> = new Array<Node>();
    _carTargetDistance:Array<number> = new Array<number>();
    _carTargetNodeMap:Map<number,number> = new Map<number,number>();
    @property({group:{name:"MainCar",id:"1",displayOrder:1},type:Node,slide:true,visible:true})
    _cartat:Node;

    
    get _blood() : number {
        return this._bloodVolume;
    }
    
    set _blood(value:number){
        if(value >= this._maxBloodVolume){
            this._bloodVolume = this._maxBloodVolume;
        }else if(value <= 0){
            this._bloodVolume = 0;
        }else{
            this._bloodVolume = value;
        }
    }
    
    

    //摄像机
    @property({group:{name:"MainCamera",id:"1"},displayOrder:1, type: Node ,visible:true})
    _camera: Node;
    @property({group:{name:"MainCamera",id:"1"},displayOrder:1,range:[0,10],slide:true,visible:true})
    _mainCameraSpeed:number = 0;
    @property({group:{name:"MainCamera",id:"1"},displayOrder:1, type: Node ,visible:true})
    _cameraTarget: Node;
    @property({group:{name:"MainCamera",id:"1"},displayOrder:1,type:Vec3,range:[0,10],visible:true})
    _mainCameraDistance:Vec3;

    //敌人
    @property({group:{name:"enemy",id:"1"},displayOrder:2, visible:true})
    _enemyCreaterCount:number = 0;
    @property({group:{name:"enemy",id:"1"},displayOrder:2, visible:true})
    _enemyCarAttack:number = 0;
    @property({group:{name:"enemy",id:"1"},displayOrder:2, type:[Node],visible:true})
    _enemyCreaterPosition:Node[] = [];
    
    //敌人数组
    _enemyCars:Array<Node> = [];
    //索引
    _enemyCarsMapIndex:Map<Node,number> = new Map<Node,number>();


    //父类
    @property({group:{name:"其他",id:"2",displayOrder:1},type:Node,visible:true})
    _parent:Node;





/*===================================================================================================================================================================*/
    //enemy减少血量事件
    reduceEnemyBloodEvent:Array<IDelegate_Void_Void> = [];
    reduceEnemyBlood(object:IBlood,value:number){
        GameManager._instance._bloodVolume += value;
    }

    //生命减少玩家血量事件
    reduceCarBloodEvent:Array<IDelegate_Void_Void> = [];

    reduceCarBloodVolume(value:number){
        GameManager._instance._blood += value;
        executeDelegate(GameManager._instance.reduceCarBloodEvent,{});
    }
}

export class CameraConterllor extends Component{
    initialization(){

    }
    update(del:number){
        if(true){
            this.move(this.node,GameManager._instance._cameraTarget,GameManager._instance._mainCameraSpeed,GameManager._instance._mainCameraDistance);
        }
    }
    move(object:Node,target:Node,speed:number,distance:Vec3){
        object.worldPosition =Vec3.lerp(new Vec3(),object.worldPosition, Vec3.add(new Vec3(),target.getWorldPosition(new Vec3()),distance),0.6)
    }
}

export class CarContorller extends Component{
    _rb:RigidBody;
    _constantForce:ConstantForce;
    initialization(){

    }
    start(){
        this._rb = this.getComponent(RigidBody);
        this._rb.useCCD;
        this._constantForce = this.getComponent(ConstantForce);
    }

    update(del:number){
        if(true){
            this.move(GameManager._instance._mainCarSpeed,GameManager._instance._mainCarRotationSpeed,del);
        }
    }
    move(moveSpeed:number,rotationSpeed:number,del:number){
        this._constantForce.localTorque = new Vec3(0,KeyInputControler.v_instance.v_Horizontal * rotationSpeed * del * 1000,0);
        this._constantForce.localForce = new Vec3(0,0, - moveSpeed * del * 1000);
    }
}

