
import { _decorator, Component, Node, Collider, RigidBody, Layout, Layers, Vec3, Quat, instantiate, Prefab, ConstantForce, tween } from 'cc';
import { BulletController } from '../Conterllor/BulletController';
import { IInitialization } from '../Interface/Interface';
import { GameManager } from '../Singleton/GameManager';
import { LevelManager } from '../Singleton/LevelManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FactoryPattern
 * DateTime = Sun Jan 23 2022 14:01:29 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = FactoryPattern.ts
 * FileBasenameNoExtension = FactoryPattern
 * URL = db://assets/Scripts/FactoryPattern/FactoryPattern.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('FactoryPattern')
export class FactoryPattern extends Component implements IInitialization {
    static _instance:FactoryPattern = null;   
    onLoad(){
        FactoryPattern._instance = this;
        //订阅事件
        LevelManager._instance._inits.push(FactoryPattern._instance);
    }

    onLoading(){

    }




    //敌人车辆
    @property({type:Prefab,visible:true,serializable:true})
    _enemyCar:Prefab;
    _enemyCars:Array<Node> = [];

    //子弹
    @property({type:Prefab,visible:true,serializable:true})
    _bullet:Prefab;
    _bullets:Array<Node> = [];

    //获取对象
    getObj(objs:Array<Node>,obj:Prefab,position:Vec3,rotation:Quat,parent:Node):Node{
        let temp:Node = null;
        if(objs.length != 0){
            temp = objs.pop();
            temp.active = true;
            // temp.getComponent(RigidBody).wakeUp();
            // temp.getComponent(ConstantForce).localForce = new Vec3(0,0,-0.1);
        }else{
            temp = instantiate(obj);
            temp.setParent(parent);
            objs.push(temp);
        }
        temp.worldPosition = position;
        temp.worldRotation = rotation;
        return temp;
    }
    //删除对象
    removeObj(objs:Array<Node>,removeObj:Node){
        removeObj.active = false;
        objs.push(removeObj);
    }

    initialization(){
        //初始化对象池数量
        console.log("1111");
    }


    
}

