
import { _decorator, Component, Node, tween, Sprite, spriteAssembler, color, Color, Vec3, Tween } from 'cc';
import { IInitialization } from '../Interface/Interface';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = StruckSpript
 * DateTime = Wed Jan 26 2022 13:06:59 GMT+0800 (中国标准时间)
 * Author = A_z0_9
 * FileBasename = StruckSpript.ts
 * FileBasenameNoExtension = StruckSpript
 * URL = db://assets/Scripts/UIController/StruckSpript.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('StruckSpript')
export class StruckSpript extends Component implements IInitialization {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    _sprite:Sprite;
    start () {
        // [3]
        this._sprite = this.getComponent(Sprite);
        this.initialization();
    }

    initialization(){
        let tween01:Tween<Sprite> = tween(this._sprite)
            .delay(5)
            .to(1,{color:new Color(this._sprite.color.r,this._sprite.color.g,this._sprite.color.b,0)},{"onComplete":(target:Color)=>{
                //放回到对象池等操作
                // this._sprite.color = new Color(this._sprite.color.r,this._sprite.color.g,this._sprite.color.b,1);
                console.log("1");
            }})
            .union()
            .repeat(1)
            .start()
        
        
        // let tween02 = tween(this.node)
        //     .to(1,{position:new Vec3(0,0,0)})
        //     .union()
        //     .repeat(1)
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
