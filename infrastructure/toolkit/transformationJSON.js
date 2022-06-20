export default class TransformationJSON {
  constructor () {
  }

  transDataJson (_obj) {
    let nestingData;
    _obj.forEach( _value => {
      let _res = null
      if (_value.parent_id !== null) {
        _res = _value
        _res.child = this.getChildElement(_obj.next(), _value)
      }
      if(_res != null )
        nestingData.push(_res)
    })
    console.log(nestingData)
    return nestingData
  }

  getChildElement(_obj, _parent){
    const _childElem =  _obj.map(_value=> {
      let _id = _parent.id
      let _res = {}


      return _res
    })

  }


}
